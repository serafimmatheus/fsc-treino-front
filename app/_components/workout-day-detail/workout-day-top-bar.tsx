"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/app/_components/ui/button";

export function WorkoutDayTopBar() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-card/95 px-2 py-2 backdrop-blur-md supports-backdrop-filter:bg-card/80">
      <div className="mx-auto flex max-w-lg items-center">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="rounded-xl"
          aria-label="Voltar"
          onClick={() => router.back()}
        >
          <ArrowLeft className="size-6" strokeWidth={1.75} />
        </Button>
      </div>
    </header>
  );
}
