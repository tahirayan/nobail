"use client";

import {
  Eye,
  Handshake,
  Instagram,
  Linkedin,
  Users,
  Verified,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Initial Q&A data (same as in edit profile)
const allQAItems = [
  {
    id: "1",
    category: "private",
    question: "Pettiest reason you've disliked someone?",
    answer: "Because they hated data tables.",
  },
  {
    id: "2",
    category: "private",
    question: "Fictional character you relate to?",
    answer: "Spock: logical, but curious about emotions.",
  },
  {
    id: "3",
    category: "social",
    question: "Most random compliment?",
    answer: "You look like you know how to explain Wi-Fi.",
  },
  {
    id: "4",
    category: "social",
    question: "Secret nickname?",
    answer: "Spreadsheet Samurai.",
  },
  {
    id: "5",
    category: "public",
    question: "Most watched TV show last year?",
    answer: "Barbie",
  },
  {
    id: "6",
    category: "public",
    question: "Your most watched movie last year?",
    answer: "Peaky Blinders",
  },
];

function PreviewContent() {
  const searchParams = useSearchParams();
  const initialView = searchParams.get("view") || "public";

  return (
    <Tabs className="flex w-full flex-col gap-6" defaultValue={initialView}>
      <TabsList className="grid h-auto w-full grid-cols-3 p-1">
        <TabsTrigger className="gap-2 py-2" value="public">
          <Eye className="size-4" /> Public (Strangers)
        </TabsTrigger>
        <TabsTrigger className="gap-2 py-2" value="social">
          <Users className="size-4" /> Social Circle
        </TabsTrigger>
        <TabsTrigger className="gap-2 py-2" value="after-meet">
          <Handshake className="size-4" /> After Meet
        </TabsTrigger>
      </TabsList>

      <TabsContent value="public">
        <ProfileView mode="public" />
      </TabsContent>
      <TabsContent value="social">
        <ProfileView mode="social" />
      </TabsContent>
      <TabsContent value="after-meet">
        <ProfileView mode="after-meet" />
      </TabsContent>
    </Tabs>
  );
}

export default function PreviewProfilePage() {
  return (
    <div className="container max-w-4xl py-4">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-3xl">Profile Preview</h1>
          <Link
            className="text-muted-foreground text-sm hover:underline"
            href="/dashboard/profile"
          >
            Back to Edit
          </Link>
        </div>

        <Suspense
          fallback={
            <div className="p-8 text-center text-muted-foreground">
              Loading preview...
            </div>
          }
        >
          <PreviewContent />
        </Suspense>
      </div>
    </div>
  );
}

function ProfileView({ mode }: { mode: "public" | "social" | "after-meet" }) {
  const isPublicMode = mode === "public";
  const showSocialQA = mode === "social" || mode === "after-meet";
  const showInFAQQA = mode === "after-meet"; // InFAQ only shown in 'After Meet' for now

  // Filter Q&A items based on mode
  const publicQA = allQAItems.filter((item) => item.category === "public");
  const socialQA = allQAItems.filter((item) => item.category === "social");
  const infaqQA = allQAItems.filter((item) => item.category === "infaq");

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {/* Primary Profile Column */}
      <Card className="sticky top-4 h-fit md:col-span-1">
        <CardHeader className="flex flex-col gap-4">
          <div className={isPublicMode ? "select-none opacity-50 blur-sm" : ""}>
            <CardTitle className="flex items-center gap-2 font-bold text-4xl">
              Hamza Khan
              <Verified className="size-6 text-blue-500" />
            </CardTitle>
          </div>
          {isPublicMode ? (
            <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
              <Badge
                className="px-4 py-2 text-lg shadow-lg"
                variant="destructive"
              >
                Identity Hidden
              </Badge>
            </div>
          ) : null}

          <div
            className={`flex gap-2 ${isPublicMode ? "opacity-50 blur-sm" : ""}`}
          >
            <Badge className="gap-1" variant="secondary">
              <Linkedin className="size-3" /> LinkedIn
            </Badge>
            <Badge className="gap-1" variant="secondary">
              <Instagram className="size-3" /> Instagram
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div
            className={`grid gap-3 ${isPublicMode ? "opacity-50 blur-sm" : ""}`}
          >
            <div className="flex items-center justify-between gap-2">
              <Label className="text-muted-foreground">Company</Label>
              <span className="font-medium">Wise</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <Label className="text-muted-foreground">Role</Label>
              <span className="font-medium">KYC Operations</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <Label className="text-muted-foreground">Education</Label>
              <span className="font-medium">EBS (Tallinn)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Q&A Column */}
      <div className="flex flex-col gap-6 md:col-span-2">
        {/* Public Q&A */}
        <section className="flex flex-col gap-4">
          <h3 className="flex items-center gap-2 font-semibold text-lg">
            <Eye className="size-5 text-green-600" /> Public Q&A
            <Badge
              className="border-green-200 bg-green-50 text-green-600"
              variant="outline"
            >
              Visible to Everyone
            </Badge>
          </h3>
          <div className="grid gap-4">
            {publicQA.map((item) => (
              <Card
                className="flex flex-col gap-1 border-l-4 border-l-green-500 p-4"
                key={item.id}
              >
                <p className="font-medium">{item.question}</p>
                <p className="text-muted-foreground">{item.answer}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Social Q&A */}
        {showSocialQA ? (
          <section className="fade-in slide-in-from-bottom-4 flex animate-in flex-col gap-4 duration-500">
            <h3 className="flex items-center gap-2 font-semibold text-lg">
              <Users className="size-5 text-blue-600" /> Social Circle Q&A
              <Badge
                className="border-blue-200 bg-blue-50 text-blue-600"
                variant="outline"
              >
                Visible to Friends
              </Badge>
            </h3>
            <div className="grid gap-4">
              {socialQA.map((item) => (
                <Card
                  className="flex flex-col gap-1 border-l-4 border-l-blue-500 p-4"
                  key={item.id}
                >
                  <p className="font-medium">{item.question}</p>
                  <p className="text-muted-foreground">{item.answer}</p>
                </Card>
              ))}
            </div>
          </section>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed bg-gray-50 p-8 text-muted-foreground">
            <Users className="size-8 opacity-20" />
            <p>Social Circle Q&A Hidden</p>
          </div>
        )}

        {/* InFAQ / After Meet */}
        {showInFAQQA ? (
          <section className="fade-in slide-in-from-bottom-4 flex animate-in flex-col gap-4 delay-100 duration-500">
            <h3 className="flex items-center gap-2 font-semibold text-lg">
              <Handshake className="size-5 text-yellow-600" /> InFAQ
              <Badge
                className="border-yellow-200 bg-yellow-50 text-yellow-600"
                variant="outline"
              >
                Visible After Meeting
              </Badge>
            </h3>
            <div className="grid gap-4">
              {infaqQA.length > 0 ? (
                infaqQA.map((item) => (
                  <Card
                    className="flex flex-col gap-1 border-l-4 border-l-yellow-500 p-4"
                    key={item.id}
                  >
                    <p className="font-medium">{item.question}</p>
                    <p className="text-muted-foreground">{item.answer}</p>
                  </Card>
                ))
              ) : (
                <Card
                  className="border-l-4 border-l-yellow-500 bg-yellow-50/50 p-4"
                  key="infaq-placeholder"
                >
                  <p className="font-medium text-muted-foreground">
                    No InFAQ items yet. Drag them from Edit Profile!
                  </p>
                </Card>
              )}
            </div>
          </section>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed bg-gray-50 p-8 text-muted-foreground">
            <Handshake className="size-8 opacity-20" />
            <p>InFAQ Hidden (Requires Meeting)</p>
          </div>
        )}
      </div>
    </div>
  );
}
