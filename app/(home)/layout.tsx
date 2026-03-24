import { Suspense } from "react";
import { NuqsAdapter } from "nuqs/adapters/next";
import { FitAiChatRoot } from "@/app/_components/chat/fit-ai-chat-root";

export default function HomeGroupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NuqsAdapter>
      <div className="flex min-h-dvh w-full flex-1 flex-col">
        {children}
        <Suspense fallback={null}>
          <FitAiChatRoot />
        </Suspense>
      </div>
    </NuqsAdapter>
  );
}
