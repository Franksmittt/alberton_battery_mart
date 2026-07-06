import {
  STORE_HOURS_SATURDAY,
  STORE_HOURS_WEEKDAY,
  STORE_TIMEZONE,
} from "@/lib/seo-constants";

export type StoreOpenStatus = {
  isOpen: boolean;
  label: "Open now" | "Closed";
};

function parseTime(time: string): { hour: number; minute: number } {
  const [hour, minute] = time.split(":").map(Number);
  return { hour, minute };
}

function getJohannesburgParts(date: Date) {
  const formatter = new Intl.DateTimeFormat("en-ZA", {
    timeZone: STORE_TIMEZONE,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const parts = formatter.formatToParts(date);
  return {
    weekday: parts.find((part) => part.type === "weekday")?.value ?? "",
    hour: Number(parts.find((part) => part.type === "hour")?.value ?? 0),
    minute: Number(parts.find((part) => part.type === "minute")?.value ?? 0),
  };
}

export function getStoreOpenStatus(date = new Date()): StoreOpenStatus {
  const { weekday, hour, minute } = getJohannesburgParts(date);
  const nowMinutes = hour * 60 + minute;

  if (weekday === "Sun") {
    return { isOpen: false, label: "Closed" };
  }

  const schedule =
    weekday === "Sat" ? STORE_HOURS_SATURDAY : STORE_HOURS_WEEKDAY;
  const open = parseTime(schedule.opens);
  const close = parseTime(schedule.closes);
  const openMinutes = open.hour * 60 + open.minute;
  const closeMinutes = close.hour * 60 + close.minute;

  if (nowMinutes >= openMinutes && nowMinutes < closeMinutes) {
    return { isOpen: true, label: "Open now" };
  }

  return { isOpen: false, label: "Closed" };
}
