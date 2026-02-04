import { useSearchParams } from "react-router-dom";
import { useCallback, useMemo } from "react";
import type { Option } from "@def/option";

export const useTabs = (
  tabs: readonly Option[],
  defaultTab: string,
  paramKey: string = "tab",
) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = useMemo(() => {
    const tab = searchParams.get(paramKey);
    const isValid = tabs.some((t) => t.value === tab);
    return isValid ? tab! : defaultTab;
  }, [searchParams, tabs, defaultTab, paramKey]);

  const setTab = useCallback(
    (tab: string) => {
      setSearchParams((prev) => {
        prev.set(paramKey, tab);
        return prev;
      });
    },
    [paramKey, setSearchParams],
  );

  return {
    activeTab,
    setTab,
    tabs,
  };
};
