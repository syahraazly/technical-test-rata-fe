import { create } from "zustand";

export const useAuthStore = create((set) => ({
  role: "admin", // "admin" | "staff"
  setRole: (role) => set({ role }),
}));
