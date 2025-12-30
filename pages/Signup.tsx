
import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { GlassCard, NeonButton } from '../components/UIComponents';
import { AppRoute } from '../types';

interface SignupProps {
  onNavigate: (route: AppRoute) => void;
  onLogin: (name: string) => void;
}

// Helper for inputs with icons - Defined OUTSIDE the component to prevent re-mounts
const IconInput = ({ icon: Icon, ...props }: any) => (
  <div className="relative group mb-4">
    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
      <Icon size={20} className="text-gray-500 group-focus-within:text-[#00FFFF] transition-colors" />
    </div>
    <input 
      className="w-full bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl pl-12 pr-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#00FFFF] focus:shadow-[0_0_15px_rgba(0,255,255,0.2)] transition-all"
      {...props}
    />
  </div>
);

const Signup: React.FC<SignupProps> = ({ onNavigate, onLogin }) => {
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleAuth = () => {
    // Mock validation
    if (email && password) {
      if (!isLoginMode && !name) return; // Name required for signup
      onLogin(name || "Runner");
      onNavigate(AppRoute.ONBOARDING);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-6 overflow-hidden bg-[#0A1128]">
      {/* --- Background Layers --- */}
      {/* Base Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-[20s] hover:scale-105"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&auto=format&fit=crop&q=80")', // High quality gym/run darkness
          filter: 'grayscale(100%) brightness(0.4) contrast(1.1)' 
        }}
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-[#0A1128]/80 to-transparent z-0"></div>
      
      {/* Cyber Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-20 z-0 pointer-events-none"
        style={{ 
           backgroundImage: 'linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)',
           backgroundSize: '40px 40px',
           transform: 'perspective(500px) rotateX(20deg)'
        }}
      />

      {/* Decorative Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-[#00FFFF] rounded-full blur-[120px] opacity-20 animate-pulse z-0 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-[#4169E1] rounded-full blur-[120px] opacity-30 z-0 pointer-events-none"></div>

      {/* --- Main Content --- */}
      <div className="relative z-10 w-full max-w-md animate-fade-in-up">
        {/* Logo Section */}
        <div className="text-center mb-8 group cursor-default">
          <h1 className="text-6xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] transform transition-transform group-hover:scale-105">
            FIT<span className="text-[#00FFFF] drop-shadow-[0_0_20px_rgba(0,255,255,0.8)]">RUN</span>
          </h1>
          <div className="mt-2">
            <p className="text-[#00FFFF] text-[10px] font-bold italic uppercase tracking-widest opacity-80">
              #OneDayOrDayOne
            </p>
            <p className="text-gray-400 text-[9px] italic mt-1 font-mono opacity-60">
              #WhatCanYouDo #TheGameIsRigged
            </p>
          </div>
        </div>

        <GlassCard className="p-8 backdrop-blur-2xl bg-black/40 border-[#00FFFF]/20 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
           <div className="mb-6 flex justify-center bg-black/30 p-1 rounded-xl">
              <button 
                onClick={() => setIsLoginMode(false)}
                className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${!isLoginMode ? 'bg-white/10 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
              >
                Sign Up
              </button>
              <button 
                onClick={() => setIsLoginMode(true)}
                className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${isLoginMode ? 'bg-white/10 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
              >
                Log In
              </button>
           </div>

           {!isLoginMode && (
             <IconInput 
               icon={User}
               placeholder="Runner Name" 
               value={name}
               onChange={(e: any) => setName(e.target.value)}
             />
           )}
           
           <IconInput 
              icon={Mail}
              type="email" 
              placeholder="Email Identity" 
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
            />
            
           <IconInput 
              icon={Lock}
              type="password" 
              placeholder="Passcode" 
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
            />

          <NeonButton onClick={handleAuth} className="mt-2 group relative overflow-hidden">
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isLoginMode ? 'Initialize Session' : 'Create Account'} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </NeonButton>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent flex-1"></div>
            <span className="text-gray-500 text-[10px] font-mono uppercase tracking-widest">Or access via</span>
            <div className="h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent flex-1"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <button className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 rounded-xl py-3 transition-all group">
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                </svg>
                <span className="text-sm font-medium">Google</span>
             </button>
             <button className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 rounded-xl py-3 transition-all group">
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M17.05,20.28c-0.98,0.97-2.53,0.86-3.45-0.96c-0.9-1.78-2.33-1.5-3.53,0.02c-1.39,1.77-3.08,1.67-4.15-0.02c-3.06-4.82-0.56-11.75,4.52-11.75c1.42,0,2.44,0.56,3.15,0.59c1.09,0.05,2.16-0.65,3.54-0.55c3.08,0.22,4.6,2.25,4.6,2.25c-2.61,1.69-2.02,5.55,1.17,6.86C21.84,18.84,20.35,22.06,17.05,20.28z M15.34,3.31c-0.04,2.39-1.97,4.35-4.22,4.28c-0.27-2.31,2.02-4.63,4.22-4.28z"/>
                </svg>
                <span className="text-sm font-medium">Apple</span>
             </button>
          </div>
        </GlassCard>

        {/* Footer Text */}
        <div className="text-center mt-8 space-y-4">
          <p className="text-gray-400 text-xs">
             By accessing the system, you agree to our <br/>
             <span className="text-gray-300 underline hover:text-[#00FFFF] cursor-pointer">Terms of Service</span> and <span className="text-gray-300 underline hover:text-[#00FFFF] cursor-pointer">Privacy Protocol</span>.
          </p>
          
          <p className="text-sm font-black italic tracking-widest text-[#00FFFF] opacity-80 animate-pulse">
            An Apps Developed by Boys New Era
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
