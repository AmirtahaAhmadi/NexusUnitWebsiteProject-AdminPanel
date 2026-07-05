import { getNewsFileList } from "../EditPageServices/get";
import { deleteNewsFile } from "../EditPageServices/delete";
import { activeDeactiveNews } from "../EditPageServices/put";

const toSafeArray = (value) => {
  if (Array.isArray(value)) return value;
  if (value && typeof value === "object") {
    const nestedArray = Object.values(value).find((v) => Array.isArray(v));
    return nestedArray ?? [];
  }
  return [];
};

export const deleteNewsCascade = async (newsId) => {
  try {
    const fileListRes = await getNewsFileList(newsId);
    const files = toSafeArray(fileListRes?.data?.files ?? fileListRes?.data);

    if (files.length > 0) {
      const results = await Promise.allSettled(
        files.map((file) => deleteNewsFile(file.id)),
      );

      const failed = results.filter((r) => r.status === "rejected");
      if (failed.length > 0) {
        console.error("برخی فایل‌های خبر حذف نشدند:", failed);
      }
    }
  } catch (fileError) {
    if (fileError.response?.status !== 404) {
      console.error("API ERROR (get/delete news files):", fileError);
    }
  }

  return activeDeactiveNews(newsId, false);
};
