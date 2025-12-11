"use client";

import { MessageSquare, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Attendee } from "@/types/events";

type AttendeeCardProps = {
  attendee: Attendee;
  index: number;
};

const AVATAR_COLORS = [
  "bg-red-100 text-red-600",
  "bg-blue-100 text-blue-600",
  "bg-green-100 text-green-600",
  "bg-purple-100 text-purple-600",
  "bg-orange-100 text-orange-600",
  "bg-pink-100 text-pink-600",
  "bg-teal-100 text-teal-600",
  "bg-indigo-100 text-indigo-600",
];

export const AttendeeCard = ({ attendee, index }: AttendeeCardProps) => {
  const colorClass = AVATAR_COLORS[index % AVATAR_COLORS.length];

  return (
    <Card
      className={cn(
        "transition-all hover:shadow-md",
        attendee.isCurrentUser === true && "ring-2 ring-primary"
      )}
    >
      <CardContent className="flex flex-col gap-4 p-4">
        {/* Anonymous Avatar */}
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "grid size-12 place-items-center rounded-full",
              colorClass
            )}
          >
            <User className="size-6" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-medium text-sm">Attendee #{index + 1}</span>
            {attendee.isCurrentUser === true ? (
              <Badge className="w-fit" variant="outline">
                You
              </Badge>
            ) : null}
          </div>
        </div>

        {/* Public Q&A Answers */}
        {attendee.publicAnswers.length > 0 && (
          <div className="flex flex-col gap-3">
            {attendee.publicAnswers.map((qa, idx) => (
              <div
                className="flex flex-col gap-1"
                key={`${attendee.id}-qa-${idx}`}
              >
                <div className="flex items-start gap-2 text-muted-foreground text-xs">
                  <MessageSquare className="size-3 shrink-0 translate-y-0.5" />
                  <span>{qa.question}</span>
                </div>
                <p className="pl-5 text-sm">{qa.answer}</p>
              </div>
            ))}
          </div>
        )}

        {attendee.publicAnswers.length === 0 && (
          <p className="text-muted-foreground text-xs italic">
            This attendee hasn't shared any public answers yet
          </p>
        )}
      </CardContent>
    </Card>
  );
};
