"use client";

import { CircleHelp } from "lucide-react";
import { useQueryStates } from "nuqs";
import { Button } from "@/app/_components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemTitle,
} from "@/app/_components/ui/item";
import type { GetWorkoutDayById200ExercisesItem } from "@/app/_lib/api/fetch-generated";
import { chatSearchParams } from "@/app/_lib/chat-search-params";

function formatRest(seconds: number) {
  if (seconds >= 60) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return s > 0 ? `${m}min ${s}s` : `${m}min`;
  }
  return `${seconds}s`;
}

interface ExerciseCardProps {
  exercise: GetWorkoutDayById200ExercisesItem;
}

export function ExerciseCard({ exercise }: ExerciseCardProps) {
  const [, setChat] = useQueryStates(chatSearchParams, { history: "push" });

  const openHelp = () => {
    void setChat({
      chat_open: true,
      chat_initial_message: `Como executar o exercício ${exercise.name} corretamente?`,
    });
  };

  return (
    <Item
      variant="outline"
      className="rounded-xl border-border/80 bg-card px-3 py-3"
    >
      <ItemContent className="min-w-0 flex-1 gap-0.5">
        <ItemTitle className="line-clamp-none text-sm font-semibold leading-snug text-foreground">
          {exercise.order}. {exercise.name}
        </ItemTitle>
        <p className="text-xs text-muted-foreground">
          {exercise.sets} séries × {exercise.reps} reps · Descanso{" "}
          {formatRest(exercise.restTimeInSeconds)}
        </p>
      </ItemContent>
      <ItemActions>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-9 shrink-0 rounded-full text-muted-foreground"
          aria-label="Ajuda do exercício"
          onClick={openHelp}
        >
          <CircleHelp className="size-5" strokeWidth={1.75} />
        </Button>
      </ItemActions>
    </Item>
  );
}
