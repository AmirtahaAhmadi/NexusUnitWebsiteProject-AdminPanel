import { create } from "zustand";

const initialState = {
  id: "",
};
export const CCstep2id = create((set) => ({
  theid: initialState,
  updatetheid: (newfield) =>
    set((state) => ({
      theid: {
        ...newfield,
      },
    })),

  resettheid: () =>
    set({
      theid: initialState,
    }),
}));
