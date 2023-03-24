import { create } from "zustand";

export const useDirectoriesStore = create((set) => ({
  directories: [],
  navs: "",
  fileInfo: {
    file: "",
    size: "",
    type: "",
  },
  typeModal: {
    info: "",
    show: false,
  },
  feedback: "",
  chargeAnimationActive: false,
  setDirectories: (state) => set({ directories: state.directories }),
  setNavs: (state) => set({ navs: state.navs }),
  setFileInfo: (state) => set({ fileInfo: state.fileInfo }),
  setTypeModal: (state) => set({ typeModal: state.typeModal }),
  setChargeAnimationActive: (state) =>
    set({ chargeAnimationActive: state.chargeAnimationActive }),
  setFeedback: (state) => set({ feedback: state.feedback }),
}));
