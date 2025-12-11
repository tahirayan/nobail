"use client";

import {
  Calendar,
  CheckCircle,
  Clock,
  Gift,
  MapPin,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import type { Reward, RewardStats } from "@/types/rewards";

type RewardsDialogProps = {
  rewards?: Reward[];
  stats?: RewardStats;
  trigger?: React.ReactNode;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const MOCK_REWARDS: Reward[] = [
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
];

const MOCK_STATS: RewardStats = {
  totalEarned: 5,
  totalRedeemed: 3,
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
    default:
      return "🎁";
  }
};

const getRewardTypeBadgeVariant = (type: Reward["type"]) => {
  switch (type) {
    case "meal":
      return "default";
    case "drink":
      return "secondary";
    case "experience":
      return "outline";
    default:
      return "default";
  }
};

const RewardCard = ({ reward }: { reward: Reward }) => {
  const isExpired = new Date(reward.expiresAt) < new Date();
  const isAvailable = !(reward.isRedeemed || isExpired);

  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-lg border p-4 transition-all",
        isAvailable
          ? "bg-card hover:border-red-200 hover:shadow-sm"
          : "bg-muted/50 opacity-75"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{getRewardTypeIcon(reward.type)}</span>
          <div>
            <h4 className="font-semibold text-sm">{reward.title}</h4>
            <p className="text-muted-foreground text-xs">
              {reward.description}
            </p>
          </div>
        </div>
        <Badge variant={getRewardTypeBadgeVariant(reward.type)}>
          {reward.value}
        </Badge>
      </div>

      <div className="flex flex-wrap items-center gap-3 text-muted-foreground text-xs">
        <span className="flex items-center gap-1">
          <MapPin className="size-3" />
          {reward.venue}
        </span>
        <span className="flex items-center gap-1">
          <Calendar className="size-3" />
          {reward.isRedeemed
            ? `Redeemed ${new Date(
                reward.redeemedAt || ""
              ).toLocaleDateString()}`
            : `Expires ${new Date(reward.expiresAt).toLocaleDateString()}`}
        </span>
      </div>

      {isAvailable ? (
        <Button className="w-full gap-2" size="sm" variant="outline">
          <Gift className="size-4" />
          Redeem at {reward.venue}
        </Button>
      ) : (
        <div className="flex items-center justify-center gap-2 rounded-md bg-muted py-2 text-muted-foreground text-xs">
          {reward.isRedeemed ? (
            <>
              <CheckCircle className="size-4 text-green-500" />
              Redeemed
            </>
          ) : (
            <>
              <Clock className="size-4 text-orange-500" />
              Expired
            </>
          )}
        </div>
      )}
    </div>
  );
};

export const RewardsDialog = ({
  rewards = MOCK_REWARDS,
  stats = MOCK_STATS,
  trigger,
  defaultOpen = false,
  onOpenChange,
}: RewardsDialogProps) => {
  const [open, setOpen] = useState(defaultOpen);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    onOpenChange?.(isOpen);
  };

  const availableRewards = rewards.filter(
    (r) => !r.isRedeemed && new Date(r.expiresAt) >= new Date()
  );
  const redeemedRewards = rewards.filter((r) => r.isRedeemed);
  const expiredRewards = rewards.filter(
    (r) => !r.isRedeemed && new Date(r.expiresAt) < new Date()
  );

  return (
    <Dialog onOpenChange={handleOpenChange} open={open}>
      <DialogTrigger asChild>
        {trigger || (
          <Button
            aria-label="View rewards"
            className="relative gap-2"
            size="sm"
            variant="outline"
          >
            <Gift className="size-4" />
            <span className="hidden sm:inline">Rewards</span>
            {availableRewards.length > 0 && (
              <span className="absolute top-1 right-1 size-2 rounded-full bg-primary" />
            )}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="size-5 text-yellow-500" />
            Your NoBail Rewards
          </DialogTitle>
          <DialogDescription>
            Earn rewards by attending meetups or sharing your spot
          </DialogDescription>
        </DialogHeader>

        {/* Stats Summary */}
        <div className="grid grid-cols-4 gap-2 rounded-lg bg-gradient-to-r from-red-50 to-orange-50 p-3">
          <div className="flex flex-col items-center">
            <span className="font-bold text-lg text-red-600">
              {stats.totalEarned}
            </span>
            <span className="text-[10px] text-muted-foreground">Earned</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-green-600 text-lg">
              {stats.totalRedeemed}
            </span>
            <span className="text-[10px] text-muted-foreground">Redeemed</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-lg text-orange-600">
              {stats.currentStreak}
            </span>
            <span className="text-[10px] text-muted-foreground">Streak</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-lg text-purple-600">
              {stats.longestStreak}
            </span>
            <span className="text-[10px] text-muted-foreground">Best</span>
          </div>
        </div>

        <Tabs className="flex-1" defaultValue="available">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger className="text-xs" value="available">
              Available ({availableRewards.length})
            </TabsTrigger>
            <TabsTrigger className="text-xs" value="redeemed">
              Redeemed ({redeemedRewards.length})
            </TabsTrigger>
            <TabsTrigger className="text-xs" value="expired">
              Expired ({expiredRewards.length})
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[300px] pt-4 pr-4">
            <TabsContent className="flex flex-col gap-3" value="available">
              {availableRewards.length > 0 ? (
                availableRewards.map((reward) => (
                  <RewardCard key={reward.id} reward={reward} />
                ))
              ) : (
                <div className="flex flex-col items-center gap-2 py-4 text-center">
                  <Gift className="size-12 text-muted-foreground/50" />
                  <p className="text-muted-foreground text-sm">
                    No available rewards yet
                  </p>
                  <p className="text-muted-foreground text-xs">
                    Keep attending meetups to earn rewards!
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent className="flex flex-col gap-3" value="redeemed">
              {redeemedRewards.length > 0 ? (
                redeemedRewards.map((reward) => (
                  <RewardCard key={reward.id} reward={reward} />
                ))
              ) : (
                <div className="flex flex-col items-center gap-2 py-4 text-center">
                  <CheckCircle className="size-12 text-muted-foreground/50" />
                  <p className="text-muted-foreground text-sm">
                    No redeemed rewards yet
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent className="flex flex-col gap-3" value="expired">
              {expiredRewards.length > 0 ? (
                expiredRewards.map((reward) => (
                  <RewardCard key={reward.id} reward={reward} />
                ))
              ) : (
                <div className="flex flex-col items-center gap-2 py-4 text-center">
                  <Clock className="size-12 text-muted-foreground/50" />
                  <p className="text-muted-foreground text-sm">
                    No expired rewards
                  </p>
                </div>
              )}
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
