"use client";

import { Trash2, UserPlus, Users } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

type Category = "private" | "social" | "public" | "infaq";

type SocialPerson = {
  id: string;
  email: string;
  hasMet: boolean;
};

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

const initialSocialPeople: SocialPerson[] = [
  { id: "1", email: "john.doe@example.com", hasMet: true },
  { id: "2", email: "jane.smith@company.com", hasMet: false },
  { id: "3", email: "alex.johnson@startup.io", hasMet: true },
];

export default function EditProfilePage() {
  const [items, setItems] = useState<QAItem[]>(initialItems);
  const [socialPeople, setSocialPeople] =
    useState<SocialPerson[]>(initialSocialPeople);
  const [newPersonEmail, setNewPersonEmail] = useState("");
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

  const handleAddPerson = () => {
    if (newPersonEmail.trim() && newPersonEmail.includes("@")) {
      const newPerson: SocialPerson = {
        id: Date.now().toString(),
        email: newPersonEmail.trim(),
        hasMet: false,
      };
      setSocialPeople((prev) => [...prev, newPerson]);
      setNewPersonEmail("");
    }
  };

  const handleDeletePerson = (id: string) => {
    setSocialPeople((prev) => prev.filter((person) => person.id !== id));
  };

  const handleToggleMet = (id: string, hasMet: boolean) => {
    setSocialPeople((prev) =>
      prev.map((person) => (person.id === id ? { ...person, hasMet } : person))
    );
  };

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

      {/* Social Circle Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="size-5" />
              Social Circle
            </CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline">
                  Manage People
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Manage Your Social Circle</DialogTitle>
                  <DialogDescription>
                    Add people you know and mark if you've met them in person.
                  </DialogDescription>
                </DialogHeader>

                {/* Add Person Form */}
                <div className="flex gap-2">
                  <div className="flex flex-1 flex-col gap-2">
                    <Label htmlFor="new-email">Email Address</Label>
                    <Input
                      id="new-email"
                      onChange={(e) => setNewPersonEmail(e.target.value)}
                      placeholder="person@company.com"
                      type="email"
                      value={newPersonEmail}
                    />
                  </div>
                  <Button
                    className="gap-2 self-end"
                    onClick={handleAddPerson}
                    size="sm"
                  >
                    <UserPlus className="size-4" />
                    Add
                  </Button>
                </div>

                {/* People List */}
                <div className="grid max-h-96 gap-3 overflow-y-auto">
                  {socialPeople.length === 0 ? (
                    <div className="flex flex-col items-center gap-2 py-8 text-center text-muted-foreground">
                      <Users className="size-12 opacity-20" />
                      <p>No people in your social circle yet</p>
                      <p className="text-sm">
                        Add someone using the form above
                      </p>
                    </div>
                  ) : (
                    socialPeople.map((person) => (
                      <Card key={person.id}>
                        <CardContent className="flex items-center justify-between gap-4 p-4">
                          <div className="flex flex-1 flex-col gap-1">
                            <span className="font-medium text-sm">
                              {person.email}
                            </span>
                            <RadioGroup
                              onValueChange={(value) =>
                                handleToggleMet(person.id, value === "met")
                              }
                              value={person.hasMet ? "met" : "not-met"}
                            >
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                  <RadioGroupItem
                                    id={`${person.id}-not-met`}
                                    value="not-met"
                                  />
                                  <Label
                                    className="text-xs"
                                    htmlFor={`${person.id}-not-met`}
                                  >
                                    Not Met
                                  </Label>
                                </div>
                                <div className="flex items-center gap-2">
                                  <RadioGroupItem
                                    id={`${person.id}-met`}
                                    value="met"
                                  />
                                  <Label
                                    className="text-xs"
                                    htmlFor={`${person.id}-met`}
                                  >
                                    Met
                                  </Label>
                                </div>
                              </div>
                            </RadioGroup>
                          </div>
                          <Button
                            onClick={() => handleDeletePerson(person.id)}
                            size="sm"
                            variant="ghost"
                          >
                            <Trash2 className="size-4 text-destructive" />
                          </Button>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground text-sm">
              {socialPeople.length}{" "}
              {socialPeople.length === 1 ? "person" : "people"} in your social
              circle
            </p>
            <p className="text-muted-foreground text-sm">
              {socialPeople.filter((p) => p.hasMet).length} met in person
            </p>
          </div>
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
        isDraggedOver ? "border-4 border-primary" : "border"
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
        {isPlaceholder ? (
          <div className="flex h-full items-center justify-center rounded-md border border-dashed p-4 text-center text-muted-foreground text-sm opacity-50">
            Drop questions here
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
