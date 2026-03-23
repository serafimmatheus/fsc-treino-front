import Image from "next/image";
import Link from "next/link";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";

const HEADER_IMAGE =
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80";

interface HomeHeaderProps {
  userName: string | null;
}

export function HomeHeader({ userName }: HomeHeaderProps) {
  return (
    <header className="px-0">
      <Card className="gap-0 overflow-hidden rounded-none rounded-b-[24px] border-x-0 border-t-0 py-0 shadow-xl ring-1 ring-black/10">
        <CardContent className="relative h-56 p-0">
          <Image
            src={HEADER_IMAGE}
            alt="Treino"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/55 via-black/25 to-black/50" />
          <div className="absolute inset-0 flex flex-col justify-between p-4">
            <h1 className="text-lg font-bold uppercase tracking-tight text-white drop-shadow-md">
              FIT.AI
            </h1>
            <div className="flex items-end justify-between gap-3">
              <div className="min-w-0 space-y-1">
                <p className="text-xl font-bold tracking-tight text-white drop-shadow-md">
                  Olá, {userName ?? "atleta"}
                </p>
                <p className="text-sm text-white/90 drop-shadow">
                  Bora treinar hoje?
                </p>
              </div>
              <Button
                asChild
                size="lg"
                className="shrink-0 rounded-full px-6 shadow-lg"
              >
                <Link href="#">Bora!</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </header>
  );
}
