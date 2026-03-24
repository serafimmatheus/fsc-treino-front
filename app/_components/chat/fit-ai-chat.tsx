"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, isTextUIPart, type UIMessage } from "ai";
import { ArrowUp, Loader2, Sparkles, X } from "lucide-react";
import { useQueryStates } from "nuqs";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Streamdown } from "streamdown";
import "streamdown/styles.css";
import { chatSearchParams } from "@/app/_lib/chat-search-params";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
} from "@/app/_components/ui/sheet";
import { cn } from "@/app/_lib/utils";

const INITIAL_SUGGESTED_PROMPTS = ["Monte meu plano de treino"] as const;
const FOLLOWUP_SUGGESTED_PROMPTS = [
  "Alterar plano de treino",
  "Mudar objetivo",
] as const;

function ChatMessageBody({
  message,
  isStreamingThisMessage,
}: {
  message: UIMessage;
  isStreamingThisMessage: boolean;
}) {
  return (
    <div className="space-y-2">
      {message.parts.map((part, index) => {
        if (isTextUIPart(part)) {
          if (message.role === "assistant") {
            return (
              <Streamdown
                key={index}
                className="text-sm leading-relaxed text-neutral-900 [&_a]:font-medium [&_a]:text-[#2563EB] [&_li]:my-0.5 [&_p]:my-2 [&_strong]:font-semibold"
                isAnimating={isStreamingThisMessage}
                animated
              >
                {part.text}
              </Streamdown>
            );
          }
          return (
            <p
              key={index}
              className="whitespace-pre-wrap text-sm leading-relaxed text-white"
            >
              {part.text}
            </p>
          );
        }
        if (part.type === "reasoning" || part.type === "step-start") {
          return null;
        }
        if (String(part.type).startsWith("tool-")) {
          return (
            <p key={index} className="text-xs text-muted-foreground">
              A usar uma ferramenta…
            </p>
          );
        }
        return null;
      })}
    </div>
  );
}

export function FitAiChat() {
  const [{ chat_open, chat_initial_message }, setChatParams] = useQueryStates(
    chatSearchParams,
    { history: "push" },
  );

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/ia`,
        credentials: "include",
      }),
    [],
  );

  const { messages, sendMessage, status } = useChat({ transport });

  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const initialSentRef = useRef(false);

  const scrollToEnd = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, []);

  const lastAssistantId = useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i]?.role === "assistant") return messages[i].id;
    }
    return undefined;
  }, [messages]);

  useLayoutEffect(() => {
    if (!chat_open) return;
    scrollToEnd();
  }, [chat_open, messages, status, scrollToEnd]);

  useEffect(() => {
    if (!chat_open) return;
    let alive = true;
    const run = () => {
      if (alive) scrollToEnd();
    };
    run();
    requestAnimationFrame(() => {
      run();
      requestAnimationFrame(run);
    });
    const timeouts = [50, 150, 350].map((ms) => window.setTimeout(run, ms));
    return () => {
      alive = false;
      timeouts.forEach(clearTimeout);
    };
  }, [chat_open, scrollToEnd]);

  useEffect(() => {
    if (!chat_open) return;
    const root = scrollRef.current;
    const content = contentRef.current;
    if (!root || !content) return;
    const ro = new ResizeObserver(() => {
      root.scrollTop = root.scrollHeight;
    });
    ro.observe(content);
    return () => ro.disconnect();
  }, [chat_open]);

  useEffect(() => {
    if (!chat_open) {
      initialSentRef.current = false;
    }
  }, [chat_open]);

  useEffect(() => {
    if (
      !chat_open ||
      !chat_initial_message ||
      messages.length > 0 ||
      status !== "ready" ||
      initialSentRef.current
    ) {
      return;
    }
    initialSentRef.current = true;
    void sendMessage({ text: chat_initial_message });
    void setChatParams({ chat_initial_message: null });
  }, [
    chat_open,
    chat_initial_message,
    messages.length,
    sendMessage,
    setChatParams,
    status,
  ]);

  const onSheetOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        void setChatParams({ chat_open: false, chat_initial_message: null });
        initialSentRef.current = false;
      }
    },
    [setChatParams],
  );

  const busy = status === "submitted" || status === "streaming";

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const t = input.trim();
    if (!t || busy) return;
    setInput("");
    void sendMessage({ text: t });
  };

  const showInitialSuggestions =
    chat_open && messages.length === 0 && status === "ready" && !busy;
  const showFollowupSuggestions =
    chat_open && messages.length > 0 && status === "ready" && !busy;

  return (
    <Sheet open={chat_open} onOpenChange={onSheetOpenChange}>
      <SheetContent
        side="bottom"
        showCloseButton={false}
        overlayClassName="z-[100] bg-black/45 supports-backdrop-filter:backdrop-blur-[3px] data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0"
        className="flex min-h-0 flex-col gap-0 overflow-hidden rounded-t-[1.25rem] border-0 border-t border-neutral-200/80 bg-white p-0 shadow-[0_-8px_40px_-12px_rgba(0,0,0,0.2)] data-[side=bottom]:h-[80dvh] data-[side=bottom]:max-h-[80dvh] sm:rounded-t-3xl"
      >
        <div className="shrink-0 border-b border-neutral-200 px-4 pt-4 pb-3">
          <div className="flex items-center gap-3">
            <div
              className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#EFF6FF]"
              aria-hidden
            >
              <Sparkles
                className="size-[22px] text-[#2563EB]"
                strokeWidth={2}
              />
            </div>
            <div className="min-w-0 flex-1 text-left">
              <SheetTitle className="text-base font-bold text-neutral-900">
                Coach AI
              </SheetTitle>
              <div className="mt-0.5 flex items-center gap-1.5">
                <span
                  className="size-2 shrink-0 rounded-full bg-online"
                  aria-hidden
                />
                <span className="text-xs text-neutral-500">Online</span>
              </div>
            </div>
            <SheetClose asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="size-9 shrink-0 rounded-full text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600"
                aria-label="Fechar chat"
              >
                <X className="size-5" strokeWidth={2} />
              </Button>
            </SheetClose>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain bg-white px-4 py-4 [scrollbar-gutter:stable]"
        >
          <div ref={contentRef} className="space-y-3">
            {messages.map((m) => (
              <div
                key={m.id}
                className={cn(
                  "flex",
                  m.role === "user" ? "justify-end" : "justify-start",
                )}
              >
                <div
                  className={cn(
                    "max-w-[min(100%,20rem)] px-4 py-2.5 sm:max-w-[min(100%,24rem)]",
                    m.role === "user"
                      ? "rounded-[1.125rem] bg-[#2563EB] text-white"
                      : "rounded-[1.125rem] bg-[#F3F4F6] text-neutral-900",
                  )}
                >
                  <ChatMessageBody
                    message={m}
                    isStreamingThisMessage={
                      status === "streaming" &&
                      m.role === "assistant" &&
                      m.id === lastAssistantId
                    }
                  />
                </div>
              </div>
            ))}

            {status === "submitted" && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-[1.125rem] bg-[#F3F4F6] px-4 py-2.5 text-xs text-neutral-500">
                  <Loader2
                    className="size-4 animate-spin text-[#2563EB]"
                    aria-hidden
                  />
                  A pensar…
                </div>
              </div>
            )}
          </div>
        </div>

        {showInitialSuggestions && (
          <div className="shrink-0 border-t border-neutral-100 bg-white px-4 py-3">
            <div className="flex flex-wrap gap-2">
              {INITIAL_SUGGESTED_PROMPTS.map((text) => (
                <button
                  key={text}
                  type="button"
                  className="rounded-full bg-[#F0F4FF] px-4 py-2.5 text-left text-sm font-medium text-[#1D4ED8] transition-colors hover:bg-[#E8EFFF]"
                  onClick={() => void sendMessage({ text })}
                >
                  {text}
                </button>
              ))}
            </div>
          </div>
        )}

        {showFollowupSuggestions && !showInitialSuggestions && (
          <div className="shrink-0 border-t border-neutral-100 bg-white px-4 py-3">
            <div className="flex flex-wrap gap-2">
              {FOLLOWUP_SUGGESTED_PROMPTS.map((text) => (
                <button
                  key={text}
                  type="button"
                  className="rounded-full bg-[#F0F4FF] px-4 py-2.5 text-left text-sm font-medium text-[#1D4ED8] transition-colors hover:bg-[#E8EFFF]"
                  onClick={() => void sendMessage({ text })}
                >
                  {text}
                </button>
              ))}
            </div>
          </div>
        )}

        <form
          onSubmit={onSubmit}
          className="shrink-0 border-t border-neutral-200 bg-white p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
        >
          <div className="mx-auto flex max-w-lg items-center gap-2.5">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua mensagem"
              className="h-12 flex-1 rounded-full border-0 bg-[#F3F4F6] px-5 text-sm text-neutral-900 shadow-none ring-0 placeholder:text-neutral-400 focus-visible:border-0 focus-visible:ring-2 focus-visible:ring-[#2563EB]/25"
              disabled={busy}
              autoComplete="off"
            />
            <Button
              type="submit"
              size="icon"
              className="size-12 shrink-0 rounded-full bg-[#2563EB] text-white shadow-none hover:bg-[#1D4ED8] disabled:bg-neutral-200 disabled:text-neutral-400"
              disabled={busy || !input.trim()}
              aria-label="Enviar"
            >
              {busy ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                <ArrowUp className="size-5" strokeWidth={2.5} />
              )}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
