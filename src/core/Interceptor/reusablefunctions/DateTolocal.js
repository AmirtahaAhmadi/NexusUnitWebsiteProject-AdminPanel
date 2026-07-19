export const dateToLocal = (a) => {
  const date = new Date(a);

  const formattedDate = date.toLocaleDateString("fa-IR");

  const formattedTime = date.toLocaleTimeString("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return `${formattedDate} - ${formattedTime}`;
};
