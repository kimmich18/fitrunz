
export enum UserGoal {
  LOSE_FAT = 'Lose Fat',
  IMPROVE_ENDURANCE = 'Improve Endurance',
  BUILD_STRENGTH = 'Build Strength'
}

export interface User {
  name: string;
  email: string;
  goal?: UserGoal;
  isPremium: boolean;
  age?: number;
  weight?: number;
  height?: number;
}

export enum AppRoute {
  SIGNUP = '/',
  ONBOARDING = '/onboarding',
  DASHBOARD = '/dashboard',
  ACTIVITY = '/activity',
  SUMMARY = '/summary',
  COMMUNITY = '/community',
  PREMIUM = '/premium',
  PAYMENT = '/payment',
  SUCCESS = '/success',
  WORKOUT_PLAN = '/plan',
  PROFILE = '/profile'
}

export interface NavItem {
  icon: any;
  label: string;
  route: AppRoute;
}
