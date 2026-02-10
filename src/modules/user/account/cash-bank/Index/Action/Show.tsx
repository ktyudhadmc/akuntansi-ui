import Skeleton from "@components/Skeleton/Skeleton";
import Button from "@components/ui/button/Button";
import { Dropdown, DropdownItem } from "@components/ui/dropdown";
import { useDropdown } from "@hooks/useDropdown";
import useGetAccount from "@services/user/account/index/hooks/useGet";
import { useEffect } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { HiUpload } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";

export default function CBShow() {
  const navigate = useNavigate();
  const params = useParams();

  const { toggleDropdown, isOpen, closeDropdown } = useDropdown();
  const { data: account, loading: accountLoading } = useGetAccount(
    params.id as string,
  );

  useEffect(() => {
    if (accountLoading) return;

    if (account && account.category?.id !== 3) {
      navigate(`/user/accounts/chart-of-account/${params.id}`, {
        replace: true,
      });
    }
  }, [account, accountLoading, navigate, params.id]);

  return (
    <div className="flex lg:flex-row flex-col gap-2 lg:justify-between lg:items-center">
      <div>
        <Skeleton isLoading={accountLoading} height="1.2rem" width="50%">
          <span className="text-gray-500 text-theme-sm dark:text-gray-400">
            {account?.code}
          </span>
        </Skeleton>
        <Skeleton isLoading={accountLoading} height="1.7rem">
          <h5 className="dark:text-white font-semibold text-lg">
            {account?.name}
          </h5>
        </Skeleton>
      </div>

      <div className="flex lg:flex-row flex-col gap-4">
        <Button
          size="sm"
          variant="outline"
          className="lg:w-auto w-full"
          onClick={() => navigate(`../../chart-of-account/${params?.id}/edit`)}
        >
          Ubah Akun
        </Button>

        <div className="flex gap-4">
          <Button
            size="sm"
            variant="outline"
            className="lg:w-auto w-full"
            onClick={() => navigate(`../import`)}
          >
            <HiUpload />
            Impor
          </Button>

          <div className="relative lg:w-auto w-full">
            <Button
              size="sm"
              onClick={toggleDropdown}
              className="lg:w-auto w-full"
            >
              <span>Buat transaksi</span>
              <AiFillCaretDown />
            </Button>

            <Dropdown isOpen={isOpen} onClose={closeDropdown}>
              <DropdownItem>Transfer uang</DropdownItem>
              <DropdownItem>Terima uang</DropdownItem>
              <DropdownItem>Kirim uang</DropdownItem>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
}
