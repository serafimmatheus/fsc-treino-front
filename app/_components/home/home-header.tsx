import Image from "next/image";
import Link from "next/link";
import { Button } from "@/app/_components/ui/button";
import { cn } from "@/app/_lib/utils";

const HEADER_IMAGE =
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80";

interface HomeHeaderProps {
  userName: string | null;
}

export function HomeHeader({ userName }: HomeHeaderProps) {
  return (
    <header className="relative overflow-hidden rounded-b-[24px]">
      <div className="relative h-56">
        <Image
          src={HEADER_IMAGE}
          alt="Treino"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-foreground/40" />
        <div className="absolute inset-0 flex flex-col justify-between p-4">
          <h1 className="text-lg font-bold uppercase tracking-tight text-card">
            FIT.AI
          </h1>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xl font-bold text-card">
                Olá, {userName ?? "atleta"}
              </p>
              <p className="text-sm text-card/90">Bora treinar hoje?</p>
            </div>
            <Button asChild size="lg" className="rounded-full px-6">
              <Link href="#">Bora!</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
