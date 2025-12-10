"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Verified, Linkedin, Instagram, Eye, Users, Handshake } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { useSearchParams } from 'next/navigation';
import { Suspense } from "react";

// Initial Q&A data (same as in edit profile)
const allQAItems = [
  { id: "1", category: "private", question: "Pettiest reason you've disliked someone?", answer: "Because they hated data tables." },
  { id: "2", category: "private", question: "Fictional character you relate to?", answer: "Spock: logical, but curious about emotions." },
  { id: "3", category: "social", question: "Most random compliment?", answer: "You look like you know how to explain Wi-Fi." },
  { id: "4", category: "social", question: "Secret nickname?", answer: "Spreadsheet Samurai." },
  { id: "5", category: "public", question: "Most watched TV show last year?", answer: "Barbie" },
  { id: "6", category: "public", question: "Your most watched movie last year?", answer: "Peaky Blinders" },
];

function PreviewContent() {
  const searchParams = useSearchParams();
  const initialView = searchParams.get('view') || 'public';

  return (
    <Tabs defaultValue={initialView} className="w-full">
      <TabsList className="grid w-full grid-cols-3 h-auto p-1">
        <TabsTrigger value="public" className="py-2 gap-2">
          <Eye className="size-4" /> Public (Strangers)
        </TabsTrigger>
        <TabsTrigger value="social" className="py-2 gap-2">
          <Users className="size-4" /> Social Circle
        </TabsTrigger>
        <TabsTrigger value="after-meet" className="py-2 gap-2">
          <Handshake className="size-4" /> After Meet
        </TabsTrigger>
      </TabsList>

      <TabsContent value="public" className="mt-6">
        <ProfileView mode="public" />
      </TabsContent>
      <TabsContent value="social" className="mt-6">
        <ProfileView mode="social" />
      </TabsContent>
      <TabsContent value="after-meet" className="mt-6">
        <ProfileView mode="after-meet" />
      </TabsContent>
    </Tabs>
  );
}

export default function PreviewProfilePage() {
  return (
    <div className="container max-w-4xl mx-auto py-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Profile Preview</h1>
          <Link href="/dashboard/profile" className="text-sm text-muted-foreground hover:underline">
            Back to Edit
          </Link>
        </div>

        <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Loading preview...</div>}>
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
  const publicQA = allQAItems.filter(item => item.category === "public");
  const socialQA = allQAItems.filter(item => item.category === "social");
  const infaqQA = allQAItems.filter(item => item.category === "infaq");

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Primary Profile Column */}
      <Card className="md:col-span-1 h-fit sticky top-4">
        <CardHeader className="flex flex-col gap-4">
          <div className={isPublicMode ? "blur-sm select-none opacity-50" : ""}>
            <CardTitle className="text-4xl font-bold flex items-center gap-2">
              Hamza Khan
              <Verified className="size-6 text-blue-500" />
            </CardTitle>
          </div>
          {isPublicMode && (
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
              <Badge variant="destructive" className="shadow-lg text-lg px-4 py-2">
                Identity Hidden
              </Badge>
            </div>
          )}
          
          <div className={`flex gap-2 ${isPublicMode ? "blur-sm opacity-50" : ""}`}>
            <Badge variant="secondary" className="gap-1">
              <Linkedin className="size-3" /> LinkedIn
            </Badge>
            <Badge variant="secondary" className="gap-1">
              <Instagram className="size-3" /> Instagram
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className={`grid gap-3 ${isPublicMode ? "blur-sm opacity-50" : ""}`}>
            <div className="flex justify-between gap-2 items-center">
              <Label className="text-muted-foreground">Company</Label>
              <span className="font-medium">Wise</span>
            </div>
            <div className="flex justify-between gap-2 items-center">
              <Label className="text-muted-foreground">Role</Label>
              <span className="font-medium">KYC Operations</span>
            </div>
            <div className="flex justify-between gap-2 items-center">
              <Label className="text-muted-foreground">Education</Label>
              <span className="font-medium">EBS (Tallinn)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Q&A Column */}
      <div className="md:col-span-2 flex flex-col gap-6">
        {/* Public Q&A */}
        <section className="flex flex-col gap-4">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <Eye className="size-5 text-green-600" /> Public Q&A
            <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">Visible to Everyone</Badge>
          </h3>
          <div className="grid gap-4">
            {publicQA.map(item => (
                <Card key={item.id} className="p-4 border-l-4 border-l-green-500">
                    <p className="font-medium">{item.question}</p>
                    <p className="text-muted-foreground mt-1">{item.answer}</p>
                </Card>
            ))}
          </div>
        </section>

        {/* Social Q&A */}
        {showSocialQA ? (
          <section className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Users className="size-5 text-blue-600" /> Social Circle Q&A
              <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">Visible to Friends</Badge>
            </h3>
            <div className="grid gap-4">
              {socialQA.map(item => (
                <Card key={item.id} className="p-4 border-l-4 border-l-blue-500">
                    <p className="font-medium">{item.question}</p>
                    <p className="text-muted-foreground mt-1">{item.answer}</p>
                </Card>
              ))}
            </div>
          </section>
        ) : (
          <div className="p-8 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-muted-foreground gap-2 bg-gray-50">
            <Users className="size-8 opacity-20" />
            <p>Social Circle Q&A Hidden</p>
          </div>
        )}

        {/* InFAQ / After Meet */}
        {showInFAQQA ? (
          <section className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Handshake className="size-5 text-yellow-600" /> InFAQ
              <Badge variant="outline" className="text-yellow-600 border-yellow-200 bg-yellow-50">Visible After Meeting</Badge>
            </h3>
            <div className="grid gap-4">
              {infaqQA.length > 0 ? infaqQA.map(item => (
                <Card key={item.id} className="p-4 border-l-4 border-l-yellow-500">
                    <p className="font-medium">{item.question}</p>
                    <p className="text-muted-foreground mt-1">{item.answer}</p>
                </Card>
              )) : (
                 <Card key="infaq-placeholder" className="p-4 border-l-4 border-l-yellow-500 bg-yellow-50/50">
                    <p className="font-medium text-muted-foreground">No InFAQ items yet. Drag them from Edit Profile!</p>
                </Card>
              )}
            </div>
          </section>
        ) : (
           <div className="p-8 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-muted-foreground gap-2 bg-gray-50">
            <Handshake className="size-8 opacity-20" />
            <p>InFAQ Hidden (Requires Meeting)</p>
          </div>
        )}
      </div>
    </div>
  );
}
