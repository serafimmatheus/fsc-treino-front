"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/app/_lib/auth-client";
import { AuthLayout } from "@/components/auth/auth-layout";
import { Button } from "@/components/ui/button";
import { GoogleLogo } from "@phosphor-icons/react";

export function AuthPageContent() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && session) {
      router.replace("/");
    }
  }, [session, isPending, router]);

  const handleGoogleLogin = async () => {
    const { error } = await authClient.signIn.social({
      provider: "google",
    });

    if (error) {
      toast.error(
        error.message ?? "Não foi possível fazer login com o Google. Tente novamente."
      );
    }
  };

  if (isPending || session) {
    return null;
  }

  return (
    <AuthLayout>
      <div className="flex flex-col items-center gap-8 text-center">
        <h2 className="text-2xl font-bold leading-tight text-auth-action-fg sm:text-3xl lg:text-4xl">
          O app que vai transformar a forma como você treina.
        </h2>
        <Button
          type="button"
          onClick={handleGoogleLogin}
          className="h-12 w-full max-w-sm rounded-full bg-auth-action-fg text-auth-hero-bg hover:bg-auth-action-fg/90 lg:h-14"
          size="lg"
        >
          <GoogleLogo className="size-6" weight="bold" />
          Fazer login com Google
        </Button>
      </div>
      <p className="mt-8 text-center text-sm text-auth-action-fg/80">
        ©2026 Copyright FIT.AI. Todos os direitos reservados
      </p>
    </AuthLayout>
  );
}
