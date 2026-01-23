import { useEffect } from "react";

interface Props {
  onOpen: boolean;
  onClose: () => void;
  label: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

export default function Drawer({
  onOpen,
  onClose,
  label,
  children,
  size = "sm",
}: Props) {
  const sizeClasses = {
    sm: "md:w-sm w-3/4",
    md: "md:w-md w-3/4",
    lg: "md:w-lg w-3/4",
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (onOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onOpen, onClose]);

  useEffect(() => {
    if (onOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [onOpen]);

  return (
    <>
      <div
        className={`fixed inset-0 h-full w-full bg-gray-400/50 backdrop-blur-[32px] z-[99999] transition-all duration-500 ease-in-out  ${onOpen ? "translate-x-0" : "translate-x-full"}`}
        onClick={onClose}
      ></div>

      <aside
        className={`fixed flex flex-col lg:mt-0 top-0 right-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-dvh transition-all duration-300 ease-in-out z-[100000] border-r border-gray-200 drop-shadow 
          ${onOpen ? sizeClasses[size] : "w-0"}
          translate-x-0`}
      >
        {onOpen && (
          <div className=" p-4">
            <div className={`flex justify-between`}>
              <h4 className="my-auto font-semibold ">{label}</h4>

              <button
                onClick={onClose}
                className="flex items-center justify-center rounded-full bg-gray-100 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white sm:right-6 sm:top-6 h-9 w-9.5"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.04289 16.5413C5.65237 16.9318 5.65237 17.565 6.04289 17.9555C6.43342 18.346 7.06658 18.346 7.45711 17.9555L11.9987 13.4139L16.5408 17.956C16.9313 18.3466 17.5645 18.3466 17.955 17.956C18.3455 17.5655 18.3455 16.9323 17.955 16.5418L13.4129 11.9997L17.955 7.4576C18.3455 7.06707 18.3455 6.43391 17.955 6.04338C17.5645 5.65286 16.9313 5.65286 16.5408 6.04338L11.9987 10.5855L7.45711 6.0439C7.06658 5.65338 6.43342 5.65338 6.04289 6.0439C5.65237 6.43442 5.65237 7.06759 6.04289 7.45811L10.5845 11.9997L6.04289 16.5413Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>

            <div className={`mt-6`}>{children}</div>
          </div>
        )}
      </aside>
    </>
  );
}
