
import { create } from "zustand";

const useDroneStore = create((set) => ({
  selectedDrone: null,
  setSelectedDrone: (regId) => set({ selectedDrone: regId }),
}));

export default useDroneStore;
