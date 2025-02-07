export function getChatId(number: string) {
  return number + "@c.us";
}

export function formatDate(seconds: number) {
  return new Date(seconds * 1000).toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
}
