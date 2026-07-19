import { create } from "zustand";

export const useRefresh = create((set) => ({
  refresh: false,

  setRefresh: () =>
    set((state) => ({
      refresh: !state.refresh,
    })),
}));
