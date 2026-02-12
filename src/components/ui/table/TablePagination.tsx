import { HiArrowLeft, HiArrowRight, HiChevronDown } from "react-icons/hi";
import type { Option } from "@def/option";
import Select from "@components/form/default/Select";
import Button from "../button/Button";

export interface Props {
  goNextPage: () => void;
  goPrevPage: () => void;
  setPageLimit?: (limit: number) => void;
  setPageNum?: (limit: number) => void;
  perPage?: number;
  to?: number;
  total?: number;
  pageLimit?: number;
  currentPage?: number;
  lastPage?: number | any;
}

export default function TablePagination({
  goNextPage,
  goPrevPage,
  perPage,
  total,
  to,
  pageLimit,
  setPageLimit,
  setPageNum,
  currentPage = 1,
  lastPage,
}: Props) {
  const siblingCount = 1;

  const range: (number | "...")[] = [];

  range.push(1);

  const start = Math.max(2, currentPage - siblingCount);
  const end = Math.min(lastPage - 1, currentPage + siblingCount);

  const middle = Math.ceil(lastPage / 2);

  const showLeftDots = currentPage > middle;
  const showRightDots = currentPage <= middle;

  if (showLeftDots && start > 2) {
    range.push("...");
  }

  for (let i = start; i <= end; i++) {
    range.push(i);
  }

  if (showRightDots && end < lastPage - 1) {
    range.push("...");
  }

  if (lastPage > 1) {
    range.push(lastPage);
  }

  const pageNumbers = range;

  const pageLimitOptions: Option[] = [
    { label: "10", value: "10" },
    { label: "15", value: "15" },
    { label: "25", value: "25" },
    { label: "50", value: "50" },
    { label: "100", value: "100" },
  ];

  return (
    <div className="flex md:flex-row flex-col items-center md:justify-between w-full gap-2 md:gap-0 mt-4">
      <div className="flex items-center gap-2 md:justify-normal justify-between w-full px-6 ">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-400">
          Menampilkan {to || perPage} dari {total} data
        </h4>

        <div className="relative z-20 bg-transparent">
          <Select
            name="page_limit"
            options={pageLimitOptions}
            defaultValue={pageLimit?.toString()}
            onChange={(e) => setPageLimit && setPageLimit(Number(e))}
            className="md:!h-11 !h-10 md:!py-2.5 !py-2 md:!px-4 md:!pr-11 !px-3"
          />

          <HiChevronDown
            className="lg:block hidden absolute top-1/2 right-2 z-30 -translate-y-1/2 text-gray-500 dark:text-gray-400"
            size={18}
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 px-6 py-4 md:w-fit w-full">
        <Button
          type="button"
          size="xs"
          variant="outline"
          className={`text-gray-700 ${currentPage === 1 && "cursor-not-allowed"}`}
          onClick={goPrevPage}
          disabled={currentPage === 1}
        >
          <HiArrowLeft size={20} />
        </Button>

        <span className="block text-sm font-medium text-gray-700 dark:text-gray-400 sm:hidden">
          Halaman {currentPage} dari {lastPage}
        </span>

        <ul className="hidden items-center gap-0.5 sm:flex">
          {pageNumbers.map((page, idx) => {
            if (page === "...") {
              return (
                <li key={`dots-${idx}`}>
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium text-gray-700 hover:bg-brand-500 hover:text-white dark:text-gray-400 dark:hover:text-white cursor-default">
                    ...
                  </span>
                </li>
              );
            }

            const isActive = currentPage === page;

            return (
              <li key={`pagination-number-${idx}`}>
                <button
                  type="button"
                  onClick={() => setPageNum?.(page)}
                  className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium text-gray-700 hover:bg-brand-500 hover:text-white dark:hover:text-white ${isActive ? "bg-brand-600 text-white" : "dark:text-gray-400"}`}
                >
                  {page}
                </button>
              </li>
            );
          })}
        </ul>

        <Button
          type="button"
          size="xs"
          variant="outline"
          className={`text-gray-700 ${currentPage === lastPage && "cursor-not-allowed"}`}
          onClick={goNextPage}
          disabled={currentPage === lastPage}
        >
          <HiArrowRight size={20} />
        </Button>
      </div>
    </div>
  );
}
