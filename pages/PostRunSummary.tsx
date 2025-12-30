import React from 'react';
import { Share2, Hexagon, Home } from 'lucide-react';
import { BarChart, Bar, ResponsiveContainer, XAxis, Tooltip } from 'recharts';
import { AppRoute } from '../types';
import { GlassCard, NeonButton } from '../components/UIComponents';

interface PostRunSummaryProps {
  onNavigate: (route: AppRoute) => void;
}

const data = [
  { km: '1', time: 5.5 },
  { km: '2', time: 5.2 },
  { km: '3', time: 5.8 },
  { km: '4', time: 5.3 },
  { km: '5', time: 5.1 },
];

const PostRunSummary: React.FC<PostRunSummaryProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#0A1128] p-6 pb-24 overflow-y-auto">
      <div className="text-center mt-6 mb-8">
        <h1 className="text-3xl font-bold text-white">Great Run, Runners!!!</h1>
        <p className="text-[#00FFFF] mt-2 font-medium">Tuesday Morning Run • 7:15 AM</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <GlassCard className="p-4 flex flex-col items-center justify-center text-center">
            <div className="relative w-24 h-24 mb-2">
               <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path className="text-gray-700" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                  <path className="text-pink-500 drop-shadow-[0_0_5px_rgba(236,72,153,0.5)]" strokeDasharray="80, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
               </svg>
               <div className="absolute inset-0 flex items-center justify-center flex-col">
                 <span className="text-xl font-bold text-white">142</span>
                 <span className="text-[10px] text-gray-400">BPM</span>
               </div>
            </div>
            <span className="text-xs text-gray-300">Heart Rate Zone</span>
        </GlassCard>

        <GlassCard className="p-4 flex flex-col items-center justify-center text-center">
            <div className="relative w-24 h-24 mb-2">
               <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path className="text-gray-700" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                  <path className="text-[#00FFFF] drop-shadow-[0_0_5px_rgba(0,255,255,0.5)]" strokeDasharray="100, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
               </svg>
               <div className="absolute inset-0 flex items-center justify-center flex-col">
                 <span className="text-xl font-bold text-white">100%</span>
                 <span className="text-[10px] text-gray-400">Goal</span>
               </div>
            </div>
             <span className="text-xs text-gray-300">Completion</span>
        </GlassCard>
      </div>

      <GlassCard className="p-6 mb-6">
        <h3 className="text-lg font-bold text-white mb-4">Pace Splits (min/km)</h3>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="km" stroke="#6b7280" tick={{fill: '#9ca3af'}} axisLine={false} tickLine={false} />
              <Tooltip 
                cursor={{fill: 'rgba(255,255,255,0.05)'}}
                contentStyle={{ backgroundColor: '#0A1128', borderColor: '#4169E1', borderRadius: '10px' }}
                itemStyle={{ color: '#00FFFF' }}
              />
              <Bar dataKey="time" fill="#00FFFF" radius={[4, 4, 0, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      <GlassCard className="p-4 flex items-center gap-4 mb-8 bg-gradient-to-r from-[#4169E1]/20 to-transparent">
        <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center text-yellow-500">
           <Hexagon size={24} fill="rgba(234, 179, 8, 0.5)" />
        </div>
        <div>
           <h4 className="font-bold text-white">Early Bird Badge</h4>
           <p className="text-xs text-gray-400">Unlocked! Running before 8AM.</p>
        </div>
      </GlassCard>

      <div className="space-y-3">
        <NeonButton variant="primary">
          <span className="flex items-center justify-center gap-2">
            <Share2 size={18} /> Share Progress
          </span>
        </NeonButton>
        <NeonButton variant="secondary" onClick={() => onNavigate(AppRoute.DASHBOARD)}>
          <span className="flex items-center justify-center gap-2">
            <Home size={18} /> Back Home
          </span>
        </NeonButton>
      </div>
    </div>
  );
};

export default PostRunSummary;