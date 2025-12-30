import React from 'react';
import { AppRoute, User } from '../types';
import { NeonButton } from '../components/UIComponents';
import { Check } from 'lucide-react';

interface SuccessProps {
  onNavigate: (route: AppRoute) => void;
  upgradeUser: () => void;
}

const Success: React.FC<SuccessProps> = ({ onNavigate, upgradeUser }) => {
  
  React.useEffect(() => {
    upgradeUser();
    // Fire confetti or similar effect here if using a library
  }, []);

  return (
    <div className="min-h-screen bg-[#0A1128] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Background Particles (CSS only for simplicity) */}
      <div className="absolute inset-0 overflow-hidden">
         <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#00FFFF] rounded-full animate-ping"></div>
         <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-[#FFD700] rounded-full animate-bounce"></div>
         <div className="absolute top-1/2 left-3/4 w-2 h-2 bg-[#4169E1] rounded-full animate-ping delay-100"></div>
      </div>

      <div className="relative z-10 mb-8">
        <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-[#00FFFF] to-[#22c55e] p-1 shadow-[0_0_50px_rgba(0,255,255,0.4)] mx-auto flex items-center justify-center mb-6">
           <div className="w-full h-full bg-[#0A1128] rounded-full flex items-center justify-center">
             <div className="w-24 h-24 bg-gradient-to-tr from-[#00FFFF] to-[#22c55e] rounded-full flex items-center justify-center text-[#0A1128]">
                <Check size={48} strokeWidth={4} />
             </div>
           </div>
        </div>
        
        <h1 className="text-3xl font-black text-white mb-2">Welcome to Pro!</h1>
        <p className="text-gray-400">Your AI Coach is calibrated and ready.</p>
      </div>

      <NeonButton 
        onClick={() => onNavigate(AppRoute.DASHBOARD)} 
        className="max-w-xs animate-pulse"
      >
        Start Training
      </NeonButton>
    </div>
  );
};

export default Success;