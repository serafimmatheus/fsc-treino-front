"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Calendar, Home, Sparkles, User } from "lucide-react";
import { Button } from "@/app/_components/ui/button";

interface BottomNavInnerProps {
  calendarHref: string;
}

export function BottomNavInner({ calendarHref }: BottomNavInnerProps) {
  const pathname = usePathname() ?? "";
  const isHome = pathname === "/";
  const isStats = pathname === "/stats";
  const isCalendar = pathname.startsWith("/workout-plans/");

  return (
    <div className="flex max-w-lg mx-auto items-end justify-between px-1">
      <Button
        variant="ghost"
        className={
          isHome
            ? "h-auto min-h-12 flex-1 rounded-xl py-2 text-foreground hover:bg-muted/60 hover:text-foreground"
            : "h-auto min-h-12 flex-1 rounded-xl py-2 text-muted-foreground hover:bg-muted/60"
        }
        asChild
      >
        <Link href="/" aria-current={isHome ? "page" : undefined} aria-label="Início">
          <Home className="size-7" strokeWidth={1.75} />
        </Link>
      </Button>
      {calendarHref === "#" ? (
        <Button
          type="button"
          variant="ghost"
          className={
            isCalendar
              ? "h-auto min-h-12 flex-1 rounded-xl py-2 text-foreground hover:bg-muted/60 hover:text-foreground"
              : "h-auto min-h-12 flex-1 rounded-xl py-2 text-muted-foreground hover:bg-muted/60"
          }
          aria-label="Calendário"
          disabled
        >
          <Calendar className="size-7" strokeWidth={1.75} />
        </Button>
      ) : (
        <Button
          variant="ghost"
          className={
            isCalendar
              ? "h-auto min-h-12 flex-1 rounded-xl py-2 text-foreground hover:bg-muted/60 hover:text-foreground"
              : "h-auto min-h-12 flex-1 rounded-xl py-2 text-muted-foreground hover:bg-muted/60"
          }
          asChild
        >
          <Link href={calendarHref} aria-label="Calendário" prefetch={false}>
            <Calendar className="size-7" strokeWidth={1.75} />
          </Link>
        </Button>
      )}
      <div className="flex flex-1 flex-col items-center justify-end -mt-5">
        <Button
          variant="default"
          size="icon-lg"
          className="size-14 shrink-0 rounded-full shadow-lg [&_svg:not([class*='size-'])]:size-7"
          aria-label="Ação principal"
        >
          <Sparkles className="size-7" strokeWidth={2} />
        </Button>
      </div>
      <Button
        variant="ghost"
        className={
          isStats
            ? "h-auto min-h-12 flex-1 rounded-xl py-2 text-foreground hover:bg-muted/60 hover:text-foreground"
            : "h-auto min-h-12 flex-1 rounded-xl py-2 text-muted-foreground hover:bg-muted/60"
        }
        asChild
      >
        <Link
          href="/stats"
          aria-current={isStats ? "page" : undefined}
          aria-label="Estatísticas"
        >
          <BarChart3 className="size-7" strokeWidth={1.75} />
        </Link>
      </Button>
      <Button
        variant="ghost"
        className="h-auto min-h-12 flex-1 rounded-xl py-2 text-muted-foreground hover:bg-muted/60"
        aria-label="Perfil"
      >
        <User className="size-7" strokeWidth={1.75} />
      </Button>
    </div>
  );
}
