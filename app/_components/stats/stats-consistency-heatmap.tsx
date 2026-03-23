import dayjs, { type Dayjs } from "dayjs";
import { cn } from "@/app/_lib/utils";
import type { GetStats200ConsistencyByDay } from "@/app/_lib/api/fetch-generated";
import {
  getHeatmapWeekColumns,
  getStatsWindowStart,
  monthLabelHeatmapPt,
} from "./stats-heatmap-utils";

type CellState = "empty" | "started" | "completed";

function cellStateForDay(
  day: Dayjs,
  today: Dayjs,
  consistencyByDay: GetStats200ConsistencyByDay,
): CellState {
  if (day.isAfter(today, "day")) return "empty";
  const key = day.format("YYYY-MM-DD");
  const state = consistencyByDay[key];
  if (!state) return "empty";
  if (state.workoutDayCompleted) return "completed";
  if (state.workoutDayStarted) return "started";
  return "empty";
}

interface StatsConsistencyHeatmapProps {
  consistencyByDay: GetStats200ConsistencyByDay;
}

export function StatsConsistencyHeatmap({
  consistencyByDay,
}: StatsConsistencyHeatmapProps) {
  const today = dayjs();
  const windowStart = getStatsWindowStart(today);
  const columns = getHeatmapWeekColumns(today);

  return (
    <section className="space-y-3" aria-labelledby="stats-consistency-heading">
      <h2
        id="stats-consistency-heading"
        className="text-lg font-bold tracking-tight text-foreground"
      >
        Consistência
      </h2>

      <div className="rounded-2xl border border-neutral-200 bg-white p-3 shadow-sm sm:p-4">
        <div className="overflow-x-auto [-webkit-overflow-scrolling:touch]">
          <div
            className="flex w-max flex-row items-start gap-1 sm:gap-1.5"
            role="img"
            aria-label="Mapa de consistência dos últimos meses, domingo a sábado por coluna"
          >
            {columns.map((col, colIndex) => {
              const prevSunday = columns[colIndex - 1]?.sunday;
              const showMonth =
                !prevSunday ||
                col.sunday.month() !== prevSunday.month() ||
                col.sunday.year() !== prevSunday.year();
              const label = showMonth ? monthLabelHeatmapPt(col.sunday) : "";

              return (
                <div
                  key={col.sunday.format("YYYY-MM-DD")}
                  className="flex w-[15px] shrink-0 flex-col items-stretch gap-1 sm:w-[17px]"
                >
                  <div className="relative h-5 w-full shrink-0">
                    {label ? (
                      <span className="absolute left-0 top-1/2 z-10 -translate-y-1/2 whitespace-nowrap text-[11px] font-medium text-neutral-500">
                        {label}
                      </span>
                    ) : null}
                  </div>
                  <div className="flex flex-col gap-1">
                    {col.days.map((day) => {
                      const inWindow =
                        !day.isBefore(windowStart, "day") &&
                        !day.isAfter(today, "day");
                      const state = inWindow
                        ? cellStateForDay(day, today, consistencyByDay)
                        : "empty";

                      const isCompleted = state === "completed";
                      const isStarted = state === "started";

                      return (
                        <div
                          key={day.format("YYYY-MM-DD")}
                          title={day.format("DD/MM/YYYY")}
                          className={cn(
                            "aspect-square w-full shrink-0 rounded-[5px] sm:rounded-md",
                            isCompleted &&
                              "border border-transparent bg-[#3b59ff] shadow-sm",
                            isStarted &&
                              "border border-transparent bg-[#e8ecff]",
                            !isCompleted &&
                              !isStarted &&
                              "border border-neutral-100 bg-white",
                          )}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
