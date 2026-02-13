import { formatIDRLocale } from "@helpers/currency";

interface Props {
  nomor: number;
}

export default function TableItem({ nomor }: Props) {
  return (
    <tr>
      <td className="pl-5 py-1 text-black text-start text-theme-xs dark:text-white whitespace-nowrap">
        1-1000{nomor}
      </td>
      <td className="px-5 py-1 text-black text-start text-theme-xs dark:text-white whitespace-nowrap border-r dark:border-white/[0.10]">
        Kas
      </td>
      <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap border-r dark:border-white/[0.10]">
        {formatIDRLocale(100)}
      </td>
      <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap border-r dark:border-white/[0.10]">
        {formatIDRLocale(100)}
      </td>
      <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap border-r dark:border-white/[0.10]">
        {formatIDRLocale(100)}
      </td>
      <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap border-r dark:border-white/[0.10]">
        {formatIDRLocale(100)}
      </td>
      <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap border-r dark:border-white/[0.10]">
        {formatIDRLocale(100)}
      </td>
      <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap border-r dark:border-white/[0.10]">
        {formatIDRLocale(100)}
      </td>
    </tr>
  );
}
