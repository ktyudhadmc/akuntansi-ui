import { BounceLoader } from "react-spinners";

export default function Spinner() {
  return (
    <div
      className="w-full h-screen flex items-center justify-center dark:bg-gray-900"
      style={{ zIndex: 100000 }}
    >
      <BounceLoader color="var(--color-brand-600)" />
    </div>
  );
}
