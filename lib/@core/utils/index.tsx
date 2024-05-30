export function getCurrentDateTime() {
  const now = new Date();
  const date = now.toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });
  const time = now.toLocaleTimeString("en-US", {
    hour12: true,
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  });
  const milliseconds = now.getMilliseconds().toString().padStart(7, "0");

  return `${date} ${time}.${milliseconds}`;
}

export function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  const milliseconds = now.getMilliseconds().toString().padStart(7, "0");

  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}
