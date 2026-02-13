import { useEffect, useRef, useState, useCallback } from "react";

type CountdownOptions = { duration: number } | { targetDate: string | Date };

export function useCountdown(options: CountdownOptions) {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isDuration = "duration" in options;

  const duration = isDuration ? options.duration : null;
  const targetDate = !isDuration ? options.targetDate : null;

  const calculateInitialSeconds = useCallback(() => {
    if (duration !== null) {
      return duration;
    }

    const target =
      typeof targetDate === "string" ? new Date(targetDate) : targetDate;

    return Math.max(Math.floor((target!.getTime() - Date.now()) / 1000), 0);
  }, [duration, targetDate]);

  const start = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    const initialSeconds = calculateInitialSeconds();
    setTimeLeft(initialSeconds);

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [calculateInitialSeconds]);

  useEffect(() => {
    start();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [start]);

  const days = Math.floor(timeLeft / (60 * 60 * 24));
  const hours = Math.floor((timeLeft % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((timeLeft % (60 * 60)) / 60);
  const seconds = timeLeft % 60;

  return {
    totalSeconds: timeLeft,
    days,
    hours,
    minutes,
    seconds,
    isFinished: timeLeft === 0,
    reset: start,
  };
}
