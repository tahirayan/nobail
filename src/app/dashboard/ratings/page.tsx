"use client";

import { Calendar, MapPin, MessageSquare, Star, ThumbsUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Rating = {
  id: string;
  venue: string;
  date: string;
  rating: number;
  foodRating: number;
  drinksRating: number;
  atmosphereRating: number;
  comment?: string;
};

const RATINGS: Rating[] = [
  {
    id: "1",
    venue: "NoKu",
    date: "2024-12-05",
    rating: 5,
    foodRating: 5,
    drinksRating: 4,
    atmosphereRating: 5,
    comment: "Amazing atmosphere and great food. Will definitely come back!",
  },
  {
    id: "2",
    venue: "F-Hoone",
    date: "2024-11-28",
    rating: 4,
    foodRating: 4,
    drinksRating: 4,
    atmosphereRating: 4,
    comment: "Good industrial vibes, interesting crowd.",
  },
  {
    id: "3",
    venue: "Levier",
    date: "2024-11-20",
    rating: 4,
    foodRating: 5,
    drinksRating: 3,
    atmosphereRating: 4,
  },
];

const PENDING_RATINGS = [
  {
    id: "p1",
    venue: "Põhjala",
    date: "2024-12-08",
    eventName: "Table at a Time",
  },
];

const StarRating = ({
  rating,
  size = "sm",
}: {
  rating: number;
  size?: "sm" | "md";
}) => {
  const sizeClass = size === "sm" ? "size-4" : "size-5";
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          className={`${sizeClass} ${
            star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"
          }`}
          key={star}
        />
      ))}
    </div>
  );
};

const RatingCard = ({ rating }: { rating: Rating }) => (
  <Card>
    <CardHeader className="pb-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <CardTitle className="text-lg">{rating.venue}</CardTitle>
          <CardDescription className="flex items-center gap-1.5">
            <Calendar className="size-3" />
            {new Date(rating.date).toLocaleDateString()}
          </CardDescription>
        </div>
        <StarRating rating={rating.rating} size="md" />
      </div>
    </CardHeader>
    <CardContent className="grid gap-4">
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground text-xs">Food</span>
          <StarRating rating={rating.foodRating} />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground text-xs">Drinks</span>
          <StarRating rating={rating.drinksRating} />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground text-xs">Atmosphere</span>
          <StarRating rating={rating.atmosphereRating} />
        </div>
      </div>

      {rating.comment ? (
        <div className="flex gap-2 rounded-lg bg-muted/50 p-3">
          <MessageSquare className="size-4 shrink-0 text-muted-foreground" />
          <p className="text-sm">{rating.comment}</p>
        </div>
      ) : null}
    </CardContent>
  </Card>
);

export default function RatingsPage() {
  const averageRating =
    RATINGS.reduce((acc, r) => acc + r.rating, 0) / RATINGS.length;

  return (
    <div className="grid gap-6">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <h1 className="flex items-center gap-3 font-bold text-3xl">
          <Star className="size-8 fill-yellow-400 text-yellow-400" />
          Ratings
        </h1>
        <p className="text-muted-foreground">
          Your venue ratings help us personalize your NoBail Prize rewards
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="font-medium text-sm">Total Ratings</CardTitle>
            <Star className="size-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{RATINGS.length}</div>
            <p className="text-muted-foreground text-xs">venues rated</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="font-medium text-sm">
              Average Rating
            </CardTitle>
            <ThumbsUp className="size-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{averageRating.toFixed(1)}</div>
            <StarRating rating={Math.round(averageRating)} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="font-medium text-sm">Pending</CardTitle>
            <MapPin className="size-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{PENDING_RATINGS.length}</div>
            <p className="text-muted-foreground text-xs">to be rated</p>
          </CardContent>
        </Card>
      </div>

      {/* Pending Ratings */}
      {PENDING_RATINGS.length > 0 && (
        <Card className="border-orange-200 bg-orange-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-700">
              <Star className="size-5" />
              Rate Your Recent Visits
            </CardTitle>
            <CardDescription>
              Help us improve your rewards by rating venues you've visited
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {PENDING_RATINGS.map((pending) => (
              <div
                className="flex items-center justify-between rounded-lg bg-white p-4"
                key={pending.id}
              >
                <div>
                  <h4 className="font-semibold">{pending.venue}</h4>
                  <p className="text-muted-foreground text-sm">
                    {pending.eventName} ·{" "}
                    {new Date(pending.date).toLocaleDateString()}
                  </p>
                </div>
                <Button size="sm" variant="outline">
                  Rate Now
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Ratings List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Ratings</CardTitle>
          <CardDescription>
            All venues you've rated after attending meetups
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs className="flex flex-col gap-4" defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All ({RATINGS.length})</TabsTrigger>
              <TabsTrigger value="high">
                4+ Stars ({RATINGS.filter((r) => r.rating >= 4).length})
              </TabsTrigger>
            </TabsList>

            <TabsContent className="grid gap-4" value="all">
              {RATINGS.map((rating) => (
                <RatingCard key={rating.id} rating={rating} />
              ))}
            </TabsContent>

            <TabsContent className="grid gap-4" value="high">
              {RATINGS.filter((r) => r.rating >= 4).map((rating) => (
                <RatingCard key={rating.id} rating={rating} />
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Info */}
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center gap-4 py-4 text-center">
          <Badge variant="secondary">Why Rate?</Badge>
          <p className="max-w-md text-muted-foreground text-sm">
            Your ratings help us understand your preferences. When you earn a
            NoBail Prize, we'll give you a reward at a venue you've enjoyed,
            featuring food or drinks you've loved!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
