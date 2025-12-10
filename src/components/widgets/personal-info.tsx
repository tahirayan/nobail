"use client";

import { Edit, Eye, Instagram, Linkedin, Trophy, Verified } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Progress } from "../ui/progress";
import { Switch } from "../ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { HostAvatar } from "@/components/widgets/host-avatar";

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
    <Card className="sticky top-24 flex h-[calc(100vh-2rem)] flex-col border-2">
      <CardHeader className="flex flex-col gap-4">
        <CardTitle className="flex items-center gap-2 font-bold text-4xl">
          <HostAvatar name="Hamza Khan" size="md" />
          Hamza Khan
          <Verified className="size-6 text-blue-500" />
        </CardTitle>

        <div className="flex gap-2">
          <Link href="https://www.linkedin.com/in/khanhamzaaa/" target="_blank">
            <Badge className="gap-1" variant="secondary">
              <Linkedin className="size-3" /> LinkedIn
            </Badge>
          </Link>
          <Link
            href="https://www.instagram.com/stories/m.hamzakkk/"
            target="_blank"
          >
            <Badge className="gap-1" variant="secondary">
              <Instagram className="size-3" /> Instagram
            </Badge>
          </Link>
        </div>

        {/* Profile Actions */}
        <div className="flex w-full gap-2">
          <Button asChild className="flex-1 gap-2" variant="outline">
            <Link href="/dashboard/profile">
              <Edit className="size-4" /> Edit Profile
            </Link>
          </Button>
          <Button asChild className="flex-1 gap-2" variant="outline">
            <Link href="/dashboard/profile/preview">
              <Eye className="size-4" /> Preview
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-6 overflow-hidden">
        <div className="grid gap-3">
          <div className="flex items-center justify-between gap-2">
            <Label className="text-muted-foreground">Company</Label>
            <span className="flex items-center gap-2 font-medium">
              <span>Wise</span>
              <Verified className="size-4 text-blue-500" />
            </span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <Label className="text-muted-foreground">Role</Label>
            <span className="flex items-center gap-2 font-medium">
              <span>KYC Operations</span>
              <Verified className="size-4 text-blue-500" />
            </span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <Label className="text-muted-foreground">Education</Label>
            <span className="flex items-center gap-2 font-medium">
              <span>EBS (Tallinn)</span>
              <Verified className="size-4 text-blue-500" />
            </span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <Label className="text-muted-foreground">Languages</Label>
            <span className="flex items-center gap-2 font-medium">
              <span>English, Urdu</span>
              <Verified className="size-4 text-blue-500" />
            </span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <Label className="text-muted-foreground">Practice</Label>
            <span className="font-medium text-red-500">Estonian</span>
          </div>
        </div>

        {/* Interests Section */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold">Interests</h3>
          <div className="grid gap-2">
            <div className="flex items-center justify-between gap-2">
              <Label htmlFor="comedy">Standup comedy</Label>
              <Switch
                checked={interests.comedy}
                className="data-[state=checked]:bg-red-500"
                id="comedy"
                onCheckedChange={handleInterestChange("comedy")}
              />
            </div>
            <div className="flex items-center justify-between gap-2">
              <Label htmlFor="poetry">Poetry</Label>
              <Switch
                checked={interests.poetry}
                className="data-[state=checked]:bg-red-500"
                id="poetry"
                onCheckedChange={handleInterestChange("poetry")}
              />
            </div>
            <div className="flex items-center justify-between gap-2">
              <Label htmlFor="techno">Techno</Label>
              <Switch
                checked={interests.techno}
                className="data-[state=checked]:bg-red-500"
                id="techno"
                onCheckedChange={handleInterestChange("techno")}
              />
            </div>
            <div className="flex items-center justify-between gap-2">
              <Label htmlFor="discussions">Worldly discussions</Label>
              <Switch
                checked={interests.discussions}
                className="data-[state=checked]:bg-red-500"
                id="discussions"
                onCheckedChange={handleInterestChange("discussions")}
              />
            </div>
          </div>
        </div>
        {/* NoBail Prize Streak Section */}
        <div className="mx-auto flex w-full max-w-md flex-col items-center gap-2">
          <div className="grid size-12 place-items-center rounded-full bg-green-100 text-green-600">
            <Trophy className="size-6" />
          </div>
          <span className="font-bold text-gray-900 text-lg">
            2{" "}
            <span className="font-medium text-gray-500 text-xs uppercase">
              Streak
            </span>
          </span>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`size-1.5 rounded-full ${
                  i >= 3 ? "bg-gray-200" : "bg-green-500"
                }`}
              />
            ))}
          </div>
          <p className="text-center text-muted-foreground text-xs mt-1">
            3 more to go or find someone to go for you
          </p>
        </div>
        <div className="flex min-h-0 flex-1 flex-col gap-2">
          <h3 className="font-semibold">Q&A Profile</h3>
          <Tabs
            className="flex min-h-0 flex-1 flex-col gap-2"
            defaultValue="public"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="public">Public</TabsTrigger>
              <TabsTrigger value="social">Social</TabsTrigger>
              <TabsTrigger value="private">Private</TabsTrigger>
            </TabsList>
            <div className="h-full w-full overflow-y-auto rounded-md border p-4">
              <TabsContent value="public" className="mt-0 flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <p className="font-medium text-sm">
                    Most watched TV show last year?
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Peaky Blinders
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-medium text-sm">
                    Your most watched movie last year?
                  </p>
                  <p className="text-muted-foreground text-sm">Barbie</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-medium text-sm">
                    Bad habits I can't get rid of?
                  </p>
                  <p className="text-muted-foreground text-sm">
                    I have a need to always pack my backpack as full as
                    possible.
                  </p>
                </div>
              </TabsContent>
              <TabsContent className="mt-0 flex flex-col gap-4" value="social">
                <div className="flex flex-col gap-1">
                  <p className="font-medium text-sm">Most random compliment?</p>
                  <p className="text-muted-foreground text-sm">
                    You look like you know how to explain Wi-Fi.
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-medium text-sm">Secret nickname?</p>
                  <p className="text-muted-foreground text-sm">
                    Spreadsheet Samurai.
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-medium text-sm">Hidden party trick?</p>
                  <p className="text-muted-foreground text-sm">
                    Folding a fitted sheet.
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-medium text-sm">Silliest argument?</p>
                  <p className="text-muted-foreground text-sm">
                    Whether pineapple belongs on pizza.
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-medium text-sm">
                    Embarrassing childhood memory?
                  </p>
                  <p className="text-muted-foreground text-sm">
                    In primary school I mispronounced my own last name in front
                    of the class.
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-medium text-sm">
                    Pettiest thing you've ever done?
                  </p>
                  <p className="text-muted-foreground text-sm">
                    I once skipped a whole week of classes just to test an idea
                    for a simulation.
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-medium text-sm">Worst autocorrect fail?</p>
                  <p className="text-muted-foreground text-sm">
                    Sending "I love you" to a professor instead of "I'll
                    review."
                  </p>
                </div>
              </TabsContent>
              <TabsContent className="mt-0 flex flex-col gap-4" value="private">
                <div className="flex flex-col gap-1">
                  <p className="font-medium text-sm">
                    Pettiest reason you've disliked someone?
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Because they hated data tables.
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-medium text-sm">
                    Fictional character you relate to?
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Spock: logical, but curious about emotions.
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-medium text-sm">
                    Value you wouldn't compromise on?
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Intellectual honesty.
                  </p>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
}
