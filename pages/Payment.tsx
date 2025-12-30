import React, { useState } from 'react';
import { AppRoute } from '../types';
import { GlassCard, NeonButton, SectionHeader } from '../components/UIComponents';
import { CreditCard, Wallet, Building2, Lock, ArrowLeft } from 'lucide-react';

interface PaymentProps {
  onNavigate: (route: AppRoute) => void;
}

const Payment: React.FC<PaymentProps> = ({ onNavigate }) => {
  const [method, setMethod] = useState<string>('card');

  return (
    <div className="min-h-screen bg-[#0A1128] p-6 flex flex-col">
      <button onClick={() => onNavigate(AppRoute.PREMIUM)} className="mb-6 text-gray-400 hover:text-white flex items-center gap-2">
         <ArrowLeft size={20} /> Back
      </button>

      <SectionHeader title="Checkout" subtitle="Secure Payment Gateway" />

      <GlassCard className="p-6 mb-8 bg-gradient-to-br from-[#FFD700]/10 to-transparent border-[#FFD700]/30">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-300">Plan</span>
          <span className="font-bold text-white">FitRun Pro Yearly</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Total</span>
          <span className="font-bold text-[#FFD700] text-xl">RM 199.90</span>
        </div>
      </GlassCard>

      <div className="space-y-4 mb-8">
        {[
          { id: 'card', label: 'Credit / Debit Card', icon: CreditCard },
          { id: 'fpx', label: 'FPX Online Banking', icon: Building2 },
          { id: 'ewallet', label: 'eWallet (TNG / Grab)', icon: Wallet },
        ].map((opt) => (
          <GlassCard 
            key={opt.id} 
            onClick={() => setMethod(opt.id)}
            className={`p-4 flex items-center gap-4 cursor-pointer transition-all ${method === opt.id ? 'border-[#00FFFF] bg-white/10' : ''}`}
          >
             <div className={`p-2 rounded-full ${method === opt.id ? 'bg-[#00FFFF] text-black' : 'bg-gray-800 text-gray-400'}`}>
               <opt.icon size={20} />
             </div>
             <span className="flex-1 font-medium">{opt.label}</span>
             <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${method === opt.id ? 'border-[#00FFFF]' : 'border-gray-600'}`}>
                {method === opt.id && <div className="w-2.5 h-2.5 rounded-full bg-[#00FFFF]"></div>}
             </div>
          </GlassCard>
        ))}
      </div>

      <div className="mt-auto">
        <NeonButton onClick={() => onNavigate(AppRoute.SUCCESS)}>
           <span className="flex items-center justify-center gap-2">
             <Lock size={18} /> Complete Payment
           </span>
        </NeonButton>
      </div>
    </div>
  );
};

export default Payment;