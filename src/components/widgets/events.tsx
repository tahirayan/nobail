"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HostAvatar } from "@/components/widgets/host-avatar";
import { cn } from "@/lib/utils";

type Event = {
  id: string;
  day: string;
  title: string;
  host?: string;
  time: string;
  prepayment: string;
  credit: string;
  description: string;
  companies: string;
  location: string;
  spots: { current: number; total: number };
  relatedEventId?: string;
  isSpecialVariant?: boolean;
  isExclusive?: boolean;
  isDiscountApplied?: boolean;
  discountType?: number;
  originalPrepayment?: string;
  originalCredit?: string;
  discountAmount?: string;
};

const events: Event[] = [
  {
    id: "1",
    day: "friday",
    title: "Deeper Discussions",
    host: "Rooban Letchumanan",
    time: "Fridays 20:00-00:00",
    prepayment: "10€",
    credit: "10€",
    description: "Prepayment 10€ → credit 10€ for food & drinks",
    companies: "Wise, Bolt, Pipedrive, Veriff",
    location: "Secret Old Town apartment",
    spots: { current: 42, total: 50 },
    relatedEventId: "3",
  },
  {
    id: "2",
    day: "friday",
    title: "House Party",
    host: "Markus Milder",
    time: "Fridays 20:00-00:00",
    prepayment: "30€",
    credit: "Free",
    description: "Prepayment 30€ and rest is free",
    companies: "Wise, Bolt, Pipedrive, Veriff",
    location: "Secret apartment in Old Town (thick walls)",
    spots: { current: 25, total: 50 },
  },
  {
    id: "3",
    day: "tuesday",
    title: "Deeper Discussions",
    host: "Rooban Letchumanan",
    time: "Tuesdays 19:00-21:00",
    prepayment: "10€",
    credit: "20€",
    description:
      "Prepayment 10€ → credit 20€ for food & drinks (First time at a venue: 50% off)",
    companies: "Wise",
    location: "Pudel Bar, Telliskivi",
    spots: { current: 6, total: 10 },
    relatedEventId: "1",
    isSpecialVariant: true,
  },
  {
    id: "4",
    day: "saturday",
    title: "Table at a Time",
    host: "Markus Milder",
    time: "Every Saturday 19:00-23:00",
    prepayment: "5€",
    credit: "20€",
    description:
      "Structured networking where conversations are easy, natural, and fun from the start",
    companies: "All Welcome",
    location: "NoKu in the Old Town",
    spots: { current: 7, total: 30 },
    isExclusive: false,
    isDiscountApplied: true,
    discountType: 1,
    originalPrepayment: "10€",
    originalCredit: "20€",
    discountAmount: "50%",
  },
  {
    id: "5",
    day: "sunday",
    title: "5min Vibe Check",
    time: "Sunday 19:00-20:00",
    prepayment: "12€",
    credit: "20€",
    description: "First time at Whisper Sister - 40% discount applied!",
    companies: "Wise, Bolt, Pipedrive, Veriff",
    location: "Whisper Sister cocktail bar near Solaris",
    spots: { current: 0, total: 20 },
    isDiscountApplied: true,
    discountType: 1,
    originalPrepayment: "20€",
    originalCredit: "20€",
    discountAmount: "40%",
  },
];

const dayFilters = [
  { id: "all", label: "All Days" },
  { id: "tuesday", label: "Tuesday" },
  { id: "friday", label: "Friday" },
  { id: "saturday", label: "Saturday" },
  { id: "sunday", label: "Sunday" },
];

export default function Events() {
  const [selectedDay, setSelectedDay] = useState("all");

  const percentageMultiplier = 100;

  const filteredEvents =
    selectedDay === "all"
      ? events
      : events.filter((event) => event.day === selectedDay);

  // Apply 40% discount for events with no reserved seats
  const discountMultiplier = 0.6;
  const eventsWithDiscount = filteredEvents.map((event) => {
    if (event.spots.current === 0 && !event.isDiscountApplied) {
      const originalPrepaymentValue = Number.parseInt(
        event.prepayment.replace("€", ""),
        10
      );
      const discountedPrepayment = Math.round(
        originalPrepaymentValue * discountMultiplier
      );

      return {
        ...event,
        prepayment: `${discountedPrepayment}€`,
        isDiscountApplied: true,
        discountType: 0,
        originalPrepayment: event.prepayment,
        discountAmount: "40%",
        description: `${event.description} - 40% discount applied!`,
      };
    }
    return event;
  });

  return (
    <Card className="py-2 border-2">
      <CardHeader className="px-2">
        <CardTitle className="flex items-center space-x-2 font-semibold text-xl">
          <Search className="size-6 text-foreground" />
          <span>Discover</span>
        </CardTitle>
        <CardDescription>
          Exclusive networking events for tech professionals
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 px-2">
        {/* Day Filter Segmented Control */}
        <div className="flex items-center justify-center rounded-md border-2 bg-secondary/30 p-1">
          {dayFilters.map((day) => (
            <button
              className={`flex-1 rounded-sm px-4 py-2 font-medium text-sm transition-all duration-200 ${
                selectedDay === day.id
                  ? "bg-foreground text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
              }`}
              key={day.id}
              onClick={() => setSelectedDay(day.id)}
              type="button"
            >
              {day.label}
            </button>
          ))}
        </div>

        {/* Events */}
        <div className="flex flex-col gap-4">
          {eventsWithDiscount.map((event) => {
            const relatedEvent = event.relatedEventId
              ? events.find((e) => e.id === event.relatedEventId)
              : null;

            return (
              <div
                className="relative rounded-md border bg-gray-100"
                key={event.id}
              >
                {/* Discount Flair */}
                {event.isDiscountApplied && (
                  <div className="-left-2 -top-2 absolute z-10">
                    <div
                      className={cn(
                        "flex items-center gap-1 rounded-full px-2 py-1 font-medium text-white text-xs shadow-lg",
                        event.discountType === 0 ? "bg-red-400" : "bg-green-400"
                      )}
                    >
                      {event.discountType === 0
                        ? "No bookings yet!"
                        : "First time!"}
                    </div>
                  </div>
                )}
                <Card className="rounded-sm">
                  <CardHeader>
                    <CardTitle>
                      <div className="flex justify-between gap-2">
                        {event.title}
                        <span className="text-muted-foreground text-sm">
                          {event.time}
                        </span>
                      </div>
                    </CardTitle>
                    <CardDescription>
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          {event.host ? (
                            <Link
                              className="flex items-center gap-2 transition-colors hover:text-foreground"
                              href={`/hosts/${event.host
                                .toLowerCase()
                                .replace(/\s+/g, "-")
                                .replace(/[^a-z0-9-]/g, "")}`}
                            >
                              <HostAvatar name={event.host} size="sm" />
                              <span className="hover:underline">
                                {event.host}
                              </span>
                            </Link>
                          ) : (
                            <span>Event Team</span>
                          )}
                        </div>
                        <span className="text-muted-foreground text-sm">
                          {event.location}
                        </span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-6">
                      <div className="flex items-center justify-between">
                        <p className="text-muted-foreground text-sm">
                          {event.description}
                        </p>
                        {event.isDiscountApplied && (
                          <Badge
                            className="border-green-200 bg-green-50 text-green-700"
                            variant="outline"
                          >
                            {event.discountAmount} discount applied!
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <div className="relative flex items-center justify-center gap-2 overflow-hidden rounded-2xl border border-primary bg-primary/24 px-2 py-1">
                          <span className="z-10 font-medium text-sm text-white">
                            {event.spots.current} / {event.spots.total}
                          </span>
                          <span
                            className="absolute bottom-0 left-0 h-full bg-primary transition-all"
                            style={{
                              width: `${(event.spots.current / event.spots.total) * percentageMultiplier}%`,
                            }}
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-right">
                            {event.isDiscountApplied && (
                              <div className="text-muted-foreground text-xs line-through">
                                Prepayment: {event.originalPrepayment}
                              </div>
                            )}
                            <div className="flex flex-col">
                              <span className="font-bold text-xl">
                                Prepayment: {event.prepayment}
                              </span>
                              <span className="text-muted-foreground text-sm">
                                Credit: {event.credit}
                              </span>
                            </div>
                          </div>
                          <Button>
                            <Link href={`/events/${event?.id}`}>Enjoy!</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {relatedEvent && (
                  <div className="flex flex-col gap-2 border-border/50 border-t p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-lg">
                          Related: {relatedEvent.title}
                        </span>
                        {relatedEvent.isSpecialVariant && (
                          <Badge className="text-xs" variant="outline">
                            Special Variant
                          </Badge>
                        )}
                      </div>
                      <div className="relative flex items-center justify-center gap-2 overflow-hidden rounded-2xl border border-primary bg-primary/24 px-2 py-1">
                        <span className="z-10 font-medium text-sm text-white">
                          {relatedEvent.spots.current} /
                          {relatedEvent.spots.total}
                        </span>
                        <span
                          className="absolute bottom-0 left-0 h-full bg-primary transition-all"
                          style={{
                            width: `${(relatedEvent.spots.current / relatedEvent.spots.total) * percentageMultiplier}%`,
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-muted-foreground text-sm">
                        {relatedEvent.time}
                      </span>
                      <span className="text-muted-foreground text-sm">
                        {relatedEvent.location}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-muted-foreground text-sm">
                        {relatedEvent.description}
                      </span>
                      <Button variant="outline">
                        <Link href={`/events/${relatedEvent.id}`}>
                          View {relatedEvent.time.split(" ")[0]} Event!
                        </Link>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
