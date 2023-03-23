import { create } from "zustand";

export const useDirectoriesStore = create((set) => ({
  directories: [],
  setDirectories: (state) => set({ directories: state.directories }),
}));
