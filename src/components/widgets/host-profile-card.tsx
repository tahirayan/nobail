"use client";

import { ExternalLink, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HostAvatar } from "@/components/widgets/host-avatar";
import type { Host } from "@/types/events";

type HostProfileCardProps = {
  host: Host;
  showContact?: boolean;
};

export const HostProfileCard = ({
  host,
  showContact = false,
}: HostProfileCardProps) => {
  const hostSlug = host.name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Your Host</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <HostAvatar avatar={host.avatar} name={host.name} size="lg" />
          <div className="flex flex-col gap-1">
            <Link
              className="flex items-center gap-2 font-semibold hover:underline"
              href={`/hosts/${hostSlug}`}
            >
              {host.name}
              <ExternalLink className="size-3" />
            </Link>
            {host.company ? (
              <span className="text-muted-foreground text-sm">
                {host.company}
              </span>
            ) : null}
          </div>
        </div>

        {host.bio ? (
          <p className="text-muted-foreground text-sm">{host.bio}</p>
        ) : null}

        {showContact === true && host.phone ? (
          <div className="flex flex-col gap-2">
            <span className="font-medium text-sm">Contact</span>
            <div className="flex flex-wrap gap-2">
              <Button asChild className="gap-2" size="sm" variant="outline">
                <a href={`tel:${host.phone}`}>
                  <Phone className="size-4" />
                  Call
                </a>
              </Button>
              <Button asChild className="gap-2" size="sm" variant="outline">
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
            <span className="text-muted-foreground text-xs">{host.phone}</span>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};
