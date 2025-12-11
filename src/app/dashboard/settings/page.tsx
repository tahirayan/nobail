"use client";

import {
  Bell,
  CreditCard,
  Globe,
  LogOut,
  Moon,
  Settings,
  Shield,
  User,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  return (
    <div className="grid gap-6">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <h1 className="flex items-center gap-3 font-bold text-3xl">
          <Settings className="size-8 text-gray-500" />
          Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your account preferences and notification settings
        </p>
      </div>

      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="size-5" />
            Profile
          </CardTitle>
          <CardDescription>
            Manage your public profile information
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button asChild variant="outline">
            <Link href="/dashboard/profile">Edit Profile</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/dashboard/profile/preview">
              Preview Public Profile
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="size-5" />
            Notifications
          </CardTitle>
          <CardDescription>
            Choose what notifications you receive
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <Label htmlFor="email-meetups">New Meetups</Label>
              <span className="text-muted-foreground text-sm">
                Get notified when new meetups match your interests
              </span>
            </div>
            <Switch defaultChecked id="email-meetups" />
          </div>
          <Separator />
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <Label htmlFor="email-reminders">Reminders</Label>
              <span className="text-muted-foreground text-sm">
                Receive reminders before your reserved meetups
              </span>
            </div>
            <Switch defaultChecked id="email-reminders" />
          </div>
          <Separator />
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <Label htmlFor="email-rewards">Rewards</Label>
              <span className="text-muted-foreground text-sm">
                Get notified when you earn new rewards
              </span>
            </div>
            <Switch defaultChecked id="email-rewards" />
          </div>
          <Separator />
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <Label htmlFor="email-marketing">Marketing</Label>
              <span className="text-muted-foreground text-sm">
                Receive news and updates from NoBail
              </span>
            </div>
            <Switch id="email-marketing" />
          </div>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Moon className="size-5" />
            Appearance
          </CardTitle>
          <CardDescription>
            Customize how NoBail looks on your device
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <Label htmlFor="dark-mode">Dark Mode</Label>
              <span className="text-muted-foreground text-sm">
                Switch between light and dark themes
              </span>
            </div>
            <Switch id="dark-mode" />
          </div>
        </CardContent>
      </Card>

      {/* Language */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="size-5" />
            Language & Region
          </CardTitle>
          <CardDescription>
            Set your preferred language and region
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="font-medium">Language</span>
              <span className="text-muted-foreground text-sm">English</span>
            </div>
            <Button disabled size="sm" variant="outline">
              Coming Soon
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Payment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="size-5" />
            Payment Methods
          </CardTitle>
          <CardDescription>
            Manage your payment methods for reservations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button disabled variant="outline">
            Add Payment Method (Coming Soon)
          </Button>
        </CardContent>
      </Card>

      {/* Privacy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="size-5" />
            Privacy & Security
          </CardTitle>
          <CardDescription>
            Manage your privacy and security settings
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <Label htmlFor="profile-visible">Profile Visibility</Label>
              <span className="text-muted-foreground text-sm">
                Allow other attendees to see your profile at meetups
              </span>
            </div>
            <Switch defaultChecked id="profile-visible" />
          </div>
          <Separator />
          <Button variant="outline">Change Password</Button>
          <Button variant="outline">Download My Data</Button>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>
            Irreversible actions for your account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button asChild variant="outline">
            <Link className="gap-2" href="/">
              <LogOut className="size-4" />
              Log Out
            </Link>
          </Button>
          <Button
            className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
            variant="outline"
          >
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
