import {
  STORE_HOURS_SATURDAY,
  STORE_HOURS_WEEKDAY,
  STORE_PHONE_FROM,
  STORE_TIMEZONE,
} from "@/lib/seo-constants";

export type StoreOpenStatus = {
  isOpen: boolean;
  label: "Open now" | "Closed";
  detail: string;
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

function formatClock(time: string): string {
  return time;
}

export function getStoreOpenStatus(date = new Date()): StoreOpenStatus {
  const { weekday, hour, minute } = getJohannesburgParts(date);
  const nowMinutes = hour * 60 + minute;
  const phone = parseTime(STORE_PHONE_FROM);
  const phoneMinutes = phone.hour * 60 + phone.minute;

  if (weekday === "Sun") {
    return {
      isOpen: false,
      label: "Closed",
      detail: "Opens Monday 08:00 · phones from 07:30",
    };
  }

  const schedule =
    weekday === "Sat" ? STORE_HOURS_SATURDAY : STORE_HOURS_WEEKDAY;
  const open = parseTime(schedule.opens);
  const close = parseTime(schedule.closes);
  const openMinutes = open.hour * 60 + open.minute;
  const closeMinutes = close.hour * 60 + close.minute;

  if (nowMinutes >= openMinutes && nowMinutes < closeMinutes) {
    return {
      isOpen: true,
      label: "Open now",
      detail: `Shop floor until ${formatClock(schedule.closes)}`,
    };
  }

  if (weekday !== "Sat" && nowMinutes >= phoneMinutes && nowMinutes < openMinutes) {
    return {
      isOpen: false,
      label: "Closed",
      detail: "Phones on · shop floor opens 08:00",
    };
  }

  if (nowMinutes < openMinutes) {
    return {
      isOpen: false,
      label: "Closed",
      detail: `Opens ${formatClock(schedule.opens)} · phones from ${STORE_PHONE_FROM}`,
    };
  }

  if (weekday === "Sat") {
    return {
      isOpen: false,
      label: "Closed",
      detail: "Opens Monday 08:00 · phones from 07:30",
    };
  }

  return {
    isOpen: false,
    label: "Closed",
    detail: "Opens tomorrow 08:00 · phones from 07:30",
  };
}
