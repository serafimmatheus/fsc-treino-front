import Image from "next/image";
import { cn } from "@/app/_lib/utils";

const AUTH_HERO_IMAGE =
  "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&q=80";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Hero section - top on mobile, left on desktop */}
      <div
        className={cn(
          "relative flex min-w-0 flex-1 flex-col overflow-hidden lg:w-1/2 lg:shrink-0",
          "bg-auth-hero-bg",
        )}
      >
        <div className="flex flex-1 flex-col">
          <h1 className="py-8 text-center font-bold uppercase tracking-tight text-auth-hero-fg lg:py-12 lg:text-2xl">
            FIT.AI
          </h1>
          <div className="relative flex-1 min-h-[280px] lg:min-h-full">
            <Image
              src={AUTH_HERO_IMAGE}
              alt="Pessoa treinando"
              fill
              className="object-cover object-center"
              priority
            />
          </div>
        </div>
      </div>

      {/* Action section - bottom on mobile (overlaps image by 50px), right on desktop */}
      <div
        className={cn(
          "flex min-w-0 flex-1 flex-col justify-between px-8 py-10 lg:w-1/2 lg:shrink-0 lg:justify-center lg:px-16",
          "rounded-t-[40px] lg:rounded-none",
          "-mt-[50px] lg:mt-0",
          "relative z-10",
          "bg-auth-action-bg",
        )}
      >
        {children}
      </div>
    </div>
  );
}
