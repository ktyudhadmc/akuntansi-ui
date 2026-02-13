import type { ReactNode } from "react";
import clsx from "clsx";
import { BeatLoader } from "react-spinners";

// Props for Table
interface TableProps {
  children: ReactNode; // Table content (thead, tbody, etc.)
  className?: string; // Optional className for styling
}

// Props for TableHeader
interface TableHeaderProps {
  children: ReactNode; // Header row(s)
  className?: string; // Optional className for styling
}

// Props for TableBody
interface TableBodyProps {
  children: ReactNode; // Body row(s)
  className?: string; // Optional className for styling
}

// Props for TableRow
interface TableRowProps {
  children: ReactNode; // Cells (th or td)
  className?: string; // Optional className for styling
}

// Props for TableCell
interface TableCellProps {
  children: ReactNode; // Cell content
  isHeader?: boolean; // If true, renders as <th>, otherwise <td>
  className?: string; // Optional className for styling
  colSpan?: number;
  rowSpan?: number;
}

// Props for TableNotFound
interface TableNotFoundProps {
  colSpan?: number;
  message?: string;
}

// Props for TableLoading
interface TableLoadingProps {
  colSpan?: number;
}

// Table Component
const Table: React.FC<TableProps> = ({ children, className }) => {
  return <table className={`min-w-full  ${className}`}>{children}</table>;
};

// TableHeader Component
const TableHeader: React.FC<TableHeaderProps> = ({ children, className }) => {
  return (
    <thead
      className={`border-b border-gray-100 dark:border-white/[0.05] ${className}`}
    >
      {children}
    </thead>
  );
};

// TableBody Component
const TableBody: React.FC<TableBodyProps> = ({ children, className }) => {
  return (
    <tbody
      className={`divide-y divide-gray-100 dark:divide-white/[0.05] ${className}`}
    >
      {children}
    </tbody>
  );
};

// TableRow Component
const TableRow: React.FC<TableRowProps> = ({ children, className }) => {
  return <tr className={className}>{children}</tr>;
};

// TableCell Component
const TableCell: React.FC<TableCellProps> = ({
  children,
  isHeader = false,
  className,
  colSpan,
  rowSpan,
}) => {
  const CellTag = isHeader ? "th" : "td";
  const classNameDefault = isHeader
    ? "px-5 py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400"
    : "px-5 py-1 text-gray-500 text-theme-xs dark:text-gray-400 whitespace-nowrap";
  return (
    <CellTag
      colSpan={colSpan}
      rowSpan={rowSpan}
      className={clsx(classNameDefault, className)}
    >
      {children}
    </CellTag>
  );
};

// TableNotFound Component
function TableNotFound({
  colSpan = 1,
  message = " Data tidak tersedia",
}: TableNotFoundProps) {
  return (
    <tr>
      <td
        colSpan={colSpan}
        className="text-center py-16 text-gray-700 dark:text-gray-400"
      >
        {message}
      </td>
    </tr>
  );
}

// TableLoading Component
function TableLoading({ colSpan = 1 }: TableLoadingProps) {
  return (
    <tr>
      <td colSpan={colSpan} className="text-center py-16">
        <div className="sweet-loading">
          <BeatLoader color="var(--color-brand-600)" />
        </div>
      </td>
    </tr>
  );
}
export {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableNotFound,
  TableLoading,
};
