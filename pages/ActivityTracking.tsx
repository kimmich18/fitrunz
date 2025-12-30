
import React, { useState, useEffect, useRef } from 'react';
import { Pause, Lock, Headphones, StopCircle, Play, ArrowLeft, Navigation, Crosshair, Layers, Activity, Music, SkipForward, SkipBack, MapPin, Flag, Zap, Volume2 } from 'lucide-react';
import { AppRoute } from '../types';
import { GlassCard } from '../components/UIComponents';

interface ActivityTrackingProps {
  onNavigate: (route: AppRoute) => void;
}

const ActivityTracking: React.FC<ActivityTrackingProps> = ({ onNavigate }) => {
  const [seconds, setSeconds] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [distance, setDistance] = useState(0.00);
  const [pace, setPace] = useState("5:30");
  const [calories, setCalories] = useState(0);
  const [heartRate, setHeartRate] = useState(120);
  
  // Music State
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [trackProgress, setTrackProgress] = useState(35); // percentage

  const playlist = [
    { title: "Sedetik Lebih", artist: "Anuar Zain", bpm: "72", cover: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=100&auto=format&fit=crop&q=60" },
    { title: "Velocity Protocol", artist: "Synth Lord", bpm: "180", cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100&auto=format&fit=crop&q=60" },
    { title: "Midnight Sprint", artist: "Electronic Ghost", bpm: "165", cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=100&auto=format&fit=crop&q=60" }
  ];

  const currentTrack = playlist[currentTrackIndex];

  const handleNextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
    setTrackProgress(0);
  };

  const handlePrevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    setTrackProgress(0);
  };

  // Map State: 'light' is the new "Apple Maps" style day mode
  const [mapMode, setMapMode] = useState<'night' | 'light'>('light'); 
  const [showLayerToast, setShowLayerToast] = useState(false);
  const [pathTotalLength, setPathTotalLength] = useState(0);
  
  // Viewport / Interaction State
  const [view, setView] = useState({ x: -50, y: 100, scale: 1.2 });
  
  // Refs for High-Performance Animation
  const pathRef = useRef<SVGPathElement>(null);
  const activePathRef = useRef<SVGPathElement>(null);
  const runnerGroupRef = useRef<SVGGElement>(null);
  const directionIndicatorRef = useRef<SVGGElement>(null);
  const currentPosRef = useRef({ x: 60, y: 450 });

  const gestureRef = useRef({
    startX: 0,
    startY: 0,
    startViewX: 0,
    startViewY: 0,
    startDist: 0,
    startScale: 1,
    startMidX: 0,
    startMidY: 0,
    mode: 'none' as 'none' | 'pan' | 'zoom'
  });

  // Route Path (SF Style Block Loop)
  const routePath = "M 60 450 L 200 450 L 200 350 L 320 350 L 320 200 L 120 200 L 120 280 L 60 280 Z";

  // Visual Theme Config
  const isNight = mapMode === 'night';
  const theme = {
    bg: isNight ? '#050A19' : '#F2F1F6', // Deep Navy vs Light Map Grey
    grid: isNight ? '#1a2b4b' : '#E5E5EA',
    route: isNight ? '#00FFFF' : '#2F54EB', // Cyan vs Royal Blue (Reference)
    routeGlow: isNight ? '#00FFFF' : '#2F54EB',
    blockFill: isNight ? '#0F172A' : '#FFFFFF', // Dark Block vs White Block
    blockStroke: isNight ? '#1e293b' : '#E5E5EA',
    text: isNight ? '#4169E1' : '#8E8E93',
    park: isNight ? '#064e3b' : '#D4F5D4', // Dark Green vs Pastel Green
    textPrimary: isNight ? '#FFFFFF' : '#000000',
    // Always use Dark Navy for Overlay to maintain Cyber-Sport aesthetic
    overlayBg: 'bg-[#0A1128]/95',
    overlayText: 'text-white',
    overlayBorder: 'border-[#00FFFF]/20'
  };

  // 1. Initialize Path Length
  useEffect(() => {
    if (pathRef.current) {
      setPathTotalLength(pathRef.current.getTotalLength());
    }
  }, []);

  // 2. Animation Loop
  useEffect(() => {
    let animId: number;
    const loopDuration = 30000;
    const startTime = Date.now();

    const frame = () => {
      if (!isPaused && pathTotalLength > 0) {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = (elapsed % loopDuration) / loopDuration;

        // Pulse Effect
        const pulse = 2 + Math.sin(now / 200) * 1.5; 
        
        // A. Animate Route Drawing
        if (activePathRef.current) {
           const drawOffset = pathTotalLength * (1 - progress);
           activePathRef.current.style.strokeDashoffset = drawOffset.toString();
           // In Day mode, we use a solid shadow instead of neon glow
           const shadowColor = isNight ? theme.routeGlow : 'rgba(47, 84, 235, 0.3)';
           activePathRef.current.style.filter = `drop-shadow(0 0 ${isNight ? 4 + pulse : 2}px ${shadowColor})`;
        }

        // B. Animate Runner
        if (pathRef.current && runnerGroupRef.current) {
           const len = progress * pathTotalLength;
           const point = pathRef.current.getPointAtLength(len);
           
           // Look Ahead for Rotation
           const lookAhead = 1.0; 
           const nextLen = Math.min(len + lookAhead, pathTotalLength);
           const nextPoint = pathRef.current.getPointAtLength(len >= pathTotalLength - lookAhead ? 0 : nextLen);
           const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * 180 / Math.PI;

           currentPosRef.current = { x: point.x, y: point.y };
           
           runnerGroupRef.current.setAttribute("transform", `translate(${point.x}, ${point.y})`);
           if (directionIndicatorRef.current) {
             directionIndicatorRef.current.setAttribute("transform", `rotate(${angle + 90})`);
           }
        }
      }
      animId = requestAnimationFrame(frame);
    };

    animId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animId);
  }, [isPaused, pathTotalLength, isNight, theme.routeGlow]);

  // 3. Stats & Music Progress Interval
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (!isPaused) {
      interval = setInterval(() => {
        const variation = (Math.random() - 0.5) * 0.0005; 
        const currentDeltaDist = 0.003 + variation; 
        setDistance(d => d + currentDeltaDist);
        setCalories(c => c + (currentDeltaDist * 65));

        const newHr = 135 + Math.sin(Date.now() / 2000) * 10 + (Math.random() * 5);
        setHeartRate(Math.floor(newHr));

        const speedKmMin = currentDeltaDist * 60;
        if (speedKmMin > 0) {
           const rawPace = 1 / speedKmMin;
           const pM = Math.floor(rawPace);
           const pS = Math.floor((rawPace - pM) * 60);
           setPace(`${pM}:${pS < 10 ? '0' : ''}${pS}`);
        }
        setSeconds(s => s + 1);

        // Music Progress Simulation
        if (isPlaying) {
          setTrackProgress(prev => (prev >= 100 ? 0 : prev + 0.5));
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPaused, isPlaying]);

  // --- Interaction Handlers ---
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      gestureRef.current.mode = 'pan';
      gestureRef.current.startX = e.touches[0].clientX;
      gestureRef.current.startY = e.touches[0].clientY;
      gestureRef.current.startViewX = view.x;
      gestureRef.current.startViewY = view.y;
    } else if (e.touches.length === 2) {
      gestureRef.current.mode = 'zoom';
      const dist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
      const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      gestureRef.current.startDist = dist;
      gestureRef.current.startScale = view.scale;
      gestureRef.current.startMidX = midX;
      gestureRef.current.startMidY = midY;
      gestureRef.current.startViewX = view.x;
      gestureRef.current.startViewY = view.y;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (gestureRef.current.mode === 'pan' && e.touches.length === 1) {
      const dx = e.touches[0].clientX - gestureRef.current.startX;
      const dy = e.touches[0].clientY - gestureRef.current.startY;
      setView(prev => ({ ...prev, x: gestureRef.current.startViewX + dx, y: gestureRef.current.startViewY + dy }));
    } else if (gestureRef.current.mode === 'zoom' && e.touches.length === 2) {
      const dist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
      const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      const scaleFactor = dist / gestureRef.current.startDist;
      const newScale = Math.max(0.5, Math.min(4, gestureRef.current.startScale * scaleFactor));
      const startMapX = (gestureRef.current.startMidX - gestureRef.current.startViewX) / gestureRef.current.startScale;
      const startMapY = (gestureRef.current.startMidY - gestureRef.current.startViewY) / gestureRef.current.startScale;
      setView({ x: midX - startMapX * newScale, y: midY - startMapY * newScale, scale: newScale });
    }
  };
  
  const handleTouchEnd = () => { gestureRef.current.mode = 'none'; };
  const handleMouseDown = (e: React.MouseEvent) => {
    gestureRef.current.mode = 'pan';
    gestureRef.current.startX = e.clientX;
    gestureRef.current.startY = e.clientY;
    gestureRef.current.startViewX = view.x;
    gestureRef.current.startViewY = view.y;
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (gestureRef.current.mode === 'pan') {
      const dx = e.clientX - gestureRef.current.startX;
      const dy = e.clientY - gestureRef.current.startY;
      setView(prev => ({ ...prev, x: gestureRef.current.startViewX + dx, y: gestureRef.current.startViewY + dy }));
    }
  };
  const handleMouseUp = () => { gestureRef.current.mode = 'none'; };
  const handleWheel = (e: React.WheelEvent) => {
    const scaleFactor = e.deltaY > 0 ? 0.9 : 1.1;
    const newScale = Math.max(0.5, Math.min(4, view.scale * scaleFactor));
    const mapX = (e.clientX - view.x) / view.scale;
    const mapY = (e.clientY - view.y) / view.scale;
    setView({ x: e.clientX - mapX * newScale, y: e.clientY - mapY * newScale, scale: newScale });
  };

  const toggleMapMode = () => {
    setMapMode(prev => prev === 'night' ? 'light' : 'night');
    setShowLayerToast(true);
    setTimeout(() => setShowLayerToast(false), 2000);
  };

  const recenterMap = () => {
    const pos = currentPosRef.current;
    const targetScale = 1.5;
    setView({ x: window.innerWidth / 2 - pos.x * targetScale, y: window.innerHeight / 2 - pos.y * targetScale, scale: targetScale });
  };

  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const getHeartRateZone = (hr: number) => {
    if (hr < 120) return { label: 'Warm Up', color: 'text-blue-400' };
    if (hr < 140) return { label: 'Fat Burn', color: 'text-green-400' };
    if (hr < 160) return { label: 'Cardio', color: 'text-orange-400' };
    return { label: 'Peak', color: 'text-red-500' };
  };
  const hrZone = getHeartRateZone(heartRate);

  return (
    <div className="h-screen w-full relative overflow-hidden flex flex-col select-none touch-none" style={{ backgroundColor: theme.bg, transition: 'background-color 0.5s' }}>
      
      {/* --- Interactive Map --- */}
      <div 
        className="absolute inset-0 z-0 cursor-move"
        onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        <svg 
          className="absolute inset-0 w-full h-full" 
          preserveAspectRatio="xMidYMid slice" 
          viewBox="0 0 400 600"
        >
           {/* --- Map Definition --- */}
           <defs>
              <pattern id="gridPattern" width="100" height="100" patternUnits="userSpaceOnUse">
                 <path d="M 100 0 L 0 0 0 100" fill="none" stroke={theme.grid} strokeWidth="2" />
              </pattern>
           </defs>

           <g transform={`translate(${view.x}, ${view.y}) scale(${view.scale})`} style={{ transition: gestureRef.current.mode === 'none' ? 'transform 0.3s ease-out' : 'none' }}>
              
              {/* Infinite Grid / Streets Background */}
              <rect x="-2000" y="-2000" width="4000" height="4000" fill={theme.bg} />
              <rect x="-2000" y="-2000" width="4000" height="4000" fill="url(#gridPattern)" opacity="0.3" />

              {/* --- City Blocks (Simulated SF Grid) --- */}
              <g fill={theme.blockFill} stroke={theme.blockStroke} strokeWidth="1">
                  <rect x="-50" y="50" width="100" height="80" rx="4" />
                  <rect x="60" y="50" width="120" height="80" rx="4" />
                  <rect x="190" y="50" width="100" height="80" rx="4" />
                  <rect x="-50" y="140" width="100" height="120" rx="4" />
                  <rect x="60" y="140" width="120" height="120" rx="4" fill={theme.park} stroke="none" /> 
                  <text x="120" y="200" textAnchor="middle" fill="#4fa84f" fontSize="8" fontWeight="bold" opacity="0.8">KLCC PARK</text>
                  <rect x="190" y="140" width="100" height="120" rx="4" />
                  <rect x="-50" y="270" width="100" height="100" rx="4" />
                  <rect x="60" y="270" width="120" height="100" rx="4" />
                  <rect x="190" y="270" width="100" height="100" rx="4" />
                  <rect x="-50" y="380" width="100" height="120" rx="4" />
                  <rect x="60" y="380" width="120" height="120" rx="4" />
                  <rect x="190" y="380" width="100" height="120" rx="4" />
              </g>

              {/* --- Route Layer --- */}
              <path 
                ref={pathRef}
                d={routePath} 
                fill="none" 
                stroke={isNight ? '#ffffff' : '#000000'} 
                strokeWidth="10" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                opacity="0.05"
              />
              <path 
                ref={activePathRef}
                d={routePath} 
                fill="none" 
                stroke={theme.route}
                strokeWidth={isNight ? 5 : 6} 
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={`${pathTotalLength} ${pathTotalLength}`}
                strokeDashoffset={pathTotalLength} 
                style={{ transition: 'stroke 0.5s' }}
              />

              {/* --- Runner Marker --- */}
              <g ref={runnerGroupRef} transform="translate(60, 450)">
                <g ref={directionIndicatorRef}>
                  <path d="M 0 -20 L 8 0 L 0 -4 L -8 0 Z" fill={theme.route} opacity="0.8" />
                </g>
                <g className="drop-shadow-lg">
                   <circle r="12" fill={isNight ? '#0A1128' : 'white'} stroke={theme.route} strokeWidth="2" />
                   <g transform="translate(-12, -12)">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill={theme.route}>
                         <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.2-2L14.8 12C15.5 12 16.1 12.5 16.5 13l3.5 3.5 1.5-1.5-3.5-3.5c-.8-.8-1.8-1.2-2.8-1.2h-3l-1.6-3.8c-.5-1.1-1.8-1.7-2.9-1.2L3.4 6.8l.8 1.9 4-1.6 1.6 1.8z" />
                      </svg>
                   </g>
                </g>
              </g>
           </g>
        </svg>
      </div>

      {/* --- Top Bar --- */}
      <div className="absolute top-0 left-0 w-full p-6 z-20 pointer-events-none">
        <div className="flex justify-between items-center pointer-events-auto">
           <button 
             onClick={() => onNavigate(AppRoute.DASHBOARD)}
             className={`w-10 h-10 flex items-center justify-center rounded-full backdrop-blur-md shadow-lg transition-all active:scale-95 ${isNight ? 'bg-white/10 border-white/10 text-white' : 'bg-white text-gray-800 border-gray-200'}`}
           >
             <ArrowLeft size={20} />
           </button>
           
           <div className={`flex items-center gap-3 backdrop-blur-md px-3 py-1.5 rounded-full border shadow-sm ${isNight ? 'bg-black/30 border-white/10' : 'bg-white/80 border-gray-200'}`}>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className={`text-[10px] font-bold tracking-wide ${isNight ? 'text-green-400' : 'text-green-600'}`}>GPS ACTIVE</span>
              </div>
           </div>
        </div>
      </div>

      {/* --- Music Player Widget (Floating) --- */}
      <div className="absolute left-4 top-24 z-30 w-[85%] max-w-[280px]">
        <GlassCard className={`p-3 border-white/10 bg-[#0A1128]/70 backdrop-blur-xl shadow-2xl transition-all duration-500 transform ${isPlaying ? 'translate-x-0' : '-translate-x-2 opacity-90'}`}>
          <div className="flex items-center gap-3">
             <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 shadow-lg group">
                <img src={currentTrack.cover} alt="album art" className={`w-full h-full object-cover transition-transform duration-[10s] linear ${isPlaying ? 'scale-110 rotate-1' : 'scale-100'}`} />
                {isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="flex items-end gap-[2px] h-4">
                       <div className="w-[2px] bg-[#00FFFF] animate-[bounce_0.6s_infinite_ease-in-out]"></div>
                       <div className="w-[2px] bg-[#00FFFF] animate-[bounce_0.4s_infinite_ease-in-out]"></div>
                       <div className="w-[2px] bg-[#00FFFF] animate-[bounce_0.8s_infinite_ease-in-out]"></div>
                    </div>
                  </div>
                )}
             </div>
             
             <div className="flex-1 min-w-0">
                <h4 className="text-xs font-black text-white truncate italic tracking-tight">{currentTrack.title}</h4>
                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider truncate">{currentTrack.artist}</p>
                <div className="flex items-center gap-2 mt-1">
                   <span className="text-[8px] bg-[#00FFFF]/10 text-[#00FFFF] px-1 rounded font-mono border border-[#00FFFF]/20">{currentTrack.bpm} BPM</span>
                </div>
             </div>

             <div className="flex items-center gap-1">
                <button onClick={handlePrevTrack} className="p-1.5 text-gray-400 hover:text-white transition-colors">
                   <SkipBack size={14} fill="currentColor" />
                </button>
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-8 h-8 rounded-full bg-[#00FFFF] text-[#0A1128] flex items-center justify-center shadow-[0_0_10px_rgba(0,255,255,0.4)] active:scale-90 transition-transform"
                >
                  {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" className="ml-0.5" />}
                </button>
                <button onClick={handleNextTrack} className="p-1.5 text-gray-400 hover:text-white transition-colors">
                   <SkipForward size={14} fill="currentColor" />
                </button>
             </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-3 h-1 w-full bg-white/5 rounded-full overflow-hidden">
             <div 
               className="h-full bg-gradient-to-r from-[#00FFFF] to-[#4169E1] transition-all duration-1000 ease-linear shadow-[0_0_8px_#00FFFF]" 
               style={{ width: `${trackProgress}%` }}
             ></div>
          </div>
        </GlassCard>
      </div>

      {/* --- Controls (Right) --- */}
      <div className="absolute right-4 top-28 z-30 flex flex-col items-end gap-3">
         <div className="relative flex items-center">
            {showLayerToast && (
                <div className={`absolute right-14 px-3 py-1.5 rounded-xl text-xs font-bold shadow-lg whitespace-nowrap animate-fade-in ${isNight ? 'bg-black/80 text-white' : 'bg-white text-gray-800'}`}>
                   {isNight ? "Night Mode" : "Day Mode"}
                </div>
             )}
            <button 
              onClick={toggleMapMode}
              className={`w-12 h-12 rounded-full backdrop-blur-md flex items-center justify-center shadow-lg active:scale-95 transition-all ${isNight ? 'bg-black/40 border border-white/20 text-white' : 'bg-white border border-gray-100 text-gray-700'}`}
            >
              <Layers size={22} className={isNight ? "text-[#00FFFF]" : "text-blue-600"} />
            </button>
         </div>

         <button 
          onClick={recenterMap}
          className={`w-12 h-12 rounded-full backdrop-blur-md flex items-center justify-center shadow-lg active:scale-95 transition-all ${isNight ? 'bg-black/40 border border-white/20 text-white' : 'bg-white border border-gray-100 text-gray-700'}`}
        >
          <Crosshair size={22} className={isNight ? "text-[#00FFFF]" : "text-blue-600"} />
        </button>

        <button 
          className={`w-12 h-12 rounded-full backdrop-blur-md flex items-center justify-center shadow-lg active:scale-95 transition-all ${isNight ? 'bg-black/40 border border-white/20 text-white' : 'bg-white border border-gray-100 text-gray-700'}`}
        >
          <Volume2 size={22} className={isNight ? "text-[#00FFFF]" : "text-blue-600"} />
        </button>
      </div>

      {/* --- Bottom Sheet (HUD) --- */}
      <div className={`mt-auto relative z-20 backdrop-blur-2xl rounded-t-[30px] border-t p-8 pb-10 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] transition-colors duration-500 ${theme.overlayBg} ${theme.overlayBorder}`}>
        
        {/* Main Stats */}
        <div className="flex justify-between items-end mb-8">
            <div>
               <p className={`text-[10px] uppercase tracking-widest font-bold mb-1 text-gray-400`}>Distance</p>
               <h1 className={`text-6xl font-black tracking-tighter italic tabular-nums ${theme.overlayText}`}>
                 {distance.toFixed(2)}<span className={`text-2xl not-italic ml-1 text-[#00FFFF]`}>KM</span>
               </h1>
            </div>
            <div className="text-right">
                <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded mb-2 bg-white/5`}>
                    <Activity size={12} className={hrZone.color} />
                    <span className={`text-xs font-bold font-mono ${hrZone.color}`}>{heartRate} BPM</span>
                </div>
                <div className={`text-xl font-bold font-mono ${theme.overlayText}`}>{formatTime(seconds)}</div>
            </div>
        </div>

        {/* Grid Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
           <div className={`p-3 rounded-2xl bg-white/5`}>
              <p className="text-[9px] text-gray-400 uppercase font-bold mb-1">Pace</p>
              <p className={`text-lg font-bold text-[#00FFFF]`}>{pace}</p>
           </div>
           <div className={`p-3 rounded-2xl bg-white/5`}>
              <p className="text-[9px] text-gray-400 uppercase font-bold mb-1">Kcal</p>
              <p className="text-lg font-bold text-orange-500">{Math.floor(calories)}</p>
           </div>
           <div className={`p-3 rounded-2xl bg-white/5`}>
              <p className="text-[9px] text-gray-400 uppercase font-bold mb-1">Zone</p>
              <p className={`text-lg font-bold ${hrZone.color}`}>{hrZone.label}</p>
           </div>
        </div>

        {/* Action Controls */}
        <div className="flex justify-center items-center gap-8">
             {isPaused ? (
               <button 
                onClick={() => onNavigate(AppRoute.SUMMARY)}
                className="w-20 h-20 rounded-full bg-red-500 text-white flex items-center justify-center shadow-xl hover:scale-105 transition-transform"
               >
                 <StopCircle size={32} fill="currentColor" className="text-white" />
               </button>
             ) : (
                <button 
                  onClick={() => setIsPaused(true)}
                  className="w-20 h-20 rounded-full bg-[#FFD700] text-[#0A1128] flex items-center justify-center shadow-xl hover:scale-105 transition-transform"
                >
                  <Pause size={32} fill="currentColor" />
                </button>
             )}
             
             {isPaused && (
                <button 
                  onClick={() => setIsPaused(false)}
                  className="w-20 h-20 rounded-full bg-green-500 text-white flex items-center justify-center shadow-xl hover:scale-105 transition-transform"
                >
                  <Play size={32} fill="currentColor" />
                </button>
             )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes bounce {
          0%, 100% { height: 4px; }
          50% { height: 16px; }
        }
        .mask-fade-bottom {
          mask-image: linear-gradient(to bottom, black 70%, transparent 100%);
        }
      `}} />
    </div>
  );
};

export default ActivityTracking;
