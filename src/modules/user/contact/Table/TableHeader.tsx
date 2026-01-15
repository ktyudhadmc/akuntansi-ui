import SearchInput from "@components/form/input/SearchInput";
import Button from "@components/ui/button/Button";
import { debounce } from "lodash";
import { useCallback, useState } from "react";
import { HiOutlineFilter, HiPlus } from "react-icons/hi";
import { MdPerson } from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface Props {
  setSearchCallback: (param: string) => void;
}

export default function TableHeader({ setSearchCallback }: Props) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("customer");
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearchCallback(value);
    }, 500),
    [] // make sure debounce isn't recreated on every render
  );
  return (
    <div className="flex lg:flex-row flex-col lg:justify-between gap-4">
      <div className="flex items-start">
        <Button
          variant={activeTab == "customer" ? "primary" : "outline"}
          size="sm"
          className="rounded-r-none !ring-0 w-full"
          onClick={() => setActiveTab("customer")}
        >
          <MdPerson /> Pelanggan
        </Button>
        <Button
          variant={activeTab == "supplier" ? "primary" : "outline"}
          size="sm"
          className="rounded-l-none !ring-0 w-full"
          onClick={() => setActiveTab("supplier")}
        >
          <MdPerson />
          Supplier
        </Button>
      </div>

      <div className="flex lg:flex-row flex-col gap-4">
        {/* <Button size="sm" variant="outline">
          Impor
        </Button>
        <Button size="sm" variant="outline">
          Ekspor
        </Button>*/}
        <Button size="sm" variant="primary" onClick={() => navigate("create")}>
          <HiPlus />
          Buat Kontak
        </Button>
        <div className="flex gap-2">
          <div className="w-full">
            <SearchInput
              placeholder="Cari"
              onChange={(e) => debouncedSearch(e.target.value)}
            />
          </div>

          <Button size="sm" variant="outline">
            <HiOutlineFilter />
          </Button>
        </div>
      </div>
    </div>
  );
}
