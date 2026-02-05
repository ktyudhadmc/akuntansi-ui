import Badge from "@components/ui/badge/Badge";
import Button from "@components/ui/button/Button";
import { formatIDRLocale } from "@helpers/currency";
import { useModal } from "@hooks/useModal";
import type { BankStatement } from "@services/user/account/cash-bank/interfaces/response-bank-statement.type";
import { HiTrash } from "react-icons/hi";
import BankStatementDelete from "../Action/Delete";

interface Props {
  item: BankStatement;
}

export default function TableItem({ item }: Props) {
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
        <td className="px-5 py-1 text-gray-500 text-start text-theme-xs dark:text-gray-400">
          {item.date}
        </td>
        <td className="px-5 py-1 text-gray-500 text-start text-theme-xs dark:text-gray-400 ">
          {item.description}
        </td>
        <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap font-semibold">
          {item.type == "in" ? formatIDRLocale(item.amount) : 0}
        </td>
        <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap font-semibold">
          {item.type == "out" ? formatIDRLocale(item.amount) : 0}
        </td>
        <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap font-semibold">
          {formatIDRLocale(0)}
        </td>
        <td className="px-5 py-1 text-black text-center text-theme-xs dark:text-white whitespace-nowrap font-semibold">
          <Badge variant="light" color={"primary"} size="sm">
            {"Import"}
          </Badge>
        </td>
        <td className="px-4 py-2 whitespace-nowrap text-gray-500 text-start text-theme-xs dark:text-gray-400">
          <Button onClick={openModal} size="xs" variant="outline">
            <HiTrash />
          </Button>
        </td>
      </tr>
    </>
  );
}
