import { useState, useCallback } from "react";

export const useDrawer = (initialState: boolean = false) => {
  const [isExpanded, setIsExpanded] = useState(initialState);

  const openDrawer = useCallback(() => setIsExpanded(true), []);
  const closeDrawer = useCallback(() => setIsExpanded(false), []);
  const toggleDrawer = useCallback(() => setIsExpanded((prev) => !prev), []);

  return { isExpanded, openDrawer, closeDrawer, toggleDrawer };
};
