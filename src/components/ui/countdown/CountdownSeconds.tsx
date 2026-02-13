import { useCountdown } from "@/hooks/useCountdown";
import { useEffect } from "react";

interface Props {
  duration: number;
  onFinish?: () => void;
}

export default function CountdownSeconds({ duration = 60, onFinish }: Props) {
  const { totalSeconds, isFinished } = useCountdown({ duration });

  useEffect(() => {
    if (isFinished && onFinish) {
      onFinish();
    }
  }, [isFinished, onFinish]);

  if (isFinished) return null;

  return <span className="ml-1">{totalSeconds} detik</span>;
}
