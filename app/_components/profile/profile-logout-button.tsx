"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/app/_lib/auth-client";

export function ProfileLogoutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  return (
    <button
      type="button"
      disabled={pending}
      className="mx-auto mt-10 flex items-center justify-center gap-2 text-sm font-semibold text-destructive transition-opacity disabled:opacity-60"
      onClick={async () => {
        setPending(true);
        try {
          await authClient.signOut();
          router.replace("/auth");
          router.refresh();
        } finally {
          setPending(false);
        }
      }}
    >
      Sair da conta
      <LogOut className="size-4" strokeWidth={2} aria-hidden />
    </button>
  );
}
