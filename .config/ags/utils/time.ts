import { createPoll } from "ags/time";

// State
export const currentTime = createPoll(Date.now(), 60000, () => Date.now());

export const currentTimeString = createPoll<string>("00:00", 1000, () => {
  const now = new Date();
  const hh = now.getHours().toString().padStart(2, "0");
  const mm = now.getMinutes().toString().padStart(2, "0");
  return `${hh}:${mm}`;
});

export function getCurrentDateString(): string {
  const now = new Date();
  return now.toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}