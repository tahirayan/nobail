"use client";

import Link from "next/link"; // Assuming Link is needed for preview buttons
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type Category = "private" | "social" | "public" | "infaq";

type QAItem = {
  id: string;
  category: Category;
  question: string;
  answer: string;
};

const initialItems: QAItem[] = [
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
    answer: "Peaky Blinders",
  },
  {
    id: "6",
    category: "public",
    question: "Your most watched movie last year?",
    answer: "Barbie",
  },
];

export default function EditProfilePage() {
  const [items, setItems] = useState<QAItem[]>(initialItems);
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  const [dragOverCategory, setDragOverCategory] = useState<Category | null>(
    null
  );

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedItemId(id);
    e.dataTransfer.setData("text/plain", id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, targetCategory: Category) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");

    if (id) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, category: targetCategory } : item
        )
      );
    }
    setDraggedItemId(null);
    setDragOverCategory(null);
  };

  const handleDragEnd = () => {
    setDraggedItemId(null);
    setDragOverCategory(null);
  };

  const handleDragEnter = (category: Category) => {
    setDragOverCategory(category);
  };

  const handleDragLeave = () => {
    setDragOverCategory(null);
  };

  const getItemsByCategory = (category: Category) =>
    items.filter((item) => item.category === category);

  return (
    <div className="flex w-full flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-3xl">Edit Profile</h1>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href="/dashboard/profile/preview?view=public">
              Preview Public
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/dashboard/profile/preview?view=social">
              Preview Social
            </Link>
          </Button>
          <Button>Save Changes</Button>
        </div>
      </div>

      {/* Primary Profile Section (Simplified for Edit) */}
      <Card>
        <CardHeader>
          <CardTitle>Primary Profile</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input defaultValue="Hamza Khan" id="name" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="company">Company</Label>
            <Input defaultValue="Wise" id="company" />
          </div>
          {/* Add other fields... */}
        </CardContent>
      </Card>

      {/* Q&A Categories Side-by-Side */}
      <div className="grid h-full min-h-[500px] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Private Column */}
        <DropZone
          badge="Only You"
          bgColor="bg-slate-50/50"
          category="private"
          draggedItemId={draggedItemId}
          isDraggedOver={dragOverCategory === "private"}
          items={getItemsByCategory("private")}
          onDragEnd={handleDragEnd}
          onDragEnter={() => handleDragEnter("private")}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDragStart={handleDragStart}
          onDrop={handleDrop}
          title="Private"
        />

        {/* Social Column */}
        <DropZone
          badge="Friends"
          badgeColor="bg-blue-100 text-blue-800"
          bgColor="bg-blue-50/30"
          category="social"
          draggedItemId={draggedItemId}
          isDraggedOver={dragOverCategory === "social"}
          items={getItemsByCategory("social")}
          onDragEnd={handleDragEnd}
          onDragEnter={() => handleDragEnter("social")}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDragStart={handleDragStart}
          onDrop={handleDrop}
          title="Social Circle"
        />

        {/* Public Column */}
        <DropZone
          badge="Everyone"
          badgeColor="bg-green-100 text-green-800"
          bgColor="bg-green-50/30"
          category="public"
          draggedItemId={draggedItemId}
          isDraggedOver={dragOverCategory === "public"}
          items={getItemsByCategory("public")}
          onDragEnd={handleDragEnd}
          onDragEnter={() => handleDragEnter("public")}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDragStart={handleDragStart}
          onDrop={handleDrop}
          title="Public"
        />

        {/* InFAQ Column */}
        <DropZone
          badge="Expats"
          badgeColor="bg-yellow-100 text-yellow-800"
          bgColor="bg-yellow-50/30"
          category="infaq"
          draggedItemId={draggedItemId}
          isDraggedOver={dragOverCategory === "infaq"}
          isPlaceholder={
            items.filter((i) => i.category === "infaq").length === 0
          }
          items={getItemsByCategory("infaq")}
          onDragEnd={handleDragEnd}
          onDragEnter={() => handleDragEnter("infaq")}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDragStart={handleDragStart}
          onDrop={handleDrop}
          title="InFAQ"
        />
      </div>
    </div>
  );
}

function DropZone({
  title,
  category,
  badge,
  badgeColor,
  items,
  onDragOver,
  onDrop,
  onDragStart,
  onDragEnd,
  onDragEnter,
  onDragLeave,
  bgColor,
  isDraggedOver,
  draggedItemId,
  isPlaceholder,
}: {
  title: string;
  category: Category;
  badge: string;
  badgeColor?: string;
  items: QAItem[];
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, category: Category) => void;
  onDragStart: (e: React.DragEvent, id: string) => void;
  onDragEnd: () => void;
  onDragEnter: () => void;
  onDragLeave: () => void;
  bgColor: string;
  isDraggedOver: boolean;
  draggedItemId: string | null;
  isPlaceholder?: boolean;
}) {
  return (
    <Card
      className={cn(
        `flex h-full flex-col ${bgColor} transition-colors duration-200`,
        isDraggedOver ? "border-4 border-primary" : "border-2"
      )}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, category)}
    >
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-lg">
          {title}
          <Badge className={badgeColor} variant="secondary">
            {badge}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex min-h-[200px] flex-1 flex-col gap-3 p-4">
        {items.map((item) => (
          <Card
            className={cn(
              "cursor-move p-3 transition-all hover:border-primary hover:shadow-md active:cursor-grabbing",
              draggedItemId === item.id
                ? "border-4 border-blue-500 opacity-50"
                : "opacity-100"
            )}
            draggable
            key={item.id}
            onDragEnd={onDragEnd}
            onDragStart={(e) => onDragStart(e, item.id)}
          >
            <p className="font-medium text-sm">{item.question}</p>
            <p className="text-muted-foreground text-xs">{item.answer}</p>
          </Card>
        ))}
        {isPlaceholder && (
          <div className="flex h-full items-center justify-center rounded-md border-2 border-dashed p-4 text-center text-muted-foreground text-sm opacity-50">
            Drop questions here
          </div>
        )}
      </CardContent>
    </Card>
  );
}
