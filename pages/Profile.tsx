
import React, { useState } from 'react';
import { 
  User as UserIcon, 
  Settings, 
  Phone, 
  Globe, 
  Bell, 
  Moon, 
  Sun, 
  ChevronRight, 
  ShieldCheck, 
  LogOut, 
  Footprints, 
  Watch, 
  Award,
  Activity
} from 'lucide-react';
import { GlassCard, SectionHeader } from '../components/UIComponents';
import { AppRoute, User } from '../types';

interface ProfileProps {
  user: User;
  onNavigate: (route: AppRoute) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onNavigate }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);

  // Mock VO2 Max data
  const vo2Max = 48.5;
  
  const getFitnessLevel = (value: number) => {
    if (value < 30) return { label: 'VERY POOR', color: 'bg-red-500', index: 0 };
    if (value < 35) return { label: 'POOR', color: 'bg-orange-500', index: 1 };
    if (value < 40) return { label: 'FAIR', color: 'bg-yellow-500', index: 2 };
    if (value < 45) return { label: 'GOOD', color: 'bg-green-400', index: 3 };
    if (value < 50) return { label: 'EXCELLENCE', color: 'bg-[#00FFFF]', index: 4 };
    return { label: 'SUPERIOR', color: 'bg-[#FFD700]', index: 5 };
  };

  const level = getFitnessLevel(vo2Max);
  const segments = ['VERY POOR', 'POOR', 'FAIR', 'GOOD', 'EXCELLENCE', 'SUPERIOR'];

  const biometrics = [
    { label: 'AGE', value: user.age || '24', unit: 'yrs' },
    { label: 'WEIGHT', value: user.weight || '72', unit: 'kg' },
    { label: 'HEIGHT', value: user.height || '178', unit: 'cm' },
  ];

  const gear = [
    { name: 'Nike Vaporfly 3', type: 'Footwear', icon: Footprints, health: '85%' },
    { name: 'Garmin Epix Gen 2', type: 'Tracker', icon: Watch, health: 'Synced' },
  ];

  const settingsOptions = [
    { icon: Phone, label: 'Phone Number', value: '+60 12-345 6789' },
    { icon: Globe, label: 'Language', value: 'English (US)' },
  ];

  return (
    <div className="pb-28 pt-8 px-6 space-y-8 max-w-md mx-auto min-h-screen bg-[#0A1128]">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-20%] w-[300px] h-[300px] bg-[#4169E1]/5 rounded-full blur-[80px]"></div>
          <div className="absolute bottom-[10%] right-[-10%] w-[250px] h-[250px] bg-[#00FFFF]/5 rounded-full blur-[70px]"></div>
      </div>

      {/* Header Profile Info */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative group mb-4">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#00FFFF] to-[#4169E1] p-[3px] shadow-[0_0_30px_rgba(0,255,255,0.3)] group-hover:scale-105 transition-transform">
            <div className="w-full h-full rounded-[22px] bg-[#0A1128] flex items-center justify-center overflow-hidden border border-white/10">
              <UserIcon size={48} className="text-gray-300" />
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#FFD700] rounded-xl flex items-center justify-center text-[#0A1128] border-2 border-[#0A1128] shadow-lg">
             <ShieldCheck size={18} />
          </div>
        </div>
        <h2 className="text-2xl font-black italic text-white uppercase tracking-tighter">{user.name || "Runner Name"}</h2>
        
        {user.isPremium && (
          <div className="mt-3 inline-flex items-center gap-2 bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-full px-4 py-1">
             <Award size={14} className="text-[#FFD700]" />
             <span className="text-[10px] font-black text-[#FFD700] uppercase tracking-[0.2em]">FitRun Pro Member</span>
          </div>
        )}
      </div>

      {/* Biometrics Grid */}
      <div className="grid grid-cols-3 gap-3 relative z-10">
        {biometrics.map((bio, i) => (
          <GlassCard key={i} className="p-4 text-center border-white/5 bg-white/[0.02]">
            <p className="text-[9px] font-black text-gray-500 tracking-[0.2em] mb-1">{bio.label}</p>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-xl font-black text-white">{bio.value}</span>
              <span className="text-[10px] text-gray-400 font-bold lowercase">{bio.unit}</span>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Fitness Level: Vo2 Max */}
      <div className="relative z-10">
        <SectionHeader title="Fitness Level" subtitle="Bio-Performance Metrics" />
        <GlassCard className="p-6 border-[#00FFFF]/20 relative overflow-hidden bg-gradient-to-br from-[#00FFFF]/5 to-transparent">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-[10px] font-black text-[#00FFFF] tracking-[0.2em] uppercase mb-1">Current Vo2 Max</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-white italic tracking-tighter">{vo2Max}</span>
                <span className="text-sm font-bold text-gray-500 uppercase">ml/kg/min</span>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-lg ${level.color} bg-opacity-20 border border-current flex items-center gap-2`}>
               <Activity size={14} className={level.color.replace('bg-', 'text-')} />
               <span className={`text-[10px] font-black ${level.color.replace('bg-', 'text-')} tracking-wider`}>{level.label}</span>
            </div>
          </div>

          {/* Segmented Indicator */}
          <div className="space-y-3">
            <div className="flex gap-1.5 h-2">
              {segments.map((s, i) => (
                <div 
                  key={s} 
                  className={`flex-1 rounded-full transition-all duration-700 ${
                    i <= level.index 
                      ? `${level.color} shadow-[0_0_10px_currentColor]` 
                      : 'bg-white/5 border border-white/5'
                  }`}
                />
              ))}
            </div>
            <div className="flex justify-between">
              <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Very Poor</span>
              <span className="text-[8px] font-black text-[#FFD700] uppercase tracking-widest">Superior</span>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Tactical Gear */}
      <div className="relative z-10">
        <SectionHeader title="Tactical Gear" subtitle="Current Equipment Status" />
        <div className="space-y-3">
           {gear.map((item, i) => (
             <GlassCard key={i} className="p-4 flex items-center justify-between border-white/5 hover:border-[#00FFFF]/20 transition-all">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#00FFFF] border border-white/10">
                      <item.icon size={20} />
                   </div>
                   <div>
                      <h4 className="text-sm font-bold text-white tracking-tight">{item.name}</h4>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{item.type}</p>
                   </div>
                </div>
                <div className="text-right">
                   <span className="text-[10px] font-black text-[#00FFFF] bg-[#00FFFF]/10 px-2 py-1 rounded-md">{item.health}</span>
                </div>
             </GlassCard>
           ))}
        </div>
      </div>

      {/* System Settings */}
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
           <Settings size={20} className="text-[#4169E1]" />
           <h3 className="text-lg font-black text-white italic tracking-tight">SYSTEM SETTINGS</h3>
        </div>

        <div className="space-y-4">
           {/* Static Settings */}
           {settingsOptions.map((opt, i) => (
             <GlassCard key={i} className="p-4 flex items-center justify-between border-white/5 hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-4">
                   <div className="text-gray-400"><opt.icon size={20} /></div>
                   <span className="text-sm font-bold text-gray-200">{opt.label}</span>
                </div>
                <div className="flex items-center gap-2">
                   <span className="text-xs text-gray-500 font-medium">{opt.value}</span>
                   <ChevronRight size={16} className="text-gray-600" />
                </div>
             </GlassCard>
           ))}

           {/* Notification Toggle */}
           <GlassCard className="p-4 flex items-center justify-between border-white/5">
              <div className="flex items-center gap-4">
                 <div className="text-gray-400"><Bell size={20} /></div>
                 <span className="text-sm font-bold text-gray-200">Push Notifications</span>
              </div>
              <button 
                onClick={() => setNotifications(!notifications)}
                className={`w-12 h-6 rounded-full transition-colors relative ${notifications ? 'bg-[#00FFFF]' : 'bg-gray-700'}`}
              >
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${notifications ? 'left-7' : 'left-1'}`}></div>
              </button>
           </GlassCard>

           {/* Display Mode (Dark/Light) */}
           <GlassCard className="p-4 flex items-center justify-between border-white/5">
              <div className="flex items-center gap-4">
                 <div className="text-gray-400">{isDarkMode ? <Moon size={20} /> : <Sun size={20} />}</div>
                 <span className="text-sm font-bold text-gray-200">Display Mode</span>
              </div>
              <div className="flex bg-black/40 p-1 rounded-xl border border-white/5">
                 <button 
                  onClick={() => setIsDarkMode(true)}
                  className={`p-1.5 rounded-lg transition-all ${isDarkMode ? 'bg-white/10 text-[#00FFFF]' : 'text-gray-600'}`}
                 >
                    <Moon size={16} />
                 </button>
                 <button 
                  onClick={() => setIsDarkMode(false)}
                  className={`p-1.5 rounded-lg transition-all ${!isDarkMode ? 'bg-white/10 text-orange-400' : 'text-gray-600'}`}
                 >
                    <Sun size={16} />
                 </button>
              </div>
           </GlassCard>

           {/* Extra Menu Items */}
           <div className="pt-4 space-y-2">
              <button 
                onClick={() => onNavigate(AppRoute.SIGNUP)}
                className="w-full p-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-between hover:bg-red-500/20 transition-all group"
              >
                 <div className="flex items-center gap-4">
                    <LogOut size={20} className="text-red-500" />
                    <span className="text-sm font-black text-red-500 italic">EXIT APP</span>
                 </div>
              </button>
           </div>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="text-center py-6 opacity-40">
         <p className="text-[10px] font-black italic tracking-[0.3em] text-white">BOYS NEW ERA • VERSION 2.4.0</p>
      </div>
    </div>
  );
};

export default Profile;
