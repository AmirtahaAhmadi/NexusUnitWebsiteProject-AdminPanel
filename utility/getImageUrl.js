
export const getNewsImageUrl = (imagePath) => {
  if (!imagePath) return "/no-image.png";

  return `/News/GetNewsFile?fileName=${encodeURIComponent(imagePath)}`;
};