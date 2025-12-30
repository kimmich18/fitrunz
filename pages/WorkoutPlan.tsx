
import React, { useState } from 'react';
import { Calendar, Clock, Trophy, Zap, ChevronRight, Activity, RefreshCw, Lightbulb, ArrowRight, ArrowLeft, X, Flag, MapPin } from 'lucide-react';
import { GlassCard, NeonButton, SectionHeader } from '../components/UIComponents';
import { AppRoute } from '../types';

interface WorkoutPlanProps {
  onNavigate: (route: AppRoute) => void;
}

const WorkoutPlan: React.FC<WorkoutPlanProps> = ({ onNavigate }) => {
  const [selectedDay, setSelectedDay] = useState(2); // Default to "Today" (Wednesday in mock)
  const [activeIdea, setActiveIdea] = useState<typeof workoutIdeas[0] | null>(null);

  const weekDays = [
    { day: 'M', date: '12', status: 'done' },
    { day: 'T', date: '13', status: 'done' },
    { day: 'W', date: '14', status: 'active' }, // Today
    { day: 'T', date: '15', status: 'upcoming' },
    { day: 'F', date: '16', status: 'upcoming' },
    { day: 'S', date: '17', status: 'rest' },
    { day: 'S', date: '18', status: 'rest' },
  ];

  const workoutDetails = {
    title: "Velocity Overdrive",
    type: "Interval Sprints",
    duration: "45 min",
    intensity: "High",
    kcal: "450-500",
    xp: "+120 XP",
    description: "High-intensity interval training designed to spike heart rate and boost V02 Max. Focus on explosion during sprint phases."
  };

  const upcomingRaces = [
    { name: "KL Standard Chartered Marathon", date: "OCT 05", loc: "Dataran Merdeka, KL", dist: "42.2KM", status: "Open" },
    { name: "BOOMRUN Marathon", date: "NOV 12", loc: "Cyberjaya", dist: "21.1KM", status: "Closing Soon" },
    { name: "LANGKAWI Marathon", date: "DEC 08", loc: "Langkawi Island", dist: "42.2KM", status: "Early Bird" },
    { name: "GARMIN Marathon", date: "JAN 20", loc: "Putrajaya", dist: "10KM", status: "Upcoming" },
  ];

  const workoutIdeas = [
    {
      title: "High Knees",
      targets: ["Cardio", "Quads", "Hip Flexors", "Core"],
      form: "Stand tall with feet hip-width apart. Drive your right knee up toward your chest, then immediately switch to drive the left knee up. Continue alternating at a running pace. Keep your chest up and core engaged; do not lean backward. Swing your arms in rhythm with your legs.",
      benefits: "High Knees are a fantastic warm-up or active recovery move that spikes your heart rate while improving running mechanics and lower-abdominal strength."
    },
    {
      title: "Mountain Climbers",
      targets: ["Core", "Shoulders", "Quads", "Cardio"],
      form: "Start in a high plank position (hands directly under shoulders), engaging your core to keep your back flat. Drive one knee toward your chest, then quickly switch legs, simulating a running motion against the floor. Keep your hips level—don't let them pike up or sag down.",
      benefits: "This is a 'two-for-one' exercise that builds dynamic core stability while simultaneously acting as a high-intensity cardio burst."
    },
    {
      title: "Jumping Lunges",
      targets: ["Glutes", "Quads", "Hamstrings", "Power"],
      form: "Start in a standard lunge position with one foot forward and knees at 90-degree angles. Explosively jump into the air, switching your legs in mid-air, and land softly with the opposite foot forward. Immediately sink into the next lunge.",
      benefits: "A plyometric powerhouse that builds explosive leg strength, burns massive calories, and challenges your balance."
    },
    {
      title: "Plank Crunches",
      targets: ["Obliques", "Serratus Anterior", "Deep Core"],
      form: "Begin in a forearm plank or high plank position. Bring your right knee out to the side to tap your right elbow (or tricep). Return the leg to the starting position and repeat on the left side. Keep your body stable and avoid rocking side-to-side.",
      benefits: "Unlike standard crunches, this anti-rotation movement targets the 'corset' muscles of your waist (obliques) without straining your neck or lower back."
    },
    {
      title: "Side Bridges",
      targets: ["Obliques", "QL", "Hips", "Stability"],
      form: "Lie on your side with your forearm on the floor, elbow under your shoulder. Stack your feet and lift your hips until your body forms a straight line from head to heels. Hold still, or lower and lift your hips for a dynamic version.",
      benefits: "Essential for lateral stability, this move strengthens the often-neglected muscles that support your spine and prevent back pain."
    },
    {
      title: "Hollow Hold",
      targets: ["Deep Core", "Hip Flexors"],
      form: "Lie flat on your back with arms extended overhead and legs straight. Press your lower back firmly into the floor (this is crucial). Lift your shoulders and legs about 6 inches off the ground, creating a 'banana' shape. Hold this tension without letting your lower back arch.",
      benefits: "A gymnastic staple, this isometric hold teaches you to brace your entire core under tension, creating rock-solid abdominal strength."
    },
    {
      title: "Butt Kicks",
      targets: ["Hamstrings", "Cardio", "Active Recovery"],
      form: "Stand tall and jog in place, but instead of lifting your knees, kick your heels back toward your glutes. Keep your thighs perpendicular to the floor. Pump your arms to keep the intensity up.",
      benefits: "This dynamic stretch activates the hamstrings and increases quad flexibility while keeping your heart rate elevated between tougher sets."
    },
    {
      title: "Body Saw",
      targets: ["Deep Core", "Shoulders"],
      form: "Start in a forearm plank with your feet on a smooth surface (use sliders, a towel, or just socks). Keeping your body rigid, push through your forearms to slide your body backward a few inches, then pull yourself back forward to the starting position.",
      benefits: "By extending the lever arm of your body, you dramatically increase the tension on your core, making it significantly harder than a standard plank."
    },
    {
      title: "Side Leg Raises",
      targets: ["Glute Medius", "Outer Thighs", "Hips"],
      form: "Lie on your side, legs stacked and straight. Lift the top leg toward the ceiling with control (avoid using momentum). Lower it back down without letting it fully rest on the bottom leg. Keep your toes pointed forward, not up.",
      benefits: "This isolation exercise strengthens the hip abductors, which are critical for knee stability, balance, and preventing hip injuries."
    },
    {
      title: "Jumping Jacks",
      targets: ["Full Body Cardio", "Calves", "Shoulders"],
      form: "Stand with feet together and arms at your sides. Jump your feet out wide while simultaneously raising your arms overhead. Jump back to the starting position immediately. Stay on the balls of your feet.",
      benefits: "The ultimate classic cardio move to flush out lactic acid, improve coordination, and finish the workout with a high heart rate."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A1128] pb-28 pt-6 px-4">
       {/* Background Matrix */}
       <div className="fixed inset-0 pointer-events-none opacity-10" 
            style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(0, 255, 255, .3) 25%, rgba(0, 255, 255, .3) 26%, transparent 27%, transparent 74%, rgba(0, 255, 255, .3) 75%, rgba(0, 255, 255, .3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 255, 255, .3) 25%, rgba(0, 255, 255, .3) 26%, transparent 27%, transparent 74%, rgba(0, 255, 255, .3) 75%, rgba(0, 255, 255, .3) 76%, transparent 77%, transparent)', backgroundSize: '50px 50px' }}>
       </div>

      <button 
        onClick={() => onNavigate(AppRoute.DASHBOARD)} 
        className="mb-4 text-gray-400 hover:text-white flex items-center gap-2 transition-colors group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
        <span className="text-xs font-bold uppercase tracking-widest">Dashboard</span>
      </button>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-black italic text-white tracking-tighter">
            TRAINING <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFFF] to-[#4169E1]">PROTOCOL</span>
        </h1>
        <button className="p-2 bg-white/5 rounded-full border border-white/10 hover:border-[#00FFFF] transition-colors">
            <Calendar size={20} className="text-[#00FFFF]" />
        </button>
      </div>

      {/* Week Strip */}
      <div className="flex justify-between items-center mb-8 bg-white/5 p-2 rounded-2xl border border-white/5 backdrop-blur-md">
        {weekDays.map((d, i) => {
            const isSelected = i === selectedDay;
            let statusColor = 'bg-white/5 border-white/10';
            if (d.status === 'done') statusColor = 'bg-[#4169E1]/20 border-[#4169E1] text-[#4169E1]';
            if (d.status === 'active') statusColor = 'bg-[#00FFFF] text-black border-[#00FFFF] shadow-[0_0_15px_rgba(0,255,255,0.4)]';
            if (d.status === 'rest') statusColor = 'bg-gray-800/50 border-gray-700 text-gray-500';

            return (
                <div 
                    key={i} 
                    onClick={() => setSelectedDay(i)}
                    className={`flex flex-col items-center justify-center w-10 h-14 rounded-xl border cursor-pointer transition-all duration-300 ${statusColor} ${isSelected ? 'scale-110 z-10' : 'hover:bg-white/10'}`}
                >
                    <span className="text-[10px] font-bold">{d.day}</span>
                    <span className="text-sm font-black">{d.date}</span>
                </div>
            )
        })}
      </div>

      {/* Today's Mission */}
      <div className="mb-8 animate-fade-in-up">
        <SectionHeader title="Today's Mission" subtitle="Phase 2: Speed Calibration" />
        
        <GlassCard className="p-0 overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-4 z-10">
                <div className="bg-[#FFD700] text-black text-[10px] font-black px-2 py-1 rounded uppercase tracking-wider shadow-lg">
                    {workoutDetails.xp}
                </div>
            </div>

            <div className="p-6 relative z-10">
                <div className="inline-flex items-center gap-2 mb-2 text-[#00FFFF]">
                    <Zap size={16} fill="currentColor" />
                    <span className="text-xs font-bold uppercase tracking-widest">{workoutDetails.type}</span>
                </div>
                <h2 className="text-3xl font-black text-white italic tracking-tight mb-4">{workoutDetails.title}</h2>
                
                <div className="flex gap-4 mb-6">
                    <div className="flex items-center gap-2 text-gray-300">
                        <Clock size={16} className="text-[#4169E1]" />
                        <span className="text-sm font-mono">{workoutDetails.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                        <Activity size={16} className="text-orange-500" />
                        <span className="text-sm font-mono">{workoutDetails.intensity}</span>
                    </div>
                </div>

                <p className="text-sm text-gray-400 leading-relaxed mb-6">
                    {workoutDetails.description}
                </p>

                <NeonButton onClick={() => onNavigate(AppRoute.ACTIVITY)} className="group">
                    <span className="flex items-center justify-center gap-2">
                        Initialize Session <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform"/>
                    </span>
                </NeonButton>
            </div>
            
            {/* Decorative Background */}
            <div className="absolute right-[-20%] bottom-[-20%] opacity-10 text-[#00FFFF]">
                <Activity size={200} />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-[#00FFFF]/5 to-transparent pointer-events-none"></div>
        </GlassCard>
      </div>

      {/* Workout Ideas Section (Horizontal Scroll) */}
      <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
         <div className="flex justify-between items-end mb-4">
            <SectionHeader title="Workout Ideas" subtitle="Tactical Intel" />
            <span className="text-[10px] text-gray-500 flex items-center gap-1 uppercase tracking-wider pb-6 animate-pulse">
                Swipe & Tap <ArrowRight size={10} />
            </span>
         </div>
         
         <div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4 snap-x no-scrollbar">
            {workoutIdeas.map((workoutIdea, index) => (
                <GlassCard 
                  key={index} 
                  onClick={() => setActiveIdea(workoutIdea)}
                  className="min-w-[300px] max-w-[300px] p-5 border-[#00FFFF]/20 relative overflow-hidden bg-gradient-to-br from-[#0A1128] to-transparent snap-center flex-shrink-0 cursor-pointer hover:border-[#00FFFF]/50 hover:shadow-[0_0_20px_rgba(0,255,255,0.1)] transition-all active:scale-[0.98]"
                >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#00FFFF]/5 rounded-bl-[100px] pointer-events-none"></div>
                    
                    <div className="flex items-start justify-between mb-4 relative z-10">
                        <div>
                            <h3 className="text-xl font-black text-white italic tracking-wide break-words pr-2">{workoutIdea.title}</h3>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {workoutIdea.targets.map((target, idx) => (
                                    <span key={idx} className="text-[10px] font-bold bg-[#00FFFF]/10 text-[#00FFFF] px-2 py-0.5 rounded border border-[#00FFFF]/20 uppercase">
                                        {target}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="p-2.5 bg-yellow-500/10 rounded-xl text-yellow-500 border border-yellow-500/30 shadow-[0_0_15px_rgba(234,179,8,0.1)] flex-shrink-0">
                            <Lightbulb size={20} />
                        </div>
                    </div>

                    <div className="space-y-4 relative z-10 h-64 overflow-hidden mask-fade-bottom">
                         {/* Preview Content (Faded) */}
                         <div className="opacity-70 pointer-events-none">
                            <div className="bg-white/5 p-3 rounded-lg border border-white/5 mb-4">
                                <h4 className="text-xs font-bold text-gray-200 mb-1 flex items-center gap-2 uppercase tracking-wider">
                                    <span className="w-1.5 h-1.5 bg-[#00FFFF] rounded-full"></span> Proper Form
                                </h4>
                                <p className="text-xs text-gray-400 leading-relaxed font-medium line-clamp-3">
                                    {workoutIdea.form}
                                </p>
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-gray-200 mb-1 flex items-center gap-2 uppercase tracking-wider">
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Why It Works
                                </h4>
                                <p className="text-xs text-gray-400 leading-relaxed pl-2 border-l-2 border-green-500/30 line-clamp-2">
                                    {workoutIdea.benefits}
                                </p>
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#0A1128] to-transparent flex items-end justify-center pb-2">
                           <span className="text-[10px] text-[#00FFFF] font-bold uppercase tracking-widest border-b border-[#00FFFF]">Tap for details</span>
                        </div>
                    </div>
                </GlassCard>
            ))}
         </div>
      </div>

      {/* Upcoming Races */}
      <div>
         <SectionHeader title="Upcoming Races" subtitle="The Arena Awaits" />
         <div className="space-y-4">
            {upcomingRaces.map((race, i) => (
                <GlassCard key={i} className="p-4 flex items-center justify-between border-white/5 hover:border-[#00FFFF]/30 transition-all group relative overflow-hidden">
                    {/* Background Distance Watermark */}
                    <div className="absolute -right-2 -bottom-2 text-white opacity-[0.03] font-black italic text-4xl pointer-events-none group-hover:opacity-[0.05] transition-opacity">
                        {race.dist}
                    </div>

                    <div className="flex items-center gap-4 relative z-10">
                        <div className="flex flex-col items-center justify-center w-14 h-14 rounded-xl bg-white/5 border border-white/10 group-hover:border-[#00FFFF]/50 transition-colors">
                            <span className="text-[10px] text-[#00FFFF] font-black">{race.date.split(' ')[0]}</span>
                            <span className="text-lg font-black text-white leading-none">{race.date.split(' ')[1]}</span>
                        </div>
                        <div>
                            <h4 className="text-white font-bold text-sm tracking-tight leading-snug">{race.name}</h4>
                            <div className="flex items-center gap-3 mt-1">
                                <span className="text-[10px] flex items-center gap-1 text-gray-400 font-medium">
                                    <MapPin size={10} className="text-[#4169E1]" /> {race.loc}
                                </span>
                                <span className="text-[10px] font-black text-[#00FFFF]">{race.dist}</span>
                            </div>
                        </div>
                    </div>
                    <div className="text-right relative z-10">
                        <div className={`text-[9px] font-black uppercase tracking-widest mb-1 px-2 py-0.5 rounded ${race.status === 'Closing Soon' ? 'bg-red-500/20 text-red-400' : 'bg-[#00FFFF]/10 text-[#00FFFF]'}`}>
                            {race.status}
                        </div>
                        <button className="text-gray-500 group-hover:text-white transition-colors">
                            <ArrowRight size={18} />
                        </button>
                    </div>
                </GlassCard>
            ))}
         </div>
      </div>

      {/* Detail Modal */}
      {activeIdea && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A1128]/90 backdrop-blur-md animate-fade-in">
           <div className="absolute inset-0" onClick={() => setActiveIdea(null)}></div>
           <GlassCard className="w-full max-w-lg max-h-[85vh] overflow-y-auto relative z-10 p-0 border-[#00FFFF]/30 bg-[#0A1128] shadow-[0_0_50px_rgba(0,0,0,0.8)] animate-scale-up">
              
              {/* Header */}
              <div className="p-6 pb-4 border-b border-white/10 sticky top-0 bg-[#0A1128]/95 backdrop-blur z-20 flex justify-between items-start">
                 <div>
                    <h3 className="text-3xl font-black text-white italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                        {activeIdea.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-3">
                        {activeIdea.targets.map((target, idx) => (
                            <span key={idx} className="text-[10px] font-bold bg-[#00FFFF]/10 text-[#00FFFF] px-2 py-0.5 rounded border border-[#00FFFF]/20 uppercase">
                                {target}
                            </span>
                        ))}
                    </div>
                 </div>
                 <button 
                   onClick={() => setActiveIdea(null)} 
                   className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors"
                 >
                    <X size={24} />
                 </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                  <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
                        <h4 className="text-sm font-black text-white mb-3 flex items-center gap-2 uppercase tracking-wider">
                            <span className="p-1 bg-[#00FFFF]/20 rounded-md text-[#00FFFF]"><Activity size={14} /></span>
                            Execution Protocol
                        </h4>
                        <p className="text-sm text-gray-300 leading-relaxed font-medium">
                            {activeIdea.form}
                        </p>
                  </div>

                  <div>
                        <h4 className="text-sm font-black text-white mb-3 flex items-center gap-2 uppercase tracking-wider">
                             <span className="p-1 bg-green-500/20 rounded-md text-green-400"><Zap size={14} /></span>
                             Tactical Advantage
                        </h4>
                        <p className="text-sm text-gray-400 leading-relaxed pl-4 border-l-2 border-green-500/30">
                            {activeIdea.benefits}
                        </p>
                  </div>

                  <div className="pt-4">
                     <NeonButton onClick={() => setActiveIdea(null)} variant="secondary">
                        Acknowledge Intel
                     </NeonButton>
                  </div>
              </div>
           </GlassCard>
        </div>
      )}
    </div>
  );
};

export default WorkoutPlan;
