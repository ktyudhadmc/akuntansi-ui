import { HashLoader } from "react-spinners";

export default function Spinner() {
  return (
    <>
      <div
        className="w-full h-screen flex lg:flex-row flex-col gap-6 items-center justify-center dark:bg-gray-900"
        style={{ zIndex: 100000 }}
      >
        <HashLoader color="#ec4a0a" size={96} />

        <h1 className="mb-2 font-semibold text-brand-600 text-title-sm sm:text-title-md">
          Dinamika
          <span className="text-sm italic font-normal"> Jurnal</span>
        </h1>
      </div>
    </>
  );
}
