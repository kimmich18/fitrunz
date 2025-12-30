
import React, { useEffect, useState } from 'react';
import { Footprints, Flame, MapPin, Sparkles, User as UserIcon, Play, CloudSun, ArrowUpRight, Wind, Calendar, ChevronRight, Star, Trophy, TrendingUp, RefreshCw } from 'lucide-react';
import { AppRoute, User } from '../types';
import { GlassCard, SectionHeader } from '../components/UIComponents';
import { getAICoachingTip } from '../services/geminiService';

interface DashboardProps {
  user: User;
  onNavigate: (route: AppRoute) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onNavigate }) => {
  const [aiTip, setAiTip] = useState<string>("Analyzing biometric telemetry...");
  const [loadingTip, setLoadingTip] = useState(false);
  const [greeting, setGreeting] = useState("Good Evening,");
  const [displayedTip, setDisplayedTip] = useState("");
  const [streak, setStreak] = useState(12);

  useEffect(() => {
    // Set time-based greeting
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning,");
    else if (hour < 18) setGreeting("Good Afternoon,");
    else setGreeting("Good Evening,");

    refreshTip();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Typewriter effect for AI Tip
  useEffect(() => {
    if (!loadingTip && aiTip) {
      setDisplayedTip("");
      let i = 0;
      const timer = setInterval(() => {
        if (i < aiTip.length) {
          setDisplayedTip((prev) => prev + aiTip.charAt(i));
          i++;
        } else {
          clearInterval(timer);
        }
      }, 30); // Speed of typing
      return () => clearInterval(timer);
    }
  }, [aiTip, loadingTip]);

  const refreshTip = async () => {
    if (user.goal) {
      setLoadingTip(true);
      setDisplayedTip(""); // Reset for loading state
      const tip = await getAICoachingTip(user.goal, 5.2); // Mock last run 5.2km
      setAiTip(tip);
      setLoadingTip(false);
    }
  };

  const stats = [
    { icon: Footprints, val: "6,240", unit: "Steps", trend: "+12%", color: "text-[#4169E1]", iconColor: "text-[#4169E1]", graph: "M0,20 Q10,15 20,20 T40,15 T60,25 T80,10" },
    { icon: Flame, val: "420", unit: "Kcal", trend: "+5%", color: "text-orange-500", iconColor: "text-orange-500", graph: "M0,25 Q20,20 40,10 T80,5" },
    { icon: MapPin, val: "5.2", unit: "km", trend: "+8%", color: "text-[#00FFFF]", iconColor: "text-[#00FFFF]", graph: "M0,20 L20,20 L30,10 L50,15 L80,5" },
  ];

  return (
    <div className="pb-28 pt-8 px-6 space-y-8 max-w-md mx-auto min-h-screen bg-[#0A1128] overflow-x-hidden">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[-10%] right-[-30%] w-[300px] h-[300px] bg-[#00FFFF]/5 rounded-full blur-[80px]"></div>
          <div className="absolute top-[20%] left-[-20%] w-[200px] h-[200px] bg-[#4169E1]/10 rounded-full blur-[60px]"></div>
      </div>

      {/* Top Bar: Profile & Weather */}
      <div className="flex justify-between items-start relative z-10">
        <div>
          <p className="text-gray-400 text-xs font-bold tracking-widest uppercase mb-1 flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
             {greeting}
          </p>
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter italic">{user.name || "Runner"}</h1>
          
          {/* Mock Environmental Widget */}
          <div className="mt-2 inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 backdrop-blur-md">
            <div className="flex items-center gap-1.5">
                <CloudSun size={14} className="text-[#00FFFF]" />
                <span className="text-[10px] text-gray-300 font-mono font-bold">24°C</span>
            </div>
            <span className="w-[1px] h-3 bg-white/20"></span>
            <div className="flex items-center gap-1.5">
                <Wind size={14} className="text-green-400" />
                <span className="text-[10px] text-gray-300 font-mono font-bold">AQI: 45</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
           {/* Streak Counter */}
           <div className="flex flex-col items-end">
              <div className="flex items-center gap-1 text-orange-500 animate-pulse">
                 <Flame size={18} fill="currentColor" />
                 <span className="font-black italic text-xl">{streak}</span>
              </div>
              <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Day Streak</span>
           </div>

           <div className="relative group cursor-pointer">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00FFFF] to-[#4169E1] p-[2px] shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-transform group-hover:scale-105">
                <div className="w-full h-full rounded-[10px] bg-[#0A1128] flex items-center justify-center overflow-hidden">
                  <UserIcon className="text-gray-300" size={24} />
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-[#0A1128] rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
           </div>
        </div>
      </div>

      {/* Hero Action: Start Running */}
      <div className="relative py-4 flex flex-col items-center justify-center z-10">
        <div className="absolute top-0 text-[10px] text-[#00FFFF] font-mono tracking-[0.3em] opacity-70 animate-pulse">
           SYSTEM READY
        </div>
        <button 
          onClick={() => onNavigate(AppRoute.ACTIVITY)}
          className="relative w-56 h-56 rounded-full flex flex-col items-center justify-center group active:scale-95 transition-all cursor-pointer mt-4"
        >
          {/* Static Glow */}
          <div className="absolute inset-0 bg-[#00FFFF]/5 rounded-full blur-3xl group-hover:bg-[#00FFFF]/15 transition-colors duration-500"></div>
          
          {/* Rotating Outer Rings */}
          <div className="absolute inset-0 rounded-full border border-white/5 border-t-[#00FFFF] border-r-[#4169E1] animate-[spin_10s_linear_infinite] opacity-60"></div>
          <div className="absolute inset-2 rounded-full border border-white/5 border-b-[#00FFFF] animate-[spin_15s_linear_infinite_reverse] opacity-40"></div>
          
          {/* Pulsing Core */}
          <div className="absolute inset-6 rounded-full border-2 border-[#00FFFF]/30 animate-ping opacity-20"></div>
          
          {/* Main Button Body */}
          <div className="absolute inset-4 rounded-full bg-gradient-to-b from-[#1a233a] to-[#0A1128] border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-center justify-center z-10 group-hover:border-[#00FFFF]/50 transition-colors">
            <div className="text-center group-hover:animate-pulse">
                <Play size={42} className="text-[#00FFFF] mx-auto mb-1 fill-[#00FFFF] drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]" />
                <span className="block font-black text-3xl tracking-tighter text-white italic">START</span>
                <span className="block text-xs text-[#00FFFF] tracking-[0.3em] font-bold">RUNNING</span>
            </div>
          </div>
        </button>
      </div>

      {/* Stats Row (Bio-Monitor Style) */}
      <div className="grid grid-cols-3 gap-3 relative z-10">
        {stats.map((stat, i) => (
          <GlassCard key={i} className="p-3 flex flex-col items-start justify-between h-28 relative overflow-hidden group border-white/5 hover:border-[#00FFFF]/30 transition-all">
            {/* Background Graph SVG */}
            <svg className="absolute bottom-0 left-0 w-full h-12 opacity-20 pointer-events-none" viewBox="0 0 100 30" preserveAspectRatio="none">
               <path d={stat.graph} fill="none" stroke="currentColor" strokeWidth="2" className={stat.color} />
               <path d={`${stat.graph} V 30 H 0 Z`} fill="currentColor" className={stat.color} fillOpacity="0.1" />
            </svg>

            <div className="flex items-center justify-between w-full relative z-10">
               <div className={`p-1.5 rounded-lg bg-white/5 ${stat.iconColor}`}>
                   <stat.icon size={16} />
               </div>
               <div className="flex items-center text-[9px] text-green-400 font-mono font-bold bg-green-900/20 px-1.5 py-0.5 rounded">
                 <ArrowUpRight size={10} />
                 {stat.trend}
               </div>
            </div>
            
            <div className="mt-2 relative z-10">
              <span className="text-xl font-black block tracking-tight text-white">{stat.val}</span>
              <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">{stat.unit}</span>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Next Mission Link */}
      <div 
        onClick={() => onNavigate(AppRoute.WORKOUT_PLAN)}
        className="cursor-pointer group relative z-10"
      >
        <GlassCard className="p-0 flex items-stretch border-white/5 hover:border-[#00FFFF]/50 transition-colors overflow-hidden">
            <div className="w-1.5 bg-[#00FFFF] group-hover:shadow-[0_0_10px_#00FFFF] transition-all"></div>
            <div className="p-4 flex-1 flex items-center justify-between bg-gradient-to-r from-white/5 to-transparent">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#00FFFF]/10 flex items-center justify-center text-[#00FFFF] border border-[#00FFFF]/20 group-hover:scale-110 transition-transform">
                        <Calendar size={24} />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-0.5">
                             <h3 className="text-white font-black text-sm uppercase tracking-wide italic">Next Mission</h3>
                             <span className="text-[9px] bg-[#4169E1] text-white px-1.5 py-0.5 rounded font-bold">TODAY</span>
                        </div>
                        <p className="text-xs text-gray-400 font-medium">Velocity Overdrive • 45 min</p>
                    </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#00FFFF] group-hover:text-black transition-all">
                    <ChevronRight size={16} />
                </div>
            </div>
        </GlassCard>
      </div>

      {/* Ad Banner */}
      {!user.isPremium && (
        <div 
          onClick={() => onNavigate(AppRoute.PREMIUM)}
          className="relative overflow-hidden rounded-[20px] p-[1px] cursor-pointer group transform transition-transform hover:scale-[1.01] z-10 shadow-lg"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FFD700] animate-[gradient-x_3s_infinite_linear] bg-[length:200%_200%]"></div>
          <div className="relative bg-[#0A1128] rounded-[19px] p-4 flex items-center justify-between">
            <div className="flex-1 pr-4">
              <h3 className="text-[#FFD700] font-black text-xs mb-1 uppercase tracking-widest flex items-center gap-1">
                 <Star size={12} fill="currentColor" /> FitRun Pro
              </h3>
              <p className="text-[10px] text-gray-300 font-medium leading-relaxed">
                 Unlock AI Coaching, Advanced Heart Analytics, Custom Meal Plans and Ad-Free Experience. 
                 <span className="text-white font-bold block mt-1 text-xs">30% Off today!</span>
              </p>
            </div>
            <div className="h-10 w-10 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-xl flex items-center justify-center text-[#0A1128] shadow-[0_0_15px_rgba(255,215,0,0.4)] flex-shrink-0">
              <Star size={20} fill="currentColor" />
            </div>
          </div>
        </div>
      )}

      {/* AI Coach Section */}
      <div className="space-y-4 relative z-10">
        <div className="flex justify-between items-center">
          <SectionHeader title="AI Coach Tips" />
          <button 
            onClick={refreshTip} 
            disabled={loadingTip}
            className="text-[10px] font-bold text-[#00FFFF] flex items-center gap-1 hover:text-white transition-colors disabled:opacity-50 uppercase tracking-wider border border-[#00FFFF]/30 px-2 py-1 rounded-md hover:bg-[#00FFFF]/10"
          >
             <RefreshCw size={10} className={loadingTip ? 'animate-spin' : ''} /> {loadingTip ? 'SYNCING...' : 'REFRESH'}
          </button>
        </div>
        
        <GlassCard className="p-6 min-h-[110px] flex items-center relative overflow-hidden border-[#00FFFF]/30 bg-[#000000]/60 shadow-[0_0_30px_rgba(0,0,0,0.5)] group">
          {/* Cyber Grid Background */}
          <div className="absolute inset-0 opacity-20 pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(#00FFFF 1px, transparent 1px)', backgroundSize: '15px 15px' }}>
          </div>
          
          <div className="absolute top-0 left-0 w-1 h-full bg-[#00FFFF]"></div>

          <div className="absolute -right-6 -bottom-6 text-[#00FFFF]/5 pointer-events-none group-hover:text-[#00FFFF]/10 transition-colors duration-500">
            <UserIcon size={140} />
          </div>
          
          <div className="w-full relative z-10 pl-2">
             {loadingTip ? (
               <div className="flex items-center gap-2 text-[#00FFFF] font-mono text-xs tracking-widest">
                 <span className="w-2 h-2 bg-[#00FFFF] rounded-full animate-pulse"></span>
                 <span>ANALYZING BIOMETRICS...</span>
               </div>
             ) : (
                <div className="flex gap-3">
                   <div className="mt-1">
                      <Sparkles size={16} className="text-[#00FFFF]" />
                   </div>
                   <p className="text-sm font-medium text-gray-200 leading-relaxed font-mono">
                      {displayedTip}
                      <span className="inline-block w-2 h-4 bg-[#00FFFF] ml-1 animate-pulse align-middle"></span>
                   </p>
                </div>
             )}
          </div>
        </GlassCard>
      </div>

      {/* Active Quests (Weekly Challenge) */}
      <div className="relative z-10">
         <div className="flex items-center justify-between mb-4">
             <div className="transform -skew-x-12 inline-block shadow-[4px_4px_0px_rgba(0,255,255,0.2)]">
                <h2 className="text-xl font-black text-black bg-[#00FFFF] px-3 py-1 tracking-tighter">
                  ACTIVE QUESTS
                </h2>
             </div>
             <span className="text-[10px] text-gray-500 font-bold uppercase">Reset in 2d 14h</span>
         </div>
         
         <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar -mx-4 px-4">
           {/* Challenge 1 */}
           <GlassCard className="min-w-[240px] p-0 bg-[#0A1128] border border-[#4169E1]/30 relative overflow-hidden flex-shrink-0 group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#4169E1]/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="p-4 relative z-10">
                 <div className="flex justify-between items-start mb-3">
                    <div className="p-2 bg-[#4169E1]/20 rounded-lg text-[#4169E1]">
                       <Trophy size={20} />
                    </div>
                    <div className="bg-[#FFD700] text-black text-[10px] font-black px-2 py-0.5 rounded shadow-lg">
                       +500 XP
                    </div>
                 </div>
                 
                 <h4 className="font-black text-lg text-white italic tracking-wide">5K CRUSHER</h4>
                 <p className="text-xs text-gray-400 mt-1 mb-4 font-medium">Run 5km under 25 mins.</p>
                 
                 <div>
                    <div className="flex justify-between text-[10px] mb-1.5 font-bold uppercase">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-[#00FFFF]">75%</span>
                    </div>
                    <div className="w-full bg-black/50 h-2 rounded-full overflow-hidden border border-white/5">
                      <div className="w-3/4 h-full bg-gradient-to-r from-[#00FFFF] to-[#4169E1] shadow-[0_0_10px_rgba(0,255,255,0.5)]"></div>
                    </div>
                 </div>
              </div>
           </GlassCard>
           
           {/* Challenge 2 */}
           <GlassCard className="min-w-[240px] p-0 bg-[#0A1128] border border-purple-500/30 relative overflow-hidden flex-shrink-0 group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="p-4 relative z-10">
                 <div className="flex justify-between items-start mb-3">
                    <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
                       <CloudSun size={20} />
                    </div>
                    <div className="bg-[#FFD700] text-black text-[10px] font-black px-2 py-0.5 rounded shadow-lg">
                       +300 XP
                    </div>
                 </div>
                 
                 <h4 className="font-black text-lg text-white italic tracking-wide">EARLY BIRD</h4>
                 <p className="text-xs text-gray-400 mt-1 mb-4 font-medium">Run before 7AM (3 days).</p>
                 
                 <div>
                    <div className="flex justify-between text-[10px] mb-1.5 font-bold uppercase">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-purple-400">1/3</span>
                    </div>
                    <div className="w-full bg-black/50 h-2 rounded-full overflow-hidden border border-white/5">
                      <div className="w-1/3 h-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                    </div>
                 </div>
              </div>
           </GlassCard>
         </div>
      </div>
    </div>
  );
};

export default Dashboard;
