import dayjs, { type Dayjs } from "dayjs";

export type WeekColumn = {
  /** Domingo da semana (primeiro dia da coluna). */
  sunday: Dayjs;
  /** Domingo → sábado (7 dias). */
  days: Dayjs[];
};

function startOfWeekSunday(d: Dayjs): Dayjs {
  const dow = d.day();
  return d.subtract(dow, "day").startOf("day");
}

function endOfWeekSaturday(d: Dayjs): Dayjs {
  const dow = d.day();
  return d.add(6 - dow, "day").startOf("day");
}

/** Janela dos últimos 3 meses: primeiro dia do (mês atual − 2) até `today`, inclusive. */
export function getStatsWindowStart(today: Dayjs = dayjs()): Dayjs {
  return today.subtract(2, "month").startOf("month");
}

/** Colunas = semanas (domingo a sábado), alinhadas ao calendário. */
export function getHeatmapWeekColumns(today: Dayjs = dayjs()): WeekColumn[] {
  const rangeStart = getStatsWindowStart(today);
  const rangeEnd = today.startOf("day");

  const gridStart = startOfWeekSunday(rangeStart);
  const gridEnd = endOfWeekSaturday(rangeEnd);

  const columns: WeekColumn[] = [];
  let cursor = gridStart;
  while (!cursor.isAfter(gridEnd)) {
    const sunday = cursor;
    const days = Array.from({ length: 7 }, (_, i) => sunday.add(i, "day"));
    columns.push({ sunday, days });
    cursor = cursor.add(7, "day");
  }
  return columns;
}

/** Meses como no layout de referência (Jan, Fev, Mar, Abril, Maio, …). */
const HEATMAP_MONTH_LABELS = [
  "Jan",
  "Fev",
  "Mar",
  "Abril",
  "Maio",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
] as const;

export function monthLabelHeatmapPt(d: Dayjs): string {
  return HEATMAP_MONTH_LABELS[d.month()] ?? "";
}
