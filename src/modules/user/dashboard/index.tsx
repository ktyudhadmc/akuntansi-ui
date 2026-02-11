// import TablePagination from "@components/ui/table/TablePagination";
// import usePagination from "@hooks/usePagination";
// import { useState } from "react";

export default function Dashboard() {
  // const lastPage = 10;

  // const [pageLimit, setPageLimit] = useState(10);
  // const { currentPage, goNextPage, goPrevPage, setPageNum } =
  //   usePagination(lastPage);

  return (
    <div>
      <h1 className="text-gray-500 dark:text-gray-400">Dashboard, It Works!</h1>

      {/* <TablePagination
        goNextPage={goNextPage}
        goPrevPage={goPrevPage}
        setPageNum={setPageNum}
        // perPage={10}
        total={100}
        pageLimit={pageLimit}
        setPageLimit={(limit) => setPageLimit(limit)}
        currentPage={currentPage}
        lastPage={lastPage}
      /> */}
    </div>
  );
}
