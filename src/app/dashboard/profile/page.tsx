"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link"; // Assuming Link is needed for preview buttons

type Category = "private" | "social" | "public" | "infaq";

type QAItem = {
  id: string;
  category: Category;
  question: string;
  answer: string;
};

const initialItems: QAItem[] = [
  { id: "1", category: "private", question: "Pettiest reason you've disliked someone?", answer: "Because they hated data tables." },
  { id: "2", category: "private", question: "Fictional character you relate to?", answer: "Spock: logical, but curious about emotions." },
  { id: "3", category: "social", question: "Most random compliment?", answer: "You look like you know how to explain Wi-Fi." },
  { id: "4", category: "social", question: "Secret nickname?", answer: "Spreadsheet Samurai." },
  { id: "5", category: "public", question: "Most watched TV show last year?", answer: "Peaky Blinders" },
  { id: "6", category: "public", question: "Your most watched movie last year?", answer: "Barbie" },
];

export default function EditProfilePage() {
  const [items, setItems] = useState<QAItem[]>(initialItems);
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  const [dragOverCategory, setDragOverCategory] = useState<Category | null>(null);

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
    <div className="flex flex-col gap-6 w-full p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Edit Profile</h1>
        <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/dashboard/profile/preview?view=public">Preview Public</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/dashboard/profile/preview?view=social">Preview Social</Link>
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
                <Input id="name" defaultValue="Hamza Khan" />
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" defaultValue="Wise" />
            </div>
            {/* Add other fields... */}
        </CardContent>
      </Card>

      {/* Q&A Categories Side-by-Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-full min-h-[500px]">
        {/* Private Column */}
        <DropZone 
          title="Private" 
          category="private" 
          badge="Only You" 
          items={getItemsByCategory("private")}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragEnter={() => handleDragEnter("private")}
          onDragLeave={handleDragLeave}
          bgColor="bg-slate-50/50"
          isDraggedOver={dragOverCategory === "private"}
          draggedItemId={draggedItemId}
        />

        {/* Social Column */}
        <DropZone 
          title="Social Circle" 
          category="social" 
          badge="Friends" 
          badgeColor="bg-blue-100 text-blue-800"
          items={getItemsByCategory("social")}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragEnter={() => handleDragEnter("social")}
          onDragLeave={handleDragLeave}
          bgColor="bg-blue-50/30"
          isDraggedOver={dragOverCategory === "social"}
          draggedItemId={draggedItemId}
        />

        {/* Public Column */}
        <DropZone 
          title="Public" 
          category="public" 
          badge="Everyone" 
          badgeColor="bg-green-100 text-green-800"
          items={getItemsByCategory("public")}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragEnter={() => handleDragEnter("public")}
          onDragLeave={handleDragLeave}
          bgColor="bg-green-50/30"
          isDraggedOver={dragOverCategory === "public"}
          draggedItemId={draggedItemId}
        />

         {/* InFAQ Column */}
        <DropZone 
          title="InFAQ" 
          category="infaq" 
          badge="Expats" 
          badgeColor="bg-yellow-100 text-yellow-800"
          items={getItemsByCategory("infaq")}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragEnter={() => handleDragEnter("infaq")}
          onDragLeave={handleDragLeave}
          bgColor="bg-yellow-50/30"
          isDraggedOver={dragOverCategory === "infaq"}
          draggedItemId={draggedItemId}
          isPlaceholder={items.filter(i => i.category === 'infaq').length === 0}
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
  isPlaceholder
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
        `flex flex-col h-full ${bgColor} transition-colors duration-200`,
        isDraggedOver ? "border-primary border-4" : "border-2"
      )}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, category)}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
    >
        <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center justify-between">
                {title}
                <Badge variant="secondary" className={badgeColor}>{badge}</Badge>
            </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col gap-3 min-h-[200px] p-4">
            {items.map((item) => (
                <Card 
                    key={item.id} 
                    draggable 
                    onDragStart={(e) => onDragStart(e, item.id)}
                    onDragEnd={onDragEnd}
                    className={cn(
                      "p-3 cursor-move hover:border-primary active:cursor-grabbing hover:shadow-md transition-all",
                      draggedItemId === item.id ? "opacity-50 border-4 border-blue-500" : "opacity-100"
                    )}
                >
                    <p className="font-medium text-sm">{item.question}</p>
                    <p className="text-xs text-muted-foreground">{item.answer}</p>
                </Card>
            ))}
            {isPlaceholder && (
                 <div className="border-2 border-dashed rounded-md p-4 text-center text-sm text-muted-foreground h-full flex items-center justify-center opacity-50">
                    Drop questions here
                </div>
            )}
        </CardContent>
    </Card>
  );
}