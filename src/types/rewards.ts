export type Reward = {
  id: string;
  title: string;
  description: string;
  venue: string;
  type: "meal" | "drink" | "experience";
  value: string;
  expiresAt: string;
  isRedeemed: boolean;
  redeemedAt?: string;
};

export type StreakData = {
  current: number;
  target: number;
  label: string;
};

export type RewardStats = {
  totalEarned: number;
  totalRedeemed: number;
  currentStreak: number;
  longestStreak: number;
};
