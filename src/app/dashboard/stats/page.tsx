"use client";

import {
  BarChart3,
  Calendar,
  MapPin,
  TrendingUp,
  Trophy,
  Users,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const STATS = {
  totalMeetups: 12,
  totalVenues: 5,
  peoplemet: 48,
  hoursSpent: 36,
  currentStreak: 2,
  longestStreak: 7,
  favoriteVenue: "NoKu",
  favoriteDay: "Saturday",
};

export default function StatsPage() {
  return (
    <div className="grid gap-6">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <h1 className="flex items-center gap-3 font-bold text-3xl">
          <BarChart3 className="size-8 text-blue-500" />
          Your Stats
        </h1>
        <p className="text-muted-foreground">
          Track your NoBail journey and see your activity over time
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="font-medium text-sm">Total Meetups</CardTitle>
            <Calendar className="size-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{STATS.totalMeetups}</div>
            <p className="text-muted-foreground text-xs">attended so far</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="font-medium text-sm">
              Venues Visited
            </CardTitle>
            <MapPin className="size-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{STATS.totalVenues}</div>
            <p className="text-muted-foreground text-xs">unique places</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="font-medium text-sm">People Met</CardTitle>
            <Users className="size-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{STATS.peoplemet}</div>
            <p className="text-muted-foreground text-xs">new connections</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="font-medium text-sm">Hours Spent</CardTitle>
            <TrendingUp className="size-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{STATS.hoursSpent}</div>
            <p className="text-muted-foreground text-xs">socializing</p>
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Streak Stats</CardTitle>
            <CardDescription>Your attendance consistency</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Current Streak</span>
              <span className="flex items-center gap-2 font-semibold">
                <TrendingUp className="size-4 text-red-500" />
                {STATS.currentStreak} meetups
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Longest Streak</span>
              <span className="flex items-center gap-2 font-semibold">
                <Trophy className="size-4 text-yellow-500" />
                {STATS.longestStreak} meetups
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Favorites</CardTitle>
            <CardDescription>
              Your most visited places and times
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Favorite Venue</span>
              <span className="flex items-center gap-2 font-semibold">
                <MapPin className="size-4 text-green-500" />
                {STATS.favoriteVenue}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Favorite Day</span>
              <span className="flex items-center gap-2 font-semibold">
                <Calendar className="size-4 text-blue-500" />
                {STATS.favoriteDay}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Coming Soon */}
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
          <BarChart3 className="size-16 text-muted-foreground/30" />
          <div>
            <h3 className="font-semibold text-lg">More Stats Coming Soon</h3>
            <p className="text-muted-foreground text-sm">
              We're working on detailed analytics and visualizations for your
              meetup history
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
