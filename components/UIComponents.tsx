import React from 'react';
import { LucideIcon } from 'lucide-react';

// --- Glass Container ---
interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}
export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', onClick }) => (
  <div 
    onClick={onClick}
    className={`bg-white/5 backdrop-blur-lg border border-white/10 rounded-[25px] shadow-lg ${onClick ? 'cursor-pointer hover:bg-white/10 transition-colors' : ''} ${className}`}
  >
    {children}
  </div>
);

// --- Inputs ---
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}
export const GlassInput: React.FC<InputProps> = ({ label, className = '', ...props }) => (
  <div className="w-full mb-4">
    {label && <label className="block text-gray-300 text-sm font-medium mb-2 pl-2">{label}</label>}
    <input 
      className={`w-full bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00FFFF] focus:shadow-[0_0_10px_rgba(0,255,255,0.3)] transition-all ${className}`}
      {...props}
    />
  </div>
);

// --- Buttons ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'premium';
}

export const NeonButton: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  let baseStyles = "w-full py-4 rounded-[30px] font-bold text-lg tracking-wide transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  
  let variantStyles = "";
  if (variant === 'primary') {
    variantStyles = "bg-gradient-to-r from-[#00FFFF] to-[#4169E1] text-[#0A1128] shadow-[0_0_20px_rgba(65,105,225,0.5)] hover:shadow-[0_0_30px_rgba(0,255,255,0.6)]";
  } else if (variant === 'secondary') {
    variantStyles = "bg-white/10 text-white border border-white/20 hover:bg-white/20";
  } else if (variant === 'outline') {
    variantStyles = "border-2 border-white/30 text-white hover:bg-white/10 hover:border-white";
  } else if (variant === 'premium') {
    variantStyles = "bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#0A1128] shadow-[0_0_20px_rgba(255,215,0,0.5)]";
  }

  return (
    <button className={`${baseStyles} ${variantStyles} ${className}`} {...props}>
      {children}
    </button>
  );
};

// --- Navbar ---
interface BottomNavProps {
  activeRoute: string;
  onNavigate: (route: string) => void;
  items: { icon: LucideIcon; label: string; route: string }[];
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeRoute, onNavigate, items }) => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#0A1128]/90 backdrop-blur-xl border-t border-white/5 pb-6 pt-4 px-6 flex justify-between items-center z-50">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeRoute === item.route;
        return (
          <button 
            key={item.route}
            onClick={() => onNavigate(item.route)}
            className={`flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-[#00FFFF]' : 'text-gray-400 hover:text-white'}`}
          >
            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} className={isActive ? 'drop-shadow-[0_0_5px_#00FFFF]' : ''} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        )
      })}
    </div>
  );
};

// --- Section Header ---
export const SectionHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="mb-6">
    <h2 className="text-2xl font-bold text-white tracking-tight">{title}</h2>
    {subtitle && <p className="text-gray-400 text-sm mt-1">{subtitle}</p>}
  </div>
);