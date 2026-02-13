import { useCountdown } from "@/hooks/useCountdown";

interface Props {
  targetDate: string | Date;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function Countdown({ targetDate }: Props) {
  const { days, hours, minutes, seconds, isFinished } = useCountdown({
    targetDate,
  });

  if (isFinished) {
    return <div>Event dimulai 🎉</div>;
  }

  return (
    <div className="flex gap-4 text-center">
      <div>
        <p className="text-2xl font-bold">{pad(days)}</p>
        <p className="text-sm">Hari</p>
      </div>
      <div>
        <p className="text-2xl font-bold">{pad(hours)}</p>
        <p className="text-sm">Jam</p>
      </div>
      <div>
        <p className="text-2xl font-bold">{pad(minutes)}</p>
        <p className="text-sm">Menit</p>
      </div>
      <div>
        <p className="text-2xl font-bold">{pad(seconds)}</p>
        <p className="text-sm">Detik</p>
      </div>
    </div>
  );
}
