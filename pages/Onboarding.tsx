
import React, { useState } from 'react';
import { Flame, Dumbbell, Zap, ChevronRight, Target } from 'lucide-react';
import { GlassCard, NeonButton } from '../components/UIComponents';
import { AppRoute, UserGoal } from '../types';

interface OnboardingProps {
  onNavigate: (route: AppRoute) => void;
  setGoal: (goal: UserGoal) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onNavigate, setGoal }) => {
  const [selected, setSelected] = useState<UserGoal | null>(null);

  const goals = [
    {
      id: UserGoal.LOSE_FAT,
      label: "Lose Fat",
      icon: Flame,
      color: "text-orange-500",
      borderColor: "border-orange-500",
      description: "High intensity interval training focus."
    },
    {
      id: UserGoal.IMPROVE_ENDURANCE,
      label: "Improve Endurance",
      icon: Zap,
      color: "text-[#00FFFF]",
      borderColor: "border-[#00FFFF]",
      description: "Long distance steady state running."
    },
    {
      id: UserGoal.BUILD_STRENGTH,
      label: "Build Strength",
      icon: Dumbbell,
      color: "text-purple-500",
      borderColor: "border-purple-500",
      description: "Hill sprints and weighted runs."
    }
  ];

  const handleContinue = () => {
    if (selected) {
      setGoal(selected);
      onNavigate(AppRoute.DASHBOARD);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1128] flex flex-col relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
             <div className="absolute top-[-10%] right-[-20%] w-[300px] h-[300px] bg-[#00FFFF]/10 rounded-full blur-[100px] animate-pulse"></div>
             <div className="absolute bottom-[-10%] left-[-20%] w-[300px] h-[300px] bg-[#4169E1]/10 rounded-full blur-[100px]"></div>
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
             {/* Cyber Dot Grid */}
             <div 
               className="absolute inset-0 opacity-20"
               style={{ 
                 backgroundImage: 'radial-gradient(rgba(65, 105, 225, 0.2) 1px, transparent 1px)',
                 backgroundSize: '20px 20px'
               }}
             />
        </div>

        <div className="flex-1 flex flex-col justify-center px-6 max-w-md mx-auto w-full z-10 py-10">
            <div className="mb-10 text-center animate-fade-in-up">
                 <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,255,255,0.1)] group hover:shadow-[0_0_50px_rgba(0,255,255,0.3)] transition-all duration-500">
                    <Target size={32} className="text-[#00FFFF] group-hover:scale-110 transition-transform" />
                 </div>
                 <h1 className="text-4xl font-black italic text-white tracking-tighter mb-2">
                    SELECT <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFFF] to-[#4169E1]">OBJECTIVE</span>
                 </h1>
                 <p className="text-gray-400 text-sm max-w-xs mx-auto">
                    Calibrate your AI Coach by defining your primary fitness target.
                 </p>
            </div>

            <div className="space-y-4">
                {goals.map((item, idx) => {
                  const isSelected = selected === item.id;
                  const Icon = item.icon;
                  
                  return (
                    <div 
                        key={item.id}
                        onClick={() => setSelected(item.id)}
                        className={`relative group cursor-pointer transition-all duration-300 transform ${isSelected ? 'scale-[1.02]' : 'hover:scale-[1.01]'}`}
                        style={{ animationDelay: `${idx * 100}ms` }}
                    >
                        {/* Glow Effect when selected */}
                        <div className={`absolute inset-0 rounded-[24px] bg-gradient-to-r ${item.color.replace('text-', 'from-')}/20 to-transparent blur-xl transition-opacity duration-500 ${isSelected ? 'opacity-100' : 'opacity-0'}`}></div>

                        <GlassCard className={`relative p-5 flex items-center gap-5 border transition-all duration-300 ${isSelected ? `${item.borderColor} bg-white/10 shadow-[0_0_20px_rgba(0,0,0,0.3)]` : 'border-white/5 hover:border-white/20'}`}>
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-[#0A1128]/50 border border-white/10 ${isSelected ? item.color : 'text-gray-400 group-hover:text-white'} transition-colors`}>
                                <Icon size={28} />
                            </div>
                            <div className="flex-1">
                                <h3 className={`font-bold text-lg tracking-wide ${isSelected ? 'text-white' : 'text-gray-300 group-hover:text-white'} transition-colors`}>
                                    {item.label}
                                </h3>
                                <p className={`text-xs mt-1 transition-colors ${isSelected ? 'text-gray-300' : 'text-gray-500'}`}>
                                    {item.description}
                                </p>
                            </div>
                            
                            {/* Radio Circle */}
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? item.borderColor : 'border-gray-600'}`}>
                                <div className={`w-2.5 h-2.5 rounded-full transition-transform duration-300 ${isSelected ? `bg-current ${item.color} scale-100` : 'scale-0'}`}></div>
                            </div>
                        </GlassCard>
                    </div>
                  );
                })}
            </div>
        </div>

        <div className="p-6 z-10 w-full max-w-md mx-auto">
             <NeonButton 
                onClick={handleContinue} 
                disabled={!selected}
                className="group relative overflow-hidden"
             >
                <span className="flex items-center justify-center gap-2 relative z-10">
                   Initialize Training <ChevronRight size={20} className={`transition-transform duration-300 ${selected ? 'group-hover:translate-x-1' : ''}`} />
                </span>
             </NeonButton>
             
             {/* System Status Footer */}
             <div className="mt-8 border-t border-white/5 pt-4 flex justify-between items-center text-[10px] text-gray-500 font-mono uppercase tracking-widest px-2">
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                   <span>System Online</span>
                </div>
             </div>
        </div>
    </div>
  );
};

export default Onboarding;
