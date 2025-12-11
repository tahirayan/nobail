"use client";

import { Calendar, Gift, MapPin, TrendingUp, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StreakProgress } from "@/components/widgets/streak-progress";
import type { Reward, RewardStats } from "@/types/rewards";

const REWARDS: Reward[] = [
  {
    id: "1",
    title: "Free Craft Beer",
    description: "Enjoy a complimentary craft beer of your choice",
    venue: "NoKu",
    type: "drink",
    value: "€8",
    expiresAt: "2025-01-15",
    isRedeemed: false,
  },
  {
    id: "2",
    title: "Appetizer on Us",
    description: "Choose any appetizer from the menu",
    venue: "F-Hoone",
    type: "meal",
    value: "€12",
    expiresAt: "2025-01-20",
    isRedeemed: false,
  },
  {
    id: "3",
    title: "Dessert Special",
    description: "Complimentary dessert with your next visit",
    venue: "Levier",
    type: "meal",
    value: "€10",
    expiresAt: "2024-12-01",
    isRedeemed: true,
    redeemedAt: "2024-11-28",
  },
  {
    id: "4",
    title: "Coffee & Pastry",
    description: "Start your morning right with us",
    venue: "Røst",
    type: "meal",
    value: "€7",
    expiresAt: "2024-11-15",
    isRedeemed: true,
    redeemedAt: "2024-11-10",
  },
  {
    id: "5",
    title: "Cocktail Hour",
    description: "One signature cocktail on the house",
    venue: "Põhjala",
    type: "drink",
    value: "€14",
    expiresAt: "2025-02-01",
    isRedeemed: false,
  },
];

const STATS: RewardStats = {
  totalEarned: 5,
  totalRedeemed: 2,
  currentStreak: 2,
  longestStreak: 7,
};

const getRewardTypeIcon = (type: Reward["type"]) => {
  switch (type) {
    case "meal":
      return "🍽️";
    case "drink":
      return "🍺";
    case "experience":
      return "✨";
  }
};

const RewardCard = ({ reward }: { reward: Reward }) => {
  const isExpired = new Date(reward.expiresAt) < new Date();
  const isAvailable = !(reward.isRedeemed || isExpired);

  return (
    <Card className={isAvailable ? "" : "opacity-60"}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{getRewardTypeIcon(reward.type)}</span>
            <div>
              <CardTitle className="text-lg">{reward.title}</CardTitle>
              <CardDescription>{reward.description}</CardDescription>
            </div>
          </div>
          <Badge
            variant={
              isAvailable
                ? "default"
                : reward.isRedeemed
                  ? "secondary"
                  : "outline"
            }
          >
            {reward.value}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm">
          <span className="flex items-center gap-1.5">
            <MapPin className="size-4" />
            {reward.venue}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="size-4" />
            {reward.isRedeemed
              ? `Redeemed ${new Date(reward.redeemedAt || "").toLocaleDateString()}`
              : isExpired
                ? `Expired ${new Date(reward.expiresAt).toLocaleDateString()}`
                : `Expires ${new Date(reward.expiresAt).toLocaleDateString()}`}
          </span>
        </div>

        {isAvailable ? (
          <Button className="w-full gap-2" variant="outline">
            <Gift className="size-4" />
            Redeem at {reward.venue}
          </Button>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default function RewardsPage() {
  const availableRewards = REWARDS.filter(
    (r) => !r.isRedeemed && new Date(r.expiresAt) >= new Date()
  );
  const redeemedRewards = REWARDS.filter((r) => r.isRedeemed);
  const expiredRewards = REWARDS.filter(
    (r) => !r.isRedeemed && new Date(r.expiresAt) < new Date()
  );

  return (
    <div className="grid gap-6">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <h1 className="flex items-center gap-3 font-bold text-3xl">
          <Gift className="size-8 text-red-500" />
          Rewards
        </h1>
        <p className="text-muted-foreground">
          Earn rewards by attending meetups or sharing your spot when you can't
          make it
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="font-medium text-sm">Total Earned</CardTitle>
            <Trophy className="size-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{STATS.totalEarned}</div>
            <p className="text-muted-foreground text-xs">lifetime rewards</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="font-medium text-sm">Redeemed</CardTitle>
            <Gift className="size-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{STATS.totalRedeemed}</div>
            <p className="text-muted-foreground text-xs">rewards used</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="font-medium text-sm">
              Current Streak
            </CardTitle>
            <TrendingUp className="size-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{STATS.currentStreak}</div>
            <p className="text-muted-foreground text-xs">meetups attended</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="font-medium text-sm">Best Streak</CardTitle>
            <Trophy className="size-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{STATS.longestStreak}</div>
            <p className="text-muted-foreground text-xs">personal record</p>
          </CardContent>
        </Card>
      </div>

      {/* Streak Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Your Progress</CardTitle>
          <CardDescription>
            Attend 5 meetups in a row (or share your spot) to earn a reward
          </CardDescription>
        </CardHeader>
        <CardContent>
          <StreakProgress variant="full" />
        </CardContent>
      </Card>

      {/* Rewards List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Rewards</CardTitle>
          <CardDescription>
            Manage and redeem your earned rewards
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs className="flex flex-col gap-4" defaultValue="available">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="available">
                Available ({availableRewards.length})
              </TabsTrigger>
              <TabsTrigger value="redeemed">
                Redeemed ({redeemedRewards.length})
              </TabsTrigger>
              <TabsTrigger value="expired">
                Expired ({expiredRewards.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent className="grid gap-4" value="available">
              {availableRewards.length > 0 ? (
                availableRewards.map((reward) => (
                  <RewardCard key={reward.id} reward={reward} />
                ))
              ) : (
                <div className="flex flex-col items-center gap-3 py-12 text-center">
                  <Gift className="size-16 text-muted-foreground/30" />
                  <div>
                    <p className="font-medium">No available rewards</p>
                    <p className="text-muted-foreground text-sm">
                      Keep attending meetups to earn rewards!
                    </p>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent className="grid gap-4" value="redeemed">
              {redeemedRewards.length > 0 ? (
                redeemedRewards.map((reward) => (
                  <RewardCard key={reward.id} reward={reward} />
                ))
              ) : (
                <div className="flex flex-col items-center gap-3 py-12 text-center">
                  <Gift className="size-16 text-muted-foreground/30" />
                  <div>
                    <p className="font-medium">No redeemed rewards</p>
                    <p className="text-muted-foreground text-sm">
                      Your redeemed rewards will appear here
                    </p>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent className="grid gap-4" value="expired">
              {expiredRewards.length > 0 ? (
                expiredRewards.map((reward) => (
                  <RewardCard key={reward.id} reward={reward} />
                ))
              ) : (
                <div className="flex flex-col items-center gap-3 py-12 text-center">
                  <Gift className="size-16 text-muted-foreground/30" />
                  <div>
                    <p className="font-medium">No expired rewards</p>
                    <p className="text-muted-foreground text-sm">
                      You're doing great at using your rewards!
                    </p>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* How it works */}
      <Card>
        <CardHeader>
          <CardTitle>How NoBail Rewards Work</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-start gap-4">
            <div className="grid size-10 shrink-0 place-items-center rounded-full bg-red-100 font-bold text-red-600">
              1
            </div>
            <div>
              <h4 className="font-semibold">Attend Meetups</h4>
              <p className="text-muted-foreground text-sm">
                Show up to the meetups you've reserved. Each attendance counts
                toward your streak.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="grid size-10 shrink-0 place-items-center rounded-full bg-red-100 font-bold text-red-600">
              2
            </div>
            <div>
              <h4 className="font-semibold">Or Share Your Spot</h4>
              <p className="text-muted-foreground text-sm">
                Can't make it? Share your spot with someone else to keep your
                streak alive.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="grid size-10 shrink-0 place-items-center rounded-full bg-red-100 font-bold text-red-600">
              3
            </div>
            <div>
              <h4 className="font-semibold">Reach 5 in a Row</h4>
              <p className="text-muted-foreground text-sm">
                Complete 5 consecutive meetups or spot shares to earn a reward.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="grid size-10 shrink-0 place-items-center rounded-full bg-red-100 font-bold text-red-600">
              4
            </div>
            <div>
              <h4 className="font-semibold">Enjoy Your Reward</h4>
              <p className="text-muted-foreground text-sm">
                Get a surprise free meal or drink at one of the venues you've
                enjoyed!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
