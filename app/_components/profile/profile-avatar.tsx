"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";

function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ""}${parts[parts.length - 1][0] ?? ""}`.toUpperCase();
}

export function ProfileAvatar({
  imageUrl,
  displayName,
}: {
  imageUrl: string | null;
  displayName: string;
}) {
  return (
    <Avatar
      className="size-[72px] shrink-0 ring-2 ring-neutral-100 after:border-neutral-100"
    >
      {imageUrl ? (
        <AvatarImage src={imageUrl} alt="" referrerPolicy="no-referrer" />
      ) : null}
      <AvatarFallback className="bg-neutral-200 text-xl font-bold text-neutral-600">
        {initialsFromName(displayName)}
      </AvatarFallback>
    </Avatar>
  );
}
