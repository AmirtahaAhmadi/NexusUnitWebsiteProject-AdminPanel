export const FindFormat = (item) => {
  return item.split(".").pop()?.toUpperCase();
};
