import Link from "next/link";
import { BarChart3, Calendar, Home, Sparkles, User } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";

export function BottomNav() {
  return (
    <nav
      aria-label="Navegação principal"
      className="fixed bottom-0 left-0 right-0 z-50 px-0 pb-0 safe-area-inset-bottom"
    >
      <Card className="gap-0 overflow-hidden rounded-none rounded-t-3xl border-x-0 border-b-0 py-0 shadow-[0_-8px_32px_-4px_rgba(0,0,0,0.08)] ring-1 ring-border/60">
        <CardContent className="px-2 pb-4 pt-3">
          <div className="flex max-w-lg mx-auto items-end justify-between px-1">
            <Button
              variant="ghost"
              className="h-auto min-h-12 flex-1 rounded-xl py-2 text-foreground hover:bg-muted/60 hover:text-foreground"
              asChild
            >
              <Link href="/" aria-current="page" aria-label="Início">
                <Home className="size-7" strokeWidth={1.75} />
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="h-auto min-h-12 flex-1 rounded-xl py-2 text-muted-foreground hover:bg-muted/60"
              aria-label="Calendário"
            >
              <Calendar className="size-7" strokeWidth={1.75} />
            </Button>
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
              className="h-auto min-h-12 flex-1 rounded-xl py-2 text-muted-foreground hover:bg-muted/60"
              aria-label="Estatísticas"
            >
              <BarChart3 className="size-7" strokeWidth={1.75} />
            </Button>
            <Button
              variant="ghost"
              className="h-auto min-h-12 flex-1 rounded-xl py-2 text-muted-foreground hover:bg-muted/60"
              aria-label="Perfil"
            >
              <User className="size-7" strokeWidth={1.75} />
            </Button>
          </div>
        </CardContent>
      </Card>
    </nav>
  );
}
