import { create } from "zustand";

export const useWorkflowStore = create((set) => ({
  steps: ["Registrasi", "Pemeriksaan", "Obat", "Pembayaran"],

  addStep: (step) =>
    set((state) => ({
      steps: [...state.steps, step],
    })),

  removeStep: (index) =>
    set((state) => ({
      steps: state.steps.filter((_, i) => i !== index),
    })),

  moveStepUp: (index) =>
    set((state) => {
      if (index === 0) return state;
      const steps = [...state.steps];
      [steps[index - 1], steps[index]] = [steps[index], steps[index - 1]];
      return { steps };
    }),

  moveStepDown: (index) =>
    set((state) => {
      if (index === state.steps.length - 1) return state;
      const steps = [...state.steps];
      [steps[index], steps[index + 1]] = [steps[index + 1], steps[index]];
      return { steps };
    }),
}));
