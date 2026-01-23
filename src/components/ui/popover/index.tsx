export default function PopOver() {
  return (
    <>
      <div
        className="absolute z-99999 bg-white border border-gray-200 rounded-xl dark:bg-[#1E2634] dark:border-gray-700 block"
        // style={"left: 548.891px; top: 509px;"}
      >
        <div className="max-w-[390px]">
          <div className="relative z-20 rounded-t-xl border-b border-gray-200 px-5 py-3 dark:border-white/[0.03]">
            <h4 className="text-base font-semibold text-gray-800 dark:text-white/90">
              Popover Title
            </h4>
          </div>
          <div className="p-5">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Lorem ipsum dolor sit amet, consect adipiscing elit. Mauris
              facilisis congue exclamate justo nec facilisis.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <button
                type="button"
                className="bg-brand-500 shadow-theme-xs hover:bg-brand-600 flex justify-center rounded-lg px-4 py-2 text-sm font-medium text-white"
              >
                Yes! got it
              </button>

              <button
                type="button"
                className="shadow-theme-xs flex justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
              >
                Learn more
              </button>
            </div>
          </div>
        </div>

        <div
          className="popover-arrow absolute h-3 w-3 rotate-45 bg-white dark:bg-[#1E2634] border-l border-t border-gray-200 dark:border-gray-700"
          //   style="left: 189px; top: -6px;"
        ></div>
      </div>
    </>
  );
}
