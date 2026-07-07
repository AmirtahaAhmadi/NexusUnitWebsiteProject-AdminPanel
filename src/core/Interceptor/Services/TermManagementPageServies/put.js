import instance from "../../interceptor";

export const updateTerm = async (data) => {
  console.log("UPDATE TERM =>", data);

  const result = await instance.put("/Term", data);

  console.log("ترم ویرایش شد:", result.data);
  return result;
};

export const updateTermCloseDate = async (data) => {
  console.log("UPDATE CLOSE DATE =>", data);

  const result = await instance.put("/Term/UpdateTermCloseDate", data);

  console.log("روز تعطیلی ویرایش شد:", result.data);
  return result;
};
