"use client";

import {
  AlertTriangle,
  Check,
  Copy,
  ExternalLink,
  Share2,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

type BailModeProps = {
  eventId: string;
  eventTitle: string;
  isActivated?: boolean;
  bailLink?: string;
  onActivate?: () => void;
  onDeactivate?: () => void;
};

export const BailMode = ({
  eventId: _eventId,
  eventTitle,
  isActivated = false,
  bailLink = "https://nobail.ee/t/ABC123",
  onActivate,
  onDeactivate,
}: BailModeProps) => {
  const [isActive, setIsActive] = useState(isActivated);
  const [copied, setCopied] = useState(false);

  const handleToggle = (checked: boolean) => {
    setIsActive(checked);
    if (checked) {
      onActivate?.();
    } else {
      onDeactivate?.();
    }
  };

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(bailLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: `Take my spot at ${eventTitle}`,
        text: `I can't make it to ${eventTitle}. Want my spot?`,
        url: bailLink,
      });
    } else {
      handleCopyLink();
    }
  };

  return (
    <Card
      className={cn(
        "transition-all",
        isActive === true && "border-orange-300 bg-orange-50/50"
      )}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <AlertTriangle
            className={cn(
              "size-5",
              isActive ? "text-orange-500" : "text-muted-foreground"
            )}
          />
          Can't Make It?
        </CardTitle>
        <CardDescription>
          Activate Bail Mode to give away your spot and keep your streak
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {/* Toggle */}
        <div className="flex items-center justify-between gap-4 rounded-lg border p-4">
          <div className="flex flex-col gap-1">
            <Label className="font-medium" htmlFor="bail-mode">
              Bail Mode
            </Label>
            <p className="text-muted-foreground text-xs">
              {isActive
                ? "Your social circle has been notified"
                : "Notify your social circle when activated"}
            </p>
          </div>
          <Switch
            checked={isActive}
            className="data-[state=checked]:bg-orange-500"
            id="bail-mode"
            onCheckedChange={handleToggle}
          />
        </div>

        {isActive === true ? (
          <>
            {/* What happens */}
            <Alert className="border-orange-200 bg-orange-50">
              <Users className="size-4 text-orange-600" />
              <AlertTitle className="text-orange-800">
                Your spot is available
              </AlertTitle>
              <AlertDescription className="text-orange-700 text-xs">
                Your NoBail social circle has been notified. You can also share
                the link below.
              </AlertDescription>
            </Alert>

            {/* Share Link */}
            <div className="flex flex-col gap-2">
              <Label className="text-sm">Share this link</Label>
              <div className="flex gap-2">
                <Input
                  className="font-mono text-sm"
                  readOnly
                  value={bailLink}
                />
                <Button
                  className="shrink-0 gap-2"
                  onClick={handleCopyLink}
                  size="icon"
                  variant="outline"
                >
                  {copied ? (
                    <Check className="size-4 text-green-600" />
                  ) : (
                    <Copy className="size-4" />
                  )}
                </Button>
              </div>
              <p className="text-muted-foreground text-xs">
                Anyone with this link can claim your spot (they'll need to
                verify access)
              </p>
            </div>

            {/* Share Buttons */}
            <div className="flex gap-2">
              <Button
                className="flex-1 gap-2"
                onClick={handleShare}
                variant="outline"
              >
                <Share2 className="size-4" />
                Share
              </Button>
              <Button asChild className="flex-1 gap-2" variant="outline">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`I can't make it to ${eventTitle}. Want my spot? ${bailLink}`)}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <ExternalLink className="size-4" />
                  WhatsApp
                </a>
              </Button>
            </div>

            {/* Deactivate notice */}
            <p className="text-center text-muted-foreground text-xs">
              You can deactivate Bail Mode if your plans change and your spot
              hasn't been taken yet.
            </p>
          </>
        ) : null}

        {isActive === false ? (
          <div className="flex flex-col gap-3 text-sm">
            <p className="text-muted-foreground">
              When you activate Bail Mode:
            </p>
            <ul className="list-inside list-disc text-muted-foreground text-xs">
              <li>Your NoBail social circle gets notified instantly</li>
              <li>You get a link to share with anyone</li>
              <li>Your streak stays intact when someone takes your spot</li>
              <li>
                You can deactivate if you can make it after all (if spot not
                taken)
              </li>
            </ul>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};
