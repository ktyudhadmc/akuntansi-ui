import { BeatLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className="w-100 md:h-screen flex flex-col items-center justify-center">
      <div className="sweet-loading">
        <BeatLoader color="var(--color-brand-600)" />
      </div>
    </div>
  );
}
