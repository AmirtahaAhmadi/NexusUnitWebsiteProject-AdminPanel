import instance from "../../interceptor";

export const getTerms = async () => {
  const result = await instance.get("/Term");
  console.log("لیست ترم‌ها:", result.data);
  return result;
};

export const getTermById = async (id) => {
  const result = await instance.get(`/Term/${id}`);
  console.log("جزئیات ترم:", result.data);
  return result;
};