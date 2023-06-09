function transformDate(date) {
  const dateObj = new Date(date);
  const formattedDate = new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(dateObj);
  return formattedDate;
}
