"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import { Verified, Linkedin, Instagram, Edit, Eye } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ScrollArea } from "../ui/scroll-area";
import { Progress } from "../ui/progress";
import { useState } from "react";

type Interests = {
  comedy: boolean;
  poetry: boolean;
  techno: boolean;
  discussions: boolean;
};

export default function PersonalInfo() {
  const [streak] = useState(40); // 2 out of 5 is 40%
  const [interests, setInterests] = useState<Interests>({
    comedy: true,
    poetry: false,
    techno: false,
    discussions: true,
  });

  const handleInterestChange = (key: keyof Interests) => (checked: boolean) => {
    setInterests((prev) => ({ ...prev, [key]: checked }));
  };

  return (
    <Card className="sticky top-0 border-2 h-[calc(100vh-2rem)] flex flex-col">
      <CardHeader className="flex flex-col gap-4">
        <CardTitle className="text-4xl font-bold flex items-center gap-2">
          Hamza Khan
          <Verified className="size-6 text-blue-500" />
        </CardTitle>
        {/* NoBail Prize Streak Section */}
        <div className="flex flex-col items-center gap-2 w-full max-w-md mx-auto">
          <h2 className="text-lg font-semibold tracking-tight">
            NoBail Prize streak
          </h2>
          <Progress value={streak} className="h-4 w-full [&>div]:bg-red-500" />
          <p className="text-sm text-muted-foreground text-center">
            3 more to go or find someone to go for you
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="https://www.linkedin.com/in/khanhamzaaa/" target="_blank">
            <Badge variant="secondary" className="gap-1">
              <Linkedin className="size-3" /> LinkedIn
            </Badge>
          </Link>
          <Link href="https://www.instagram.com/stories/m.hamzakkk/" target="_blank">
            <Badge variant="secondary" className="gap-1">
              <Instagram className="size-3" /> Instagram
            </Badge>
          </Link>
        </div>

        {/* Profile Actions */}
        <div className="flex gap-2 w-full">
          <Button variant="outline" className="flex-1 gap-2" asChild>
            <Link href="/dashboard/profile">
              <Edit className="size-4" /> Edit Profile
            </Link>
          </Button>
          <Button variant="outline" className="flex-1 gap-2" asChild>
            <Link href="/dashboard/profile/preview">
              <Eye className="size-4" /> Preview
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden flex flex-col gap-6">
        <div className="grid gap-3">
          <div className="flex justify-between gap-2 items-center">
            <Label className="text-muted-foreground">Company</Label>
            <span className="flex items-center gap-2 font-medium">
              <span>Wise</span>
              <Verified className="size-4 text-blue-500" />
            </span>
          </div>
          <div className="flex justify-between gap-2 items-center">
            <Label className="text-muted-foreground">Role</Label>
            <span className="flex items-center gap-2 font-medium">
              <span>KYC Operations</span>
              <Verified className="size-4 text-blue-500" />
            </span>
          </div>
          <div className="flex justify-between gap-2 items-center">
            <Label className="text-muted-foreground">Education</Label>
            <span className="flex items-center gap-2 font-medium">
              <span>EBS (Tallinn)</span>
              <Verified className="size-4 text-blue-500" />
            </span>
          </div>
          <div className="flex justify-between gap-2 items-center">
            <Label className="text-muted-foreground">Languages</Label>
            <span className="flex items-center gap-2 font-medium">
              <span>English, Urdu</span>
              <Verified className="size-4 text-blue-500" />
            </span>
          </div>
          <div className="flex justify-between gap-2 items-center">
            <Label className="text-muted-foreground">Practice</Label>
            <span className="font-medium text-red-500">Estonian</span>
          </div>
        </div>

        {/* Interests Section */}
        <div className="flex flex-col gap-2">
           <h3 className="font-semibold">Interests</h3>
           <div className="grid gap-2">
            <div className="flex justify-between gap-2 items-center">
              <Label htmlFor="comedy">Standup comedy</Label>
              <Switch 
                id="comedy" 
                checked={interests.comedy} 
                onCheckedChange={handleInterestChange("comedy")} 
                className="data-[state=checked]:bg-red-500"
              />
            </div>
            <div className="flex justify-between gap-2 items-center">
              <Label htmlFor="poetry">Poetry</Label>
              <Switch 
                id="poetry" 
                checked={interests.poetry} 
                onCheckedChange={handleInterestChange("poetry")} 
                className="data-[state=checked]:bg-red-500"
              />
            </div>
            <div className="flex justify-between gap-2 items-center">
              <Label htmlFor="techno">Techno</Label>
              <Switch 
                id="techno" 
                checked={interests.techno} 
                onCheckedChange={handleInterestChange("techno")} 
                className="data-[state=checked]:bg-red-500"
              />
            </div>
            <div className="flex justify-between gap-2 items-center">
              <Label htmlFor="discussions">Worldly discussions</Label>
              <Switch 
                id="discussions" 
                checked={interests.discussions} 
                onCheckedChange={handleInterestChange("discussions")} 
                className="data-[state=checked]:bg-red-500"
              />
            </div>
           </div>
        </div>

        <div className="flex-1 flex flex-col min-h-0 gap-2">
          <h3 className="font-semibold">Q&A Profile</h3>
          <Tabs defaultValue="public" className="flex-1 flex flex-col min-h-0 gap-2">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="public">Public</TabsTrigger>
              <TabsTrigger value="social">Social</TabsTrigger>
              <TabsTrigger value="private">Private</TabsTrigger>
            </TabsList>
            <ScrollArea className="flex-1 border rounded-md p-4">
              <TabsContent value="public" className="mt-0 space-y-4">
                <div className="space-y-1">
                  <p className="font-medium text-sm">Most watched TV show last year?</p>
                  <p className="text-muted-foreground text-sm">Peaky Blinders</p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-sm">Your most watched movie last year?</p>
                  <p className="text-muted-foreground text-sm">Barbie</p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-sm">Bad habits I can't get rid of?</p>
                  <p className="text-muted-foreground text-sm">I have a need to always pack my backpack as full as possible.</p>
                </div>
              </TabsContent>
              <TabsContent value="social" className="mt-0 space-y-4">
                <div className="space-y-1">
                  <p className="font-medium text-sm">Most random compliment?</p>
                  <p className="text-muted-foreground text-sm">You look like you know how to explain Wi-Fi.</p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-sm">Secret nickname?</p>
                  <p className="text-muted-foreground text-sm">Spreadsheet Samurai.</p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-sm">Hidden party trick?</p>
                  <p className="text-muted-foreground text-sm">Folding a fitted sheet.</p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-sm">Silliest argument?</p>
                  <p className="text-muted-foreground text-sm">Whether pineapple belongs on pizza.</p>
                </div>
                 <div className="space-y-1">
                  <p className="font-medium text-sm">Embarrassing childhood memory?</p>
                  <p className="text-muted-foreground text-sm">In primary school I mispronounced my own last name in front of the class.</p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-sm">Pettiest thing you've ever done?</p>
                  <p className="text-muted-foreground text-sm">I once skipped a whole week of classes just to test an idea for a simulation.</p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-sm">Worst autocorrect fail?</p>
                  <p className="text-muted-foreground text-sm">Sending "I love you" to a professor instead of "I'll review."</p>
                </div>
              </TabsContent>
              <TabsContent value="private" className="mt-0 space-y-4">
                 <div className="space-y-1">
                  <p className="font-medium text-sm">Pettiest reason you've disliked someone?</p>
                  <p className="text-muted-foreground text-sm">Because they hated data tables.</p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-sm">Fictional character you relate to?</p>
                  <p className="text-muted-foreground text-sm">Spock: logical, but curious about emotions.</p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-sm">Value you wouldn't compromise on?</p>
                  <p className="text-muted-foreground text-sm">Intellectual honesty.</p>
                </div>
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
}
