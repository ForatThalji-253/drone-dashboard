
import { create } from "zustand";

const useDroneStore = create((set) => ({
  selectedDrone: null,
  setSelectedDrone: (serial) => set({ selectedDrone: serial }),
}));

export default useDroneStore;
