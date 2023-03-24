import { create } from "zustand";

export const useDirectoriesStore = create((set) => ({
  directories: [],
  navs: "",
  setDirectories: (state) => set({ directories: state.directories }),
  setNavs: (state) => set({ navs: state.navs }),
}));
