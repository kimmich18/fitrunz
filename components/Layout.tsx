
import React from 'react';
import { AppRoute, NavItem } from '../types';
import { BottomNav } from './UIComponents';
import { Home, Activity, Users, User as UserIcon, Calendar } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeRoute: AppRoute;
  onNavigate: (route: AppRoute) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeRoute, onNavigate }) => {
  // Routes where we show the bottom navigation
  const showNav = [
    AppRoute.DASHBOARD,
    AppRoute.SUMMARY, 
    AppRoute.COMMUNITY,
    AppRoute.WORKOUT_PLAN,
    AppRoute.PROFILE
  ].includes(activeRoute);

  const navItems: NavItem[] = [
    { icon: Home, label: 'Home', route: AppRoute.DASHBOARD },
    { icon: Calendar, label: 'Plan', route: AppRoute.WORKOUT_PLAN },
    { icon: Activity, label: 'Run', route: AppRoute.ACTIVITY },
    { icon: Users, label: 'Hub', route: AppRoute.COMMUNITY },
    { icon: UserIcon, label: 'Profile', route: AppRoute.PROFILE },
  ];

  return (
    <div className="min-h-screen bg-[#0A1128] text-white font-sans selection:bg-[#00FFFF] selection:text-[#0A1128]">
      <main className="w-full h-full mx-auto max-w-lg shadow-2xl min-h-screen relative bg-[#0A1128]">
        {children}
        {showNav && (
          <BottomNav activeRoute={activeRoute} onNavigate={onNavigate} items={navItems} />
        )}
      </main>
    </div>
  );
};

export default Layout;
