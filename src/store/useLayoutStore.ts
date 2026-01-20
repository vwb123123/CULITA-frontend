import { create } from "zustand";

interface LayoutState {
    isTopBannerVisible: boolean;
    topBannerHeight: number;
}

const useLayoutStore = create<LayoutState>(() => ({
    isTopBannerVisible: true,
    topBannerHeight: 36,
}));

export default useLayoutStore;
