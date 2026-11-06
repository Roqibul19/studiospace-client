// For Client Components only. These use the visitor's own time zone and language.
const dateFormat = new Intl.DateTimeFormat(undefined, {
  weekday: "short",
  day: "numeric",
  month: "short",
  year: "numeric",
});

const timeFormat = new Intl.DateTimeFormat(undefined, {
  hour: "numeric",
  minute: "2-digit",
});

export function formatDate(value) {
  return dateFormat.format(new Date(value));
}

export function formatTime(value) {
  return timeFormat.format(new Date(value));
}

export function formatTimeRange(start, end) {
  const sameDay = formatDate(start) === formatDate(end);
  return sameDay
    ? `${formatDate(start)}, ${formatTime(start)} to ${formatTime(end)}`
    : `${formatDate(start)}, ${formatTime(start)} to ${formatDate(end)}, ${formatTime(end)}`;
}
