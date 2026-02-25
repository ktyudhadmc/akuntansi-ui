// import Badge from "@components/ui/badge/Badge";
import Button from "@components/ui/button/Button";
import { formatIDRLocale } from "@helpers/currency";
import { useModal } from "@hooks/useModal";
import type { BankStatement } from "@services/user/account/cash-bank/interfaces/response-bank-statement.type";
import { HiTrash } from "react-icons/hi";
import BankStatementDelete from "../Action/Delete";
import { formatDateAsYMD } from "@helpers/date";
import Checkbox from "@components/form/default/Checkbox";

interface Props {
  item: BankStatement;
  checked: boolean;
  onToggle: () => void;
}

export default function TableItem({ item, checked, onToggle }: Props) {
  const { openModal, isOpen, closeModal } = useModal();
  return (
    <>
      <BankStatementDelete
        onOpen={isOpen}
        onClose={closeModal}
        id={item.id}
        name={item.description}
      />
      <tr>
        <td className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
          <Checkbox
            className="cursor-pointer"
            checked={checked}
            onChange={onToggle}
          />
        </td>
        <td className="px-5 py-1 text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap">
          {formatDateAsYMD(item.date)}
        </td>
        <td className="px-5 py-1 text-gray-500 text-start text-theme-xs dark:text-gray-400 ">
          {item.description}
        </td>
        <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap font-semibold">
          {item.type == "debit" ? formatIDRLocale(item.amount) : 0}
        </td>
        <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap font-semibold">
          {item.type == "credit" ? formatIDRLocale(item.amount) : 0}
        </td>
        <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap font-semibold">
          {formatIDRLocale(item.amount)}
        </td>
        {/* <td className="px-5 py-1 text-black text-center text-theme-xs dark:text-white whitespace-nowrap font-semibold">
          <Badge variant="light" color={"primary"} size="sm">
            {"System"}
          </Badge>
        </td> */}
        <td className="px-4 py-2 whitespace-nowrap text-gray-500 text-start text-theme-xs dark:text-gray-400">
          <Button onClick={openModal} size="xs" variant="outline">
            <HiTrash />
          </Button>
        </td>
      </tr>
    </>
  );
}
