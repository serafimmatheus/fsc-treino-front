"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/app/_lib/auth-client";

interface HomePageGuardProps {
  children: React.ReactNode;
}

export function HomePageGuard({ children }: HomePageGuardProps) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/auth");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div
        className="flex min-h-dvh flex-1 items-center justify-center bg-background"
        aria-busy="true"
        aria-label="A carregar sessão"
      >
        <div className="size-9 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return <>{children}</>;
}
