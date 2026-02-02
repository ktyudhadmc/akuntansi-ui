// import { FaCogs } from "react-icons/fa";

import { useSetCurrentCompany } from "@services/auth/hooks/useSetCurrentCompany";

import useGetAllCompany from "@services/global/company/hooks/useGetAll";
import Skeleton from "@components/Skeleton/Skeleton";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import LogoDarmaMultiCipta from "@assets/logos/logo-dinamika-circle.svg";
import { MdMoreHoriz } from "react-icons/md";

export default function OnBoard() {
  const navigate = useNavigate();
  const { setCompany } = useSetCurrentCompany();

  const { data, loading } = useGetAllCompany();

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-3">
        {loading || !data
          ? Array.from({ length: 4 }).map((_, idx) => (
            <Skeleton
              key={`skeleton-onboard-company${idx}`}
              isLoading={loading}
              height="5rem"
            />
          ))
          : data?.map((item, idx) => (
            // <div
            //   key={`onboard-company-${idx}`}
            //   className={`border border-brand-600 rounded-lg pt-4 cursor-pointer`}
            //   onClick={() => {
            //     setCompany(item.id.toString());
            //     toast.success("Berhasil memilih perusahaan");
            //     navigate("/user/dashboard");
            //   }}
            // >
            //   <h4 className="px-4 mb-4 text-sm dark:text-white font-semibold ">
            //     {item.name}
            //   </h4>

            //   <div className="bg-brand-600 w-full rounded-b py-1 text-end flex justify-between">
            //     <p className="text-xs font-semibold text-white px-4 my-auto">
            //       {item.code}
            //     </p>
            //     <span className="text-sm text-white px-2">
            //       <HiChevronRight
            //         className="bg-white rounded-full"
            //         color={"var(--color-brand-600)"}
            //       />
            //     </span>
            //   </div>
            // </div>

            // <div
            //   key={`onboard-company-${idx}`}
            //   className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 cursor-pointer"
            //   onClick={() => {
            //     setCompany(item.id.toString());
            //     toast.success("Berhasil memilih perusahaan");
            //     navigate("/user/dashboard");
            //   }}
            // >
            //   <div className="mb-6 flex h-[52px] w-[52px] items-center justify-center rounded-xl bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
            //     <FaCogs className="text-xl" />
            //   </div>

            //   <p className="text-theme-sm text-gray-500 dark:text-gray-400">
            //     {item.code}
            //   </p>

            //   <div className="mt-3 flex items-end justify-between">
            //     <div>
            //       <h4 className="text-title-sm font-bold text-gray-800 dark:text-white/90">
            //         {item.name}
            //       </h4>
            //     </div>
            //   </div>
            // </div>

            <div
              key={idx}
              className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3"
            >
              <div className="relative p-5 pb-4">
                <div className="mb-5 inline-flex h-10 w-10 items-center justify-center">
                  <img src={LogoDarmaMultiCipta} alt="" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                  {item.name}
                </h3>
                <p className="max-w-xs text-sm text-gray-500 dark:text-gray-400">
                  {item.email}
                </p>
                <div className="absolute top-5 right-5 h-fit">
                  {/* <button> */}
                  {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M5 10.0044L5 9.99609M15 10.0044V9.99609M10 10.0044V9.99609"
                        stroke="currentColor"
                        stroke-width="3.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg> */}
                  {/* </button> */}
                  <MdMoreHoriz className="text-xl dark:text-white cursor-pointer" onClick={() => alert(item.name)} />
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 p-5 dark:border-gray-800">
                <div className="flex gap-3">
                  {/* <button className="shadow-theme-xs inline-flex h-11 w-11 items-center justify-center rounded-lg border border-gray-300 text-gray-700 dark:border-gray-700 dark:text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M5.64615 4.59906C5.05459 4.25752 4.29808 4.46015 3.95654 5.05171L2.69321 7.23986C2.35175 7.83128 2.5544 8.58754 3.14582 8.92899C3.97016 9.40493 3.97017 10.5948 3.14583 11.0707C2.55441 11.4122 2.35178 12.1684 2.69323 12.7598L3.95657 14.948C4.2981 15.5395 5.05461 15.7422 5.64617 15.4006C6.4706 14.9247 7.50129 15.5196 7.50129 16.4715C7.50129 17.1545 8.05496 17.7082 8.73794 17.7082H11.2649C11.9478 17.7082 12.5013 17.1545 12.5013 16.4717C12.5013 15.5201 13.5315 14.9251 14.3556 15.401C14.9469 15.7423 15.7029 15.5397 16.0443 14.9485L17.3079 12.7598C17.6494 12.1684 17.4467 11.4121 16.8553 11.0707C16.031 10.5948 16.031 9.40494 16.8554 8.92902C17.4468 8.58757 17.6494 7.83133 17.3079 7.23992L16.0443 5.05123C15.7029 4.45996 14.9469 4.25737 14.3556 4.59874C13.5315 5.07456 12.5013 4.47961 12.5013 3.52798C12.5013 2.84515 11.9477 2.2915 11.2649 2.2915L8.73795 2.2915C8.05496 2.2915 7.50129 2.84518 7.50129 3.52816C7.50129 4.48015 6.47059 5.07505 5.64615 4.59906Z"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                        <path
                          d="M12.5714 9.99977C12.5714 11.4196 11.4204 12.5706 10.0005 12.5706C8.58069 12.5706 7.42969 11.4196 7.42969 9.99977C7.42969 8.57994 8.58069 7.42894 10.0005 7.42894C11.4204 7.42894 12.5714 8.57994 12.5714 9.99977Z"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </button> */}
                  <button
                    onClick={() => {
                      setCompany(item.id.toString());
                      toast.success("Berhasil memilih perusahaan");
                      navigate("/user/dashboard");
                    }}
                    className="shadow-theme-xs inline-flex h-11 items-center justify-center rounded-lg border border-gray-300 px-4 py-3 text-sm font-medium text-gray-700 dark:border-gray-700 dark:text-gray-400"
                  >
                    Buka Jurnal
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
