"use client";

import {
  ArrowLeft,
  Calendar,
  MapPin,
  MessageCircle,
  Phone,
  Star,
  Trophy,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
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

type HostData = {
  id: string;
  name: string;
  slug: string;
  avatar?: string;
  phone?: string;
  bio: string;
  longBio?: string;
  company?: string;
  joinedDate: string;
  stats: {
    eventsHosted: number;
    totalAttendees: number;
    avgRating: number;
    repeatAttendees: number;
  };
  events: HostEvent[];
  testimonials: Testimonial[];
};

type HostEvent = {
  id: string;
  title: string;
  day: string;
  time: string;
  location: string;
  spots: { current: number; total: number };
};

type Testimonial = {
  id: string;
  text: string;
  rating: number;
  date: string;
};

const mockHosts: Record<string, HostData> = {
  "hamza-khan": {
    id: "host-1",
    name: "Hamza Khan",
    slug: "hamza-khan",
    avatar: "/hamza.jpeg",
    phone: "+3725031003",
    bio: "Poetry enthusiast and community builder. Loves bringing people together through spoken word and creative expression.",
    longBio:
      "Hamza is a passionate poetry enthusiast who has been hosting spoken word events for over 5 years. Originally from Pakistan, he moved to Estonia to work in tech but found his true calling in bringing people together through creative expression. When he's not hosting poetry nights, you can find him at local cafés working on his next piece or exploring the Estonian countryside.",
    company: "NoBail",
    joinedDate: "2023-06-15",
    stats: {
      eventsHosted: 48,
      totalAttendees: 420,
      avgRating: 4.8,
      repeatAttendees: 65,
    },
    events: [
      {
        id: "mon1",
        title: "Slam Dunk Poetry",
        day: "Monday",
        time: "18:00–20:00",
        location: "Barbarea",
        spots: { current: 0, total: 10 },
      },
      {
        id: "thu1",
        title: "Amateur (Comedy Hour)",
        day: "Thursday",
        time: "18:00–20:00",
        location: "Barbarea",
        spots: { current: 0, total: 10 },
      },
    ],
    testimonials: [
      {
        id: "t1",
        text: "Hamza creates such a welcoming atmosphere. I was nervous to share my first poem, but he made everyone feel comfortable.",
        rating: 5,
        date: "2024-11-20",
      },
      {
        id: "t2",
        text: "Best poetry night in Tallinn! The energy is always amazing.",
        rating: 5,
        date: "2024-10-15",
      },
    ],
  },
  "ucha-vekua": {
    id: "host-2",
    name: "Ucha Vekua",
    slug: "ucha-vekua",
    avatar: "/Ucha Vekua.jpeg",
    phone: "+3725031004",
    bio: "Facilitator of meaningful conversations. Believes that the best connections happen when we go beyond small talk.",
    longBio:
      "Ucha is a conversation design expert from Georgia who specializes in creating spaces for deep, meaningful dialogue. With a background in psychology and a passion for human connection, he designs each Deeper Discussions session to help attendees move past surface-level chat and into genuine understanding. He's fascinated by the questions that reveal who we truly are.",
    joinedDate: "2023-09-01",
    stats: {
      eventsHosted: 32,
      totalAttendees: 280,
      avgRating: 4.9,
      repeatAttendees: 72,
    },
    events: [
      {
        id: "tue1",
        title: "Deeper Discussions",
        day: "Tuesday",
        time: "18:00–20:00",
        location: "Pudel Bar · Telliskivi",
        spots: { current: 8, total: 10 },
      },
    ],
    testimonials: [
      {
        id: "t1",
        text: "I've been to many networking events, but nothing compares to Ucha's Deeper Discussions. You actually get to know people.",
        rating: 5,
        date: "2024-11-18",
      },
      {
        id: "t2",
        text: "Ucha has a gift for asking the right questions at the right time. Highly recommend!",
        rating: 5,
        date: "2024-10-28",
      },
    ],
  },
  "shane-cooper": {
    id: "host-3",
    name: "Shane Cooper",
    slug: "shane-cooper",
    avatar: "/Shane Cooper.jpeg",
    phone: "+3725031005",
    bio: "Quick connections specialist. In 5 minutes, you can learn a lot about someone if you ask the right questions.",
    longBio:
      "Shane is an Australian expat who found his way to Tallinn through the startup scene. After years of awkward networking events, he decided to reinvent the format with his 5-minute Vibe Check concept. Each rotation is carefully timed and comes with conversation starters that cut through the small talk. Shane believes that first impressions matter, but the right questions can reveal the real person behind the handshake.",
    joinedDate: "2024-01-15",
    stats: {
      eventsHosted: 24,
      totalAttendees: 480,
      avgRating: 4.7,
      repeatAttendees: 58,
    },
    events: [
      {
        id: "wed1",
        title: "5-minute Vibe Check",
        day: "Wednesday",
        time: "18:00–19:00",
        location: "NoKu · Old Town",
        spots: { current: 1, total: 20 },
      },
    ],
    testimonials: [
      {
        id: "t1",
        text: "Met more interesting people in one hour than I usually do in a month!",
        rating: 5,
        date: "2024-11-22",
      },
      {
        id: "t2",
        text: "Shane keeps the energy high and the conversations flowing. Perfect for introverts!",
        rating: 4,
        date: "2024-11-01",
      },
    ],
  },
  "markus-m-milder": {
    id: "host-4",
    name: "Markus M. Milder",
    slug: "markus-m-milder",
    avatar: "/Markus M. Milder.jpeg",
    phone: "+3725031003",
    bio: "Founder of NoBail. Makes sure people don't bail on each other. Drives a silver Chrysler Voyager.",
    longBio:
      "Markus is the founder and driving force behind NoBail. After organizing Daily Meetups for 3 years as an NGO bringing internationals together, he realized the biggest problem wasn't finding people who wanted to connect—it was getting them to actually show up. That frustration led to NoBail, a platform designed to ensure commitments are kept. When he's not hosting events or picking up attendees in his legendary silver Chrysler Voyager, Markus is working on new ways to build genuine community in Tallinn.",
    company: "NoBail",
    joinedDate: "2023-01-01",
    stats: {
      eventsHosted: 156,
      totalAttendees: 2840,
      avgRating: 4.9,
      repeatAttendees: 78,
    },
    events: [
      {
        id: "fri1",
        title: "House Party",
        day: "Friday",
        time: "19:00–23:00",
        location: "Secret location · Old Town",
        spots: { current: 2, total: 30 },
      },
      {
        id: "sat1",
        title: "Table At a Time",
        day: "Saturday",
        time: "19:00–23:00",
        location: "NoKu · Old Town",
        spots: { current: 18, total: 30 },
      },
      {
        id: "sun1",
        title: "Lunch, Accountability & Deepwork",
        day: "Sunday",
        time: "12:00–19:00",
        location: "Spaces & Levier · Rotermanni",
        spots: { current: 4, total: 10 },
      },
    ],
    testimonials: [
      {
        id: "t1",
        text: "Markus is an absolute legend. The pickup service alone makes NoBail events special!",
        rating: 5,
        date: "2024-11-25",
      },
      {
        id: "t2",
        text: "Table At a Time is my favorite weekend activity. Great food, great company, great host.",
        rating: 5,
        date: "2024-11-16",
      },
      {
        id: "t3",
        text: "The LAD sessions helped me stay accountable for my side project. Thanks Markus!",
        rating: 5,
        date: "2024-10-20",
      },
    ],
  },
};

export default function HostProfilePage() {
  const params = useParams();
  const slug = params.slug as string;
  const host = mockHosts[slug];

  if (!host) {
    return (
      <div className="container grid place-items-center py-20">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle>Host Not Found</CardTitle>
            <CardDescription>
              This host profile doesn't exist or has been removed
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

  const joinDate = new Date(host.joinedDate);
  const formattedJoinDate = joinDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="grid w-full max-w-7xl place-items-center px-4 py-6">
      <div className="flex w-full max-w-4xl flex-col gap-6">
        {/* Back Button */}
        <Button asChild className="w-fit gap-2" variant="ghost">
          <Link href="/dashboard">
            <ArrowLeft className="size-4" />
            Back to Events
          </Link>
        </Button>

        <div className="grid gap-6">
          {/* Host Header */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
                {/* Avatar */}
                <div className="shrink-0">
                  {host.avatar ? (
                    <Image
                      alt={host.name}
                      className="size-32 rounded-full object-cover ring-4 ring-primary/20"
                      height={128}
                      src={host.avatar}
                      width={128}
                    />
                  ) : (
                    <HostAvatar name={host.name} size="lg" />
                  )}
                </div>

                {/* Info */}
                <div className="flex flex-1 flex-col gap-4 text-center sm:text-left">
                  <div className="flex flex-col gap-1">
                    <h1 className="font-bold text-2xl">{host.name}</h1>
                    {host.company ? (
                      <p className="text-muted-foreground">{host.company}</p>
                    ) : null}
                    <p className="text-muted-foreground text-sm">
                      Host since {formattedJoinDate}
                    </p>
                  </div>

                  <p className="text-muted-foreground">{host.bio}</p>

                  {/* Contact Buttons */}
                  {host.phone ? (
                    <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
                      <Button
                        asChild
                        className="gap-2"
                        size="sm"
                        variant="outline"
                      >
                        <a href={`tel:${host.phone}`}>
                          <Phone className="size-4" />
                          Call
                        </a>
                      </Button>
                      <Button
                        asChild
                        className="gap-2"
                        size="sm"
                        variant="outline"
                      >
                        <a
                          href={`https://wa.me/${host.phone.replace(/\D/g, "")}`}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          <MessageCircle className="size-4" />
                          WhatsApp
                        </a>
                      </Button>
                    </div>
                  ) : null}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Card>
              <CardContent className="flex flex-col items-center gap-1 pt-6">
                <Calendar className="size-6 text-muted-foreground" />
                <span className="font-bold text-2xl">
                  {host.stats.eventsHosted}
                </span>
                <span className="text-muted-foreground text-sm">
                  Events Hosted
                </span>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center gap-1 pt-6">
                <Users className="size-6 text-muted-foreground" />
                <span className="font-bold text-2xl">
                  {host.stats.totalAttendees}
                </span>
                <span className="text-muted-foreground text-sm">
                  Total Attendees
                </span>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center gap-1 pt-6">
                <Star className="size-6 text-yellow-500" />
                <span className="font-bold text-2xl">
                  {host.stats.avgRating}
                </span>
                <span className="text-muted-foreground text-sm">
                  Avg Rating
                </span>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center gap-1 pt-6">
                <Trophy className="size-6 text-green-500" />
                <span className="font-bold text-2xl">
                  {host.stats.repeatAttendees}%
                </span>
                <span className="text-muted-foreground text-sm">
                  Repeat Attendees
                </span>
              </CardContent>
            </Card>
          </div>

          {/* About */}
          {host.longBio ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">About {host.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {host.longBio}
                </p>
              </CardContent>
            </Card>
          ) : null}

          {/* Events */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Events by {host.name}</CardTitle>
              <CardDescription>
                Join one of {host.name.split(" ")[0]}'s upcoming events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {host.events.map((event) => (
                  <Link
                    className="block rounded-lg border p-4 transition-all hover:border-primary hover:shadow-md"
                    href={`/events/${event.id}`}
                    key={event.id}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold">{event.title}</span>
                        <div className="flex flex-wrap items-center gap-2 text-muted-foreground text-sm">
                          <span className="flex items-center gap-1">
                            <Calendar className="size-3" />
                            {event.day}s {event.time}
                          </span>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="size-3" />
                            {event.location}
                          </span>
                        </div>
                      </div>
                      <Badge variant="outline">
                        {event.spots.current}/{event.spots.total} spots
                      </Badge>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Testimonials */}
          {host.testimonials.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What Attendees Say</CardTitle>
                <CardDescription>
                  Reviews from people who've attended {host.name.split(" ")[0]}
                  's events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {host.testimonials.map((testimonial) => (
                    <div
                      className="flex flex-col gap-2 rounded-lg bg-muted/50 p-4"
                      key={testimonial.id}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              className={`size-4 ${
                                i < testimonial.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                              key={`star-${testimonial.id}-${i}`}
                            />
                          ))}
                        </div>
                        <span className="text-muted-foreground text-xs">
                          {new Date(testimonial.date).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </span>
                      </div>
                      <p className="text-sm">"{testimonial.text}"</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : null}
        </div>
      </div>
    </div>
  );
}
