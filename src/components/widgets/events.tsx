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
  avatar?: string;
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
    id: "mon1",
    day: "monday",
    title: "Slam Dunk Poetry",
    host: "Hamza Khan",
    avatar: "/hamza.jpeg",
    time: "Mondays 18:00–20:00",
    prepayment: "20€",
    credit: "20€",
    description: "Nearly everything is up to the host",
    companies: "Wise employees",
    location: "Barbarea",
    spots: { current: 0, total: 10 },
  },
  {
    id: "tue1",
    day: "tuesday",
    title: "Deeper Discussions",
    host: "Ucha Vekua",
    avatar: "/Ucha Vekua.jpeg",
    time: "Tuesdays 18:00–20:00",
    prepayment: "10€",
    credit: "20€",
    description: "Prepay 10€ for 20€ of food and drinks",
    companies: "Wise employees",
    location: "Pudel Bar · Telliskivi",
    spots: { current: 8, total: 10 },
    isDiscountApplied: true,
    discountType: 1,
    discountAmount: "50%",
  },
  {
    id: "wed1",
    day: "wednesday",
    title: "5-minute Vibe Check",
    host: "Shane Cooper",
    avatar: "/Shane Cooper.jpeg",
    time: "Wednesdays 18:00–19:00",
    prepayment: "6€",
    credit: "10€",
    description: "Prepay 6€ for 10€ of food and drinks",
    companies: "Bolt, Wise, Veriff, Pipedrive",
    location: "NoKu · Old Town",
    spots: { current: 1, total: 20 },
    isDiscountApplied: true,
    discountAmount: "40%",
  },
  {
    id: "thu1",
    day: "thursday",
    title: "Amateur (Comedy Hour)",
    host: "Hamza Khan",
    avatar: "/hamza.jpeg",
    time: "Thursdays 18:00–20:00",
    prepayment: "20€",
    credit: "20€",
    description: "Nearly everything is up to the host",
    companies: "Wise employees",
    location: "Barbarea",
    spots: { current: 0, total: 10 },
  },
  {
    id: "fri1",
    day: "friday",
    title: "House Party",
    host: "Markus M. Milder",
    avatar: "/Markus M. Milder.jpeg",
    time: "Fridays 19:00–23:00",
    prepayment: "21€",
    credit: "Open Bar",
    description: "Prepay 21€ (instead of 30€) for an open bar",
    companies: "Bolt, Wise, Veriff, Pipedrive",
    location: "Secret location · Old Town",
    spots: { current: 2, total: 30 },
    isDiscountApplied: true,
    discountAmount: "30%",
  },
  {
    id: "sat1",
    day: "saturday",
    title: "Table At a Time",
    host: "Markus M. Milder",
    avatar: "/Markus M. Milder.jpeg",
    time: "Saturdays 19:00–23:00",
    prepayment: "24€",
    credit: "30€",
    description: "Prepay 24€ for 30€ of food and drinks",
    companies: "Bolt, Wise, Veriff, Pipedrive",
    location: "NoKu · Old Town",
    spots: { current: 3, total: 30 },
    isDiscountApplied: true,
    discountAmount: "20%",
  },
  {
    id: "sun1",
    day: "sunday",
    title: "Lunch, Accountability & Deepwork",
    host: "Markus M. Milder",
    avatar: "/Markus M. Milder.jpeg",
    time: "Sundays 12:00–19:00",
    prepayment: "18€",
    credit: "20€",
    description: "Prepay 18€ for 20€ of food and drinks",
    companies: "Bolt, Wise, Veriff, Pipedrive",
    location: "Spaces & Levier · Rotermanni",
    spots: { current: 4, total: 10 },
    isDiscountApplied: true,
    discountAmount: "10%",
  },
];

const dayFilters = [
  { id: "all", label: "All Days" },
  { id: "monday", label: "Monday" },
  { id: "tuesday", label: "Tuesday" },
  { id: "wednesday", label: "Wednesday" },
  { id: "thursday", label: "Thursday" },
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
    <Card className="border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-semibold text-xl">
          <Search className="size-6 text-foreground" />
          <span>Discover</span>
        </CardTitle>
        <CardDescription>
          Exclusive networking events for tech professionals
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {/* Day Filter Segmented Control */}
        <div className="flex items-center justify-center overflow-x-auto rounded-md border bg-secondary/30 p-1">
          {dayFilters.map((day) => (
            <button
              className={`flex-1 whitespace-nowrap rounded-sm px-3 py-2 font-medium text-sm transition-all duration-200 ${
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
                className="relative rounded-md"
                key={event.id}
              >
                {/* Discount Flair */}
                {event.isDiscountApplied && (
                  <div className="-top-2 absolute right-2 z-10">
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
                              <HostAvatar
                                avatar={event.avatar}
                                name={event.host}
                                size="sm"
                              />
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
                              width: `${
                                (event.spots.current / event.spots.total) *
                                percentageMultiplier
                              }%`,
                            }}
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-right">
                            {event.isDiscountApplied &&
                              event.originalPrepayment && (
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
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
