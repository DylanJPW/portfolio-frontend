import { useMemo } from "react";

export const usePageHeight = () => {
  return useMemo<number>(() => {
    const screenHeight = window.innerHeight;
    const headerHeight =
      document.querySelector(".header.navbar")?.clientHeight || 0;
    const padding = 16;
    return screenHeight - headerHeight - padding;
  }, []);
};
