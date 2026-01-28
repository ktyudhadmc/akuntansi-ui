import useGlobalStore from "@store/useStore";
import { Link } from "react-router";

interface BreadcrumbItem {
  label: string;
  path?: string;
}
interface BreadcrumbProps {
  pageTitle: string;
  breadcrumbs?: BreadcrumbItem[];
  showBreadCrumb?: boolean;
}

const PageBreadcrumb: React.FC<BreadcrumbProps> = ({
  pageTitle,
  breadcrumbs,
  showBreadCrumb = true,
}) => {
  const role = useGlobalStore((state) => state.role);

  const redirectToDashboard = () => {
    switch (role) {
      case "admin":
        return "/admin/dashboard";
      case "company":
        return "/company/dashboard";
      case "user":
        return "/user/dashboard";
      default:
        return "/";
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
      
      <h2
        className="text-xl font-semibold text-gray-800 dark:text-white/90"
        x-text="pageName"
      >
        {pageTitle}
      </h2>
      {showBreadCrumb && (
        <nav>
          <ol className="flex items-center gap-1.5">
            <li>
              <Link
                className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
                to={redirectToDashboard()}
              >
                Beranda
                <svg
                  className="stroke-current"
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
                    stroke=""
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </li>

            {breadcrumbs?.map((item, index) => (
              <li key={`breadcrumb-item-${index}`}>
                {item.path ? (
                  <Link
                    to={item.path}
                    className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
                  >
                    {item.label}{" "}
                    <svg
                      className="stroke-current"
                      width="17"
                      height="16"
                      viewBox="0 0 17 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
                        stroke=""
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                ) : (
                  <span>{item.label}</span>
                )}
              </li>
            ))}

            <li className="text-sm text-gray-800 dark:text-white/90">
              {pageTitle}
            </li>
          </ol>
        </nav>
      )}
    </div>
  );
};

export default PageBreadcrumb;
