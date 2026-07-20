export const dateToLocal = (a) => {
  const date = new Date(a);
  const formattedDate = date.toLocaleDateString("fa-IR");
  return formattedDate;
};