import instance from "../../interceptor";

export const createTerm = async (data) => {
  console.log("CREATE TERM =>", data);

  const result = await instance.post("/Term", data);

  console.log("ترم ایجاد شد:", result.data);
  return result;
};

export const addTermCloseDate = async (data) => {
  console.log("ADD CLOSE DATE =>", data);

  const result = await instance.post("/Term/AddTermCloseDate", data);

  console.log("روز تعطیلی ثبت شد:", result.data);
  return result;
};