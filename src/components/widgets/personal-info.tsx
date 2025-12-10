"use client"

import { useState } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "../ui/card";
import { Label } from "../ui/label";
import { Verified } from "lucide-react";
import { Switch } from "../ui/switch";

type Interests = {
  volleyball: boolean;
  basketball: boolean;
  football: boolean;
  tennis: boolean;
  padel: boolean;
};

export default function PersonalInfo() {
  const [interests, setInterests] = useState<Interests>({
    volleyball: true,
    basketball: true,
    football: true,
    tennis: true,
    padel: true,
  });

  const handleInterestChange = (key: keyof Interests) => (checked: boolean) => {
    setInterests((prev) => ({ ...prev, [key]: checked }));
  };

  return (
    <Card className="sticky top-0 border-2">
      <CardHeader>
        <CardTitle className="text-4xl font-bold">Hamza Khan</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="flex justify-between gap-2 items-center">
              <Label>Linkedin</Label>
              <Link href="https://www.linkedin.com" className="flex items-center gap-2" target="_blank" rel="noopener noreferrer">
                <span>Hamza Khan</span>
                <Verified className="size-4 text-blue-500" />
              </Link>
            </div>
            <div className="flex justify-between gap-2 items-center">
              <Label>Works at</Label>
              <span className="flex items-center gap-2">
                <span>Wise</span>
                <Verified className="size-4 text-blue-500" />
              </span>
            </div>
            <div className="flex justify-between gap-2 items-center">
              <Label>Work Field</Label>
              <span className="flex items-center gap-2">
                <span>KYC Operations</span>
                <Verified className="size-4 text-blue-500" />
              </span>
            </div>
            <div className="flex justify-between gap-2 items-center">
              <Label>University</Label>
              <span className="flex items-center gap-2">
                <span>EBS (Tallinn)</span>
                <Verified className="size-4 text-blue-500" />
              </span>
            </div>
          </div>
          <div className="grid gap-2">
            <CardDescription>Interests</CardDescription>
            <div className="flex justify-between gap-2 items-center">
              <Label>Volleyball</Label>
              <Switch checked={interests.volleyball} onCheckedChange={handleInterestChange("volleyball")} />
            </div>
            <div className="flex justify-between gap-2 items-center">
              <Label>Basketball</Label>
              <Switch checked={interests.basketball} onCheckedChange={handleInterestChange("basketball")} />
            </div>
            <div className="flex justify-between gap-2 items-center">
              <Label>Football</Label>
              <Switch checked={interests.football} onCheckedChange={handleInterestChange("football")} />
            </div>
            <div className="flex justify-between gap-2 items-center">
              <Label>Tennis</Label>
              <Switch checked={interests.tennis} onCheckedChange={handleInterestChange("tennis")} />
            </div>
            <div className="flex justify-between gap-2 items-center">
              <Label>Padel</Label>
              <Switch checked={interests.padel} onCheckedChange={handleInterestChange("padel")} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}