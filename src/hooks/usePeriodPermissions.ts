import { useMemo } from "react";
import useGlobalStore from "@store/useStore";
import { today } from "@helpers/index";

export function usePeriodPermissions(date: Date) {
  const current = useGlobalStore((state) => state.currentPeriod);
  const opens = useGlobalStore((state) => state.openPeriods);

  console.log('current');
  console.log(current);

  return useMemo(() => {
    const isInRange = (period?: any) =>
      period && date >= period.start_date && date <= (period.end_date ?? today);

    const isCurrent = isInRange(current);
    const isOpen = opens?.some(isInRange);
    // const isClosed = [...(opens ?? []), current]?.some(isInRange);
    const isClosed = !isCurrent && !isOpen;
    const period = isCurrent ? current : opens?.find(isInRange);

    const isLocked = period?.is_locked ?? false;
    // const isLocked = isClosed; // atau field khusus dari backend

    const canEdit = isCurrent || isOpen;
    const canDelete = isCurrent; // contoh policy
    const canCreate = isCurrent;

    return {
      isCurrent,
      isOpen,
      isClosed,
      isLocked,
      canEdit,
      canDelete,
      canCreate,
    };
  }, [date, current, opens, closed]);
}
