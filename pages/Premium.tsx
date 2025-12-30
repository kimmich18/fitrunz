
import React, { useState } from 'react';
import { Check, Sparkles, X, Shield, Zap, Activity } from 'lucide-react';
import { GlassCard, NeonButton } from '../components/UIComponents';
import { AppRoute } from '../types';

interface PremiumProps {
  onNavigate: (route: AppRoute) => void;
}

const Premium: React.FC<PremiumProps> = ({ onNavigate }) => {
  const [yearly, setYearly] = useState(true);

  const features = [
    { icon: Sparkles, text: "AI Personal Coach Chat", sub: "24/7 Guidance" },
    { icon: Activity, text: "Advanced Heart Analytics", sub: "VO2 Max & Zones" },
    { icon: Zap, text: "Custom Meal Plans", sub: "Macro-nutrient tracking" },
    { icon: Shield, text: "Ad-Free Experience", sub: "Focus on your run" },
  ];

  return (
    <div className="min-h-screen bg-[#050A19] relative overflow-hidden flex flex-col font-sans">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-[-20%] right-[-20%] w-[500px] h-[500px] bg-[#FFD700]/10 rounded-full blur-[120px] animate-pulse"></div>
         <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-[#4169E1]/10 rounded-full blur-[100px]"></div>
      </div>

      <button 
        onClick={() => onNavigate(AppRoute.DASHBOARD)} 
        className="absolute top-6 left-6 z-30 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white border border-white/10 hover:border-white/30 transition-all"
      >
        <X size={20} />
      </button>

      {/* Hero Section */}
      <div className="relative h-[40vh] w-full flex items-end justify-center pb-10 overflow-hidden">
         {/* Running Image */}
         <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=1000&auto=format&fit=crop&q=80" 
              alt="Premium Runner" 
              className="w-full h-full object-cover opacity-60 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A1128]/50 via-[#0A1128]/20 to-[#0A1128]"></div>
         </div>
         
         <div className="relative z-10 text-center animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD700]/20 border border-[#FFD700]/50 backdrop-blur-md mb-4 shadow-[0_0_20px_rgba(255,215,0,0.3)]">
               <Sparkles size={12} className="text-[#FFD700]" fill="currentColor" />
               <span className="text-[10px] font-bold text-[#FFD700] uppercase tracking-widest">Premium Access</span>
            </div>
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-1 drop-shadow-xl">
               FitRun <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#FDB931] to-[#FFD700]">PRO</span>
            </h1>
            <p className="text-gray-300 text-sm max-w-xs mx-auto font-medium">
               Unleash your potential with AI-driven analytics.
            </p>
         </div>
      </div>

      {/* Content Sheet */}
      <div className="flex-1 bg-gradient-to-b from-[#0A1128]/90 to-[#050A19] backdrop-blur-xl rounded-t-[40px] border-t border-[#FFD700]/20 p-8 flex flex-col z-20 shadow-[0_-10px_60px_rgba(0,0,0,0.7)]">
         
         {/* Features Grid */}
         <div className="space-y-3 mb-8">
            {features.map((item, i) => (
              <div 
                key={i} 
                className="flex items-center gap-4 p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-[#FFD700]/30 transition-all group"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                 <div className="w-10 h-10 rounded-full bg-[#FFD700]/10 flex items-center justify-center text-[#FFD700] group-hover:scale-110 transition-transform">
                   <item.icon size={20} />
                 </div>
                 <div className="flex-1">
                   <h3 className="text-white font-bold text-sm">{item.text}</h3>
                   <p className="text-xs text-gray-500">{item.sub}</p>
                 </div>
                 <div className="w-5 h-5 rounded-full bg-[#FFD700] flex items-center justify-center shadow-[0_0_10px_rgba(255,215,0,0.4)]">
                    <Check size={12} className="text-black stroke-[4]" />
                 </div>
              </div>
            ))}
         </div>

         {/* Pricing Toggle */}
         <div className="bg-black/40 p-1.5 rounded-2xl flex mb-6 relative border border-white/10">
            <button 
              className={`flex-1 py-4 rounded-xl text-sm font-bold transition-all relative z-10 flex flex-col items-center justify-center gap-0.5 ${!yearly ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
              onClick={() => setYearly(false)}
            >
              <span>Monthly</span>
              <span className={`text-[10px] font-normal ${!yearly ? 'text-[#FFD700]' : 'text-gray-600'}`}>RM 19.90</span>
            </button>
            
            <button 
              className={`flex-1 py-4 rounded-xl text-sm font-bold transition-all relative z-10 flex flex-col items-center justify-center gap-0.5 ${yearly ? 'text-[#0A1128]' : 'text-gray-500 hover:text-gray-300'}`}
              onClick={() => setYearly(true)}
            >
              <span>Yearly</span>
              <span className={`text-[10px] font-black ${yearly ? 'text-[#0A1128]/70' : 'text-gray-600'}`}>RM 199.90</span>
            </button>

            {/* Sliding Background */}
            <div 
               className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-xl shadow-[0_0_20px_rgba(255,215,0,0.3)] transition-all duration-300 ease-out`}
               style={{ left: yearly ? 'calc(50% + 3px)' : '3px' }}
            >
               {yearly && (
                 <div className="absolute -top-3 right-0 bg-[#FFD700] text-[#0A1128] text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-lg transform rotate-2">
                   Save 17%
                 </div>
               )}
            </div>
         </div>

         <div className="mt-auto">
            <NeonButton variant="premium" onClick={() => onNavigate(AppRoute.PAYMENT)} className="group relative overflow-hidden">
               <span className="relative z-10 flex items-center justify-center gap-2">
                 Upgrade to FitRun Pro <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
               </span>
               <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 skew-y-12"></div>
            </NeonButton>
            <p className="text-center text-[10px] text-gray-500 mt-4">
               Secure payment encrypted by Stripe. Cancel anytime.
            </p>
         </div>
      </div>
    </div>
  );
};

export default Premium;
