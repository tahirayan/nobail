"use client";

import {
  ArrowLeft,
  Building2,
  Calendar,
  Check,
  Clock,
  DoorOpen,
  MapPin,
  MessageCircle,
  Navigation,
  Share2,
  Ticket,
  Users,
  Utensils,
  Video,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
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
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AttendeeCard } from "@/components/widgets/attendee-card";
import { BailMode } from "@/components/widgets/bail-mode";
import { HostProfileCard } from "@/components/widgets/host-profile-card";
import { ReservationDialog } from "@/components/widgets/reservation-dialog";
import { cn } from "@/lib/utils";
import type { Event } from "@/types/events";

// Mock event data - in a real app, this would be fetched based on the ID
const mockEvents: Record<string, Event> = {
  mon1: {
    id: "mon1",
    day: "monday",
    title: "Slam Dunk Poetry",
    host: {
      id: "host-1",
      name: "Hamza Khan",
      avatar: "/hamza.jpeg",
      phone: "+3725031003",
      bio: "Poetry enthusiast and community builder. Loves bringing people together through spoken word and creative expression.",
      company: "NoBail",
    },
    time: "Mondays 18:00–20:00",
    prepayment: "20€",
    credit: "20€",
    description: "Nearly everything is up to the host",
    longDescription:
      "An evening of poetry, open mic sessions, and creative expression. Whether you're a seasoned poet or have never shared your words before, this is a safe space to explore and connect through the power of language. The host guides the evening with prompts and themes, but the floor is yours.",
    companies: ["Wise"],
    location: "Barbarea",
    venue: {
      id: "v1",
      name: "Barbarea",
      region: "Old Town",
      address: "Vene 12, Tallinn",
      espressoPrice: "€2.50",
      type: "Restaurant",
    },
    spots: { current: 0, total: 10 },
    language: "English",
    doorCode: "1234",
    directions:
      "Enter through the main door, go up the stairs. We're on the right-hand side.",
    whatsappLink: "https://chat.whatsapp.com/example",
    pickupAvailable: true,
    attendees: [],
  },
  tue1: {
    id: "tue1",
    day: "tuesday",
    title: "Deeper Discussions",
    host: {
      id: "host-2",
      name: "Ucha Vekua",
      avatar: "/Ucha Vekua.jpeg",
      phone: "+3725031004",
      bio: "Facilitator of meaningful conversations. Believes that the best connections happen when we go beyond small talk.",
    },
    time: "Tuesdays 18:00–20:00",
    prepayment: "10€",
    credit: "20€",
    description: "Prepay 10€ for 20€ of food and drinks",
    longDescription:
      "Skip the small talk and dive into topics that matter. Each week features a different theme, from philosophy to technology to personal growth. Come ready to listen, share, and maybe have your perspective challenged.",
    companies: ["Wise"],
    location: "Pudel Bar · Telliskivi",
    venue: {
      id: "v2",
      name: "Pudel Bar",
      region: "Telliskivi",
      address: "Telliskivi 62, Tallinn",
      espressoPrice: "€3.00",
      type: "Bar",
    },
    spots: { current: 8, total: 10 },
    language: "English",
    isDiscountApplied: true,
    discountType: 1,
    discountAmount: "50%",
    doorCode: "2580",
    directions: "Main entrance, ground floor on the left.",
    whatsappLink: "https://chat.whatsapp.com/example2",
    pickupAvailable: true,
    attendees: [
      {
        id: "a1",
        publicAnswers: [
          {
            question: "Most watched TV show last year?",
            answer: "Breaking Bad",
          },
          {
            question: "Bad habit I can't get rid of?",
            answer: "Late night coding sessions",
          },
        ],
      },
      {
        id: "a2",
        publicAnswers: [
          { question: "Most watched TV show last year?", answer: "The Office" },
        ],
      },
      {
        id: "a3",
        publicAnswers: [
          {
            question: "Your most watched movie last year?",
            answer: "Oppenheimer",
          },
          { question: "Most watched TV show last year?", answer: "Succession" },
        ],
      },
      {
        id: "a4",
        publicAnswers: [],
      },
      {
        id: "a5",
        publicAnswers: [
          {
            question: "Bad habit I can't get rid of?",
            answer: "Checking my phone first thing in the morning",
          },
        ],
      },
      {
        id: "a6",
        publicAnswers: [
          { question: "Most watched TV show last year?", answer: "Ted Lasso" },
          { question: "Your most watched movie last year?", answer: "Barbie" },
        ],
      },
      {
        id: "a7",
        publicAnswers: [
          {
            question: "Bad habit I can't get rid of?",
            answer: "Drinking too much coffee",
          },
        ],
      },
      {
        id: "current-user",
        isCurrentUser: true,
        publicAnswers: [
          {
            question: "Most watched TV show last year?",
            answer: "Peaky Blinders",
          },
          { question: "Your most watched movie last year?", answer: "Barbie" },
          {
            question: "Bad habit I can't get rid of?",
            answer: "Always packing my backpack as full as possible",
          },
        ],
      },
    ],
  },
  wed1: {
    id: "wed1",
    day: "wednesday",
    title: "5-minute Vibe Check",
    host: {
      id: "host-3",
      name: "Shane Cooper",
      avatar: "/Shane Cooper.jpeg",
      phone: "+3725031005",
      bio: "Quick connections specialist. In 5 minutes, you can learn a lot about someone if you ask the right questions.",
    },
    time: "Wednesdays 18:00–19:00",
    prepayment: "6€",
    credit: "10€",
    description: "Prepay 6€ for 10€ of food and drinks",
    longDescription:
      "Speed networking reimagined. Every 5 minutes, you'll meet someone new with a conversation prompt to get things going. No awkward silences, just genuine connections.",
    companies: ["Bolt", "Wise", "Veriff", "Pipedrive"],
    location: "NoKu · Old Town",
    venue: {
      id: "v3",
      name: "NoKu",
      region: "Old Town",
      address: "Rataskaevu 8, Tallinn",
      espressoPrice: "€2.80",
      type: "Restaurant",
    },
    spots: { current: 1, total: 20 },
    language: "English",
    isDiscountApplied: true,
    discountAmount: "40%",
    doorCode: "5678",
    directions: "Ground floor, follow the NoBail signs.",
    pickupAvailable: true,
    attendees: [
      {
        id: "a1",
        publicAnswers: [
          {
            question: "Most watched TV show last year?",
            answer: "House of Dragon",
          },
        ],
      },
    ],
  },
  thu1: {
    id: "thu1",
    day: "thursday",
    title: "Amateur (Comedy Hour)",
    host: {
      id: "host-1",
      name: "Hamza Khan",
      avatar: "/hamza.jpeg",
      phone: "+3725031003",
      bio: "Poetry enthusiast and community builder. Sometimes also tells jokes.",
    },
    time: "Thursdays 18:00–20:00",
    prepayment: "20€",
    credit: "20€",
    description: "Nearly everything is up to the host",
    longDescription:
      "Try your hand at stand-up comedy in a supportive environment. Whether you've been working on material or just want to tell a funny story, the stage is yours. Professional comedians occasionally drop by to offer tips!",
    companies: ["Wise"],
    location: "Barbarea",
    venue: {
      id: "v1",
      name: "Barbarea",
      region: "Old Town",
      address: "Vene 12, Tallinn",
      espressoPrice: "€2.50",
      type: "Restaurant",
    },
    spots: { current: 0, total: 10 },
    language: "English",
    doorCode: "1234",
    directions: "Same as Monday poetry night.",
    pickupAvailable: true,
    attendees: [],
  },
  fri1: {
    id: "fri1",
    day: "friday",
    title: "House Party",
    host: {
      id: "host-4",
      name: "Markus M. Milder",
      avatar: "/Markus M. Milder.jpeg",
      phone: "+3725031003",
      bio: "Founder of NoBail. Makes sure people don't bail on each other. Drives a silver Chrysler Voyager.",
      company: "NoBail",
    },
    time: "Fridays 19:00–23:00",
    prepayment: "21€",
    credit: "Open Bar",
    description: "Prepay 21€ (instead of 30€) for an open bar",
    longDescription:
      "The week's done, time to celebrate! Join us for an open bar experience at a secret location in Old Town. Music, mingling, and memorable moments guaranteed.",
    companies: ["Bolt", "Wise", "Veriff", "Pipedrive"],
    location: "Secret location · Old Town",
    venue: {
      id: "v4",
      name: "Secret Location",
      region: "Old Town",
      address: "Revealed after reservation",
    },
    spots: { current: 2, total: 30 },
    language: "English",
    isDiscountApplied: true,
    discountAmount: "30%",
    doorCode: "9999",
    directions: "Address revealed in confirmation email!",
    pickupAvailable: true,
    attendees: [
      {
        id: "a1",
        publicAnswers: [
          {
            question: "Your most watched movie last year?",
            answer: "Dune Part 2",
          },
        ],
      },
      {
        id: "a2",
        publicAnswers: [
          { question: "Most watched TV show last year?", answer: "The Bear" },
        ],
      },
    ],
  },
  sat1: {
    id: "sat1",
    day: "saturday",
    title: "Table At a Time",
    host: {
      id: "host-4",
      name: "Markus M. Milder",
      avatar: "/Markus M. Milder.jpeg",
      phone: "+3725031003",
      bio: "Founder of NoBail. Makes sure people don't bail on each other. Drives a silver Chrysler Voyager.",
      company: "NoBail",
    },
    time: "Saturdays 19:00–23:00",
    prepayment: "24€",
    credit: "30€",
    description: "Prepay 24€ for 30€ of food and drinks",
    longDescription:
      "Our signature event! Three tables, 10 people each hour. Markus spends 30 minutes at each table to get things going. Great food, great drinks, great conversations.",
    companies: ["Bolt", "Wise", "Veriff", "Pipedrive"],
    location: "NoKu · Old Town",
    venue: {
      id: "v3",
      name: "NoKu",
      region: "Old Town",
      address: "Rataskaevu 8, Tallinn",
      espressoPrice: "€2.80",
      type: "Restaurant",
    },
    spots: { current: 18, total: 30 },
    language: "English",
    isDiscountApplied: true,
    discountAmount: "20%",
    doorCode: "2580",
    directions: "Go up the stairs; as you enter, we're on the right-hand side.",
    whatsappLink: "https://chat.whatsapp.com/tableatatime",
    pickupAvailable: true,
    videoUrl: "https://www.youtube.com/watch?v=example",
    attendees: Array.from({ length: 18 }, (_, i) => ({
      id: `attendee-${i}`,
      publicAnswers:
        i % 3 === 0
          ? [
              {
                question: "Most watched TV show last year?",
                answer: [
                  "Breaking Bad",
                  "The Office",
                  "Succession",
                  "Ted Lasso",
                ][i % 4],
              },
            ]
          : [],
    })),
  },
  sun1: {
    id: "sun1",
    day: "sunday",
    title: "Lunch, Accountability & Deepwork",
    host: {
      id: "host-4",
      name: "Markus M. Milder",
      avatar: "/Markus M. Milder.jpeg",
      phone: "+3725031003",
      bio: "Founder of NoBail. Also a productivity nerd who believes in the power of working alongside others.",
      company: "NoBail",
    },
    time: "Sundays 12:00–19:00",
    prepayment: "18€",
    credit: "20€",
    description: "Prepay 18€ for 20€ of food and drinks",
    longDescription:
      "Start with lunch, share your goals for the day, then get to work. A coworking session with accountability partners. Perfect for side projects, studying, or catching up on work.",
    companies: ["Bolt", "Wise", "Veriff", "Pipedrive"],
    location: "Spaces & Levier · Rotermanni",
    venue: {
      id: "v5",
      name: "Spaces & Levier",
      region: "Rotermanni",
      address: "Rotermann 14, Tallinn",
      espressoPrice: "€2.50",
      type: "Coworking",
    },
    spots: { current: 4, total: 10 },
    language: "English",
    isDiscountApplied: true,
    discountAmount: "10%",
    doorCode: "1111",
    directions: "Main entrance, 3rd floor.",
    pickupAvailable: true,
    attendees: Array.from({ length: 4 }, (_, i) => ({
      id: `attendee-${i}`,
      publicAnswers: [
        {
          question: "Bad habit I can't get rid of?",
          answer: [
            "Procrastination",
            "Coffee addiction",
            "Late nights",
            "Snacking",
          ][i],
        },
      ],
    })),
  },
};

export default function EventDetailPage() {
  const params = useParams();
  const eventId = params.id as string;
  const event = mockEvents[eventId];

  const [hasReserved, setHasReserved] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!event) {
    return (
      <div className="container grid place-items-center py-20">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle>Event Not Found</CardTitle>
            <CardDescription>
              This event doesn't exist or has been removed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/dashboard">Back to Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const spotsProgress = (event.spots.current / event.spots.total) * 100;
  const spotsRemaining = event.spots.total - event.spots.current;

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReservation = () => {
    setHasReserved(true);
  };

  return (
    <div className="container grid place-items-center px-4 py-6">
      <div className="flex w-full max-w-5xl flex-col gap-6">
        {/* Back Button */}
        <Button asChild className="w-fit gap-2" variant="ghost">
          <Link href="/dashboard">
            <ArrowLeft className="size-4" />
            Back to Events
          </Link>
        </Button>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            {/* Event Header */}
            <Card>
              <CardHeader>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex flex-col gap-2">
                    {event.isDiscountApplied && (
                      <Badge
                        className={cn(
                          "w-fit",
                          event.discountType === 0
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        )}
                        variant="outline"
                      >
                        {event.discountType === 0
                          ? "No bookings yet!"
                          : `${event.discountAmount} discount!`}
                      </Badge>
                    )}
                    <CardTitle className="text-2xl">{event.title}</CardTitle>
                    <CardDescription className="flex flex-wrap items-center gap-2">
                      <span className="flex items-center gap-1">
                        <Clock className="size-4" />
                        {event.time}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="size-4" />
                        {event.location}
                      </span>
                    </CardDescription>
                  </div>
                  <Button
                    className="gap-2"
                    onClick={handleCopyLink}
                    size="sm"
                    variant="outline"
                  >
                    {copied ? (
                      <Check className="size-4" />
                    ) : (
                      <Share2 className="size-4" />
                    )}
                    Share
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-6">
                {/* Video if available */}
                {event.videoUrl && (
                  <div className="flex items-center gap-4 rounded-lg bg-muted/50 p-4">
                    <Video className="size-8 text-muted-foreground" />
                    <div className="flex flex-col gap-1">
                      <span className="font-medium text-sm">
                        Introduction Video
                      </span>
                      <span className="text-muted-foreground text-xs">
                        Watch to learn more about the venue and meetup
                      </span>
                    </div>
                    <Button
                      asChild
                      className="ml-auto"
                      size="sm"
                      variant="outline"
                    >
                      <a
                        href={event.videoUrl}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        Watch
                      </a>
                    </Button>
                  </div>
                )}

                {/* Description */}
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold">About this Meetup</h3>
                  <p className="text-muted-foreground text-sm">
                    {event.longDescription || event.description}
                  </p>
                </div>

                <Separator />

                {/* Details Grid */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <Calendar className="size-5 translate-y-0.5 text-muted-foreground" />
                    <div>
                      <span className="font-medium text-sm">When</span>
                      <p className="text-muted-foreground text-sm">
                        {event.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="size-5 translate-y-0.5 text-muted-foreground" />
                    <div>
                      <span className="font-medium text-sm">Where</span>
                      <p className="text-muted-foreground text-sm">
                        {event.venue.name} · {event.venue.region}
                      </p>
                      {event.venue.address && (
                        <p className="text-muted-foreground text-xs">
                          {event.venue.address}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MessageCircle className="size-5 translate-y-0.5 text-muted-foreground" />
                    <div>
                      <span className="font-medium text-sm">Language</span>
                      <p className="text-muted-foreground text-sm">
                        {event.language}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Building2 className="size-5 translate-y-0.5 text-muted-foreground" />
                    <div>
                      <span className="font-medium text-sm">Visible to</span>
                      <p className="text-muted-foreground text-sm">
                        {event.companies.join(", ")}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Reservation Info (shown after booking) */}
                {hasReserved && (
                  <>
                    <Separator />
                    <div className="flex flex-col gap-4 rounded-lg border-2 border-green-200 bg-green-50 p-4">
                      <h3 className="flex items-center gap-2 font-semibold text-green-800">
                        <Ticket className="size-5" />
                        Your Reservation
                      </h3>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {event.doorCode && (
                          <div className="flex items-start gap-3">
                            <DoorOpen className="size-5 translate-y-0.5 text-green-700" />
                            <div>
                              <span className="font-medium text-green-800 text-sm">
                                Door Code
                              </span>
                              <p className="font-bold font-mono text-green-900 text-lg">
                                {event.doorCode}
                              </p>
                            </div>
                          </div>
                        )}
                        {event.directions && (
                          <div className="flex items-start gap-3">
                            <Navigation className="size-5 translate-y-0.5 text-green-700" />
                            <div>
                              <span className="font-medium text-green-800 text-sm">
                                Directions
                              </span>
                              <p className="text-green-800 text-sm">
                                {event.directions}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                      {event.whatsappLink && (
                        <Button
                          asChild
                          className="w-fit gap-2"
                          size="sm"
                          variant="outline"
                        >
                          <a
                            href={event.whatsappLink}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <MessageCircle className="size-4" />
                            Join WhatsApp Group
                          </a>
                        </Button>
                      )}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Attendees Section */}
            {event.attendees && event.attendees.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Users className="size-5" />
                    Who's Coming ({event.attendees.length})
                  </CardTitle>
                  <CardDescription>
                    Public answers from attendees - we keep names anonymous
                    until you meet!
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs
                    className="flex w-full flex-col gap-4"
                    defaultValue="all"
                  >
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="all">
                        All ({event.attendees.length})
                      </TabsTrigger>
                      <TabsTrigger value="answered">
                        With Answers (
                        {
                          event.attendees.filter(
                            (a) => a.publicAnswers.length > 0
                          ).length
                        }
                        )
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent className="mt-0" value="all">
                      <div className="grid gap-4 sm:grid-cols-2">
                        {event.attendees.map((attendee, idx) => (
                          <AttendeeCard
                            attendee={attendee}
                            index={idx}
                            key={attendee.id}
                          />
                        ))}
                      </div>
                    </TabsContent>
                    <TabsContent className="mt-0" value="answered">
                      <div className="grid gap-4 sm:grid-cols-2">
                        {event.attendees
                          .filter((a) => a.publicAnswers.length > 0)
                          .map((attendee, idx) => (
                            <AttendeeCard
                              attendee={attendee}
                              index={idx}
                              key={attendee.id}
                            />
                          ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}

            {/* Bail Mode (shown after reservation) */}
            {hasReserved && (
              <BailMode eventId={event.id} eventTitle={event.title} />
            )}
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6">
            {/* Reservation Card */}
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Reserve Your Spot</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                {/* Spots Progress */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Spots</span>
                    <span className="font-semibold">
                      {event.spots.current} / {event.spots.total}
                    </span>
                  </div>
                  <Progress className="h-3" value={spotsProgress} />
                  <span className="text-muted-foreground text-xs">
                    {spotsRemaining} {spotsRemaining === 1 ? "spot" : "spots"}{" "}
                    remaining
                  </span>
                </div>

                <Separator />

                {/* Pricing */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">
                      Prepayment
                    </span>
                    <div className="flex items-center gap-2">
                      {event.isDiscountApplied && event.originalPrepayment && (
                        <span className="text-muted-foreground text-sm line-through">
                          {event.originalPrepayment}
                        </span>
                      )}
                      <span className="font-bold text-xl">
                        {event.prepayment}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">
                      You can order for
                    </span>
                    <span className="font-semibold text-green-600">
                      {event.credit}
                    </span>
                  </div>
                  {event.isDiscountApplied && (
                    <Badge
                      className="w-fit bg-green-100 text-green-700"
                      variant="outline"
                    >
                      {event.discountAmount} discount applied!
                    </Badge>
                  )}
                </div>

                <Separator />

                {/* CTA */}
                {hasReserved ? (
                  <div className="flex flex-col items-center gap-2 rounded-lg bg-green-50 p-4 text-center">
                    <Check className="size-8 text-green-600" />
                    <span className="font-semibold text-green-800">
                      You're Going!
                    </span>
                    <span className="text-green-700 text-sm">
                      Check your email for confirmation details
                    </span>
                  </div>
                ) : (
                  <ReservationDialog
                    event={event}
                    onReserve={handleReservation}
                    trigger={
                      <Button className="w-full gap-2" size="lg">
                        <Utensils className="size-4" />
                        Reserve for {event.prepayment}
                      </Button>
                    }
                  />
                )}

                {/* Pickup Notice */}
                {event.pickupAvailable && !hasReserved && (
                  <p className="text-center text-muted-foreground text-xs">
                    Free pickup available within Tallinn
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Host Card */}
            <HostProfileCard host={event.host} showContact={hasReserved} />

            {/* Venue Info Card */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Venue</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <MapPin className="size-5 translate-y-0.5 text-muted-foreground" />
                  <div>
                    <span className="font-medium">{event.venue.name}</span>
                    <p className="text-muted-foreground text-sm">
                      {event.venue.region}
                    </p>
                    {event.venue.address && (
                      <p className="text-muted-foreground text-xs">
                        {event.venue.address}
                      </p>
                    )}
                  </div>
                </div>
                {event.venue.type && (
                  <Badge className="w-fit" variant="outline">
                    {event.venue.type}
                  </Badge>
                )}
                {event.venue.espressoPrice && (
                  <p className="text-muted-foreground text-xs">
                    Espresso: {event.venue.espressoPrice}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
