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
    return null;
  }

  if (!session) {
    return null;
  }

  return <>{children}</>;
}
