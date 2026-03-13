// import Badge from "@components/ui/badge/Badge";

import { TableCell, TableRow } from "@components/ui/table";
// import TableItemMenu from "./TebleItemMenu";
import type { Customer } from "@services/user/customer/interfaces/response.type";
import TableItemAction from "./TableItemAction";
import { useModal } from "@hooks/useModal";
import ShowCustomer from "../Action/Show";

interface Props {
  item: Customer;
  openDropdownId: number | null;
  setOpenDropdownId: (id: number | null) => void;
}

export default function TableItem({
  item,
  openDropdownId,
  setOpenDropdownId,
}: Props) {
  const {
    openModal: openModalShow,
    isOpen: isOpenModalShow,
    closeModal: closeModalShow,
  } = useModal();
  return (
    <>
      <ShowCustomer
        item={item}
        onOpen={isOpenModalShow}
        onClose={closeModalShow}
        key={`modal-show-${item.id}`}
      />
      <TableRow>
        <TableCell className="text-start">
          <span
            className={`flex my-auto text-brand-600 dark:text-white font-medium cursor-pointer`}
            onClick={openModalShow}
          >
            {item.code}
          </span>
        </TableCell>
        <TableCell className="text-start">
          <span
            className={`flex my-auto text-brand-600 dark:text-white font-medium cursor-pointer`}
            onClick={openModalShow}
          >
            {item.name}
          </span>
          {/* <div className="flex gap-2 mt-2">
          {item.is_customer && (
            <Badge variant="light" color="info">
              Pelanggan
            </Badge>
          )}
          {item.is_supplier && (
            <Badge variant="light" color="success">
              Supplier
            </Badge>
          )}
        </div> */}
        </TableCell>
        {/* <td className="px-5 py-3 text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap">
        {item.email}
      </td>
      <td className="px-5 py-3 text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap">
        {item.phone}
      </td> */}
        <TableCell className="text-end">
          {/* <TableItemMenu id={item.id} code={item.code} name={item.name} /> */}
          <TableItemAction
            item={item}
            openDropdownId={openDropdownId}
            setOpenDropdownId={setOpenDropdownId}
          />
        </TableCell>
      </TableRow>
    </>
  );
}
