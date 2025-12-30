
import React, { useState } from 'react';
import { AppRoute, User, UserGoal } from './types';
import Layout from './components/Layout';
import Signup from './pages/Signup';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import ActivityTracking from './pages/ActivityTracking';
import PostRunSummary from './pages/PostRunSummary';
import Community from './pages/Community';
import Premium from './pages/Premium';
import Payment from './pages/Payment';
import Success from './pages/Success';
import WorkoutPlan from './pages/WorkoutPlan';
import Profile from './pages/Profile';

const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(AppRoute.SIGNUP);
  const [user, setUser] = useState<User>({
    name: '',
    email: '',
    isPremium: false,
    age: 24,
    weight: 72,
    height: 178
  });

  const handleNavigate = (route: string) => {
    setCurrentRoute(route as AppRoute);
    window.scrollTo(0, 0);
  };

  const handleLogin = (name: string) => {
    setUser(prev => ({ ...prev, name }));
  };

  const handleSetGoal = (goal: UserGoal) => {
    setUser(prev => ({ ...prev, goal }));
  };

  const handleUpgrade = () => {
    setUser(prev => ({ ...prev, isPremium: true }));
  };

  const renderPage = () => {
    switch (currentRoute) {
      case AppRoute.SIGNUP:
        return <Signup onNavigate={handleNavigate} onLogin={handleLogin} />;
      case AppRoute.ONBOARDING:
        return <Onboarding onNavigate={handleNavigate} setGoal={handleSetGoal} />;
      case AppRoute.DASHBOARD:
        return <Dashboard user={user} onNavigate={handleNavigate} />;
      case AppRoute.ACTIVITY:
        return <ActivityTracking onNavigate={handleNavigate} />;
      case AppRoute.SUMMARY:
        return <PostRunSummary onNavigate={handleNavigate} />;
      case AppRoute.COMMUNITY:
        return <Community />;
      case AppRoute.PREMIUM:
        return <Premium onNavigate={handleNavigate} />;
      case AppRoute.PAYMENT:
        return <Payment onNavigate={handleNavigate} />;
      case AppRoute.SUCCESS:
        return <Success onNavigate={handleNavigate} upgradeUser={handleUpgrade} />;
      case AppRoute.WORKOUT_PLAN:
        return <WorkoutPlan onNavigate={handleNavigate} />;
      case AppRoute.PROFILE:
        return <Profile user={user} onNavigate={handleNavigate} />;
      default:
        return <Dashboard user={user} onNavigate={handleNavigate} />;
    }
  };

  return (
    <Layout activeRoute={currentRoute} onNavigate={handleNavigate}>
      {renderPage()}
    </Layout>
  );
};

export default App;
