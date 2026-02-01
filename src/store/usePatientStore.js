import { create } from "zustand";

export const usePatientStore = create((set) => ({
  search: "",
  page: 1,
  pageSize: 5,

  setSearch: (search) => set({ search, page: 1 }),
  setPage: (page) => set({ page }),
}));
