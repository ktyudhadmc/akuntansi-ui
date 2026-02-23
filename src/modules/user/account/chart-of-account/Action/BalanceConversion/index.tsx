import { isEmpty } from "lodash";
import {
  useFieldArray,
  useForm,
  useWatch,
  type SubmitHandler,
} from "react-hook-form";
import { Link } from "react-router-dom";

import useGoBack from "@hooks/useGoBack";

import {
  Table,
  TableBody,
  TableCell,
  TableFoot,
  TableHeader,
  TableLoading,
  TableNotFound,
  TableRow,
} from "@components/ui/table";
import Form from "@components/form/Form";
import Input from "@components/form/input/InputField";
import Button from "@components/ui/button/Button";

import useGetAll from "@services/user/account/index/hooks/useGetAll";
import type { ICreateBalanceConversionPayload } from "@services/user/account/balance-conversion/interfaces/request.type";
import { useEffect, useMemo } from "react";
import { formatIDRLocale } from "@helpers/currency";
import useCreateBalanceConversion from "@services/user/account/balance-conversion/hooks/useCreateBalanceConversion";
import { toast } from "react-toastify";

type FormFields = ICreateBalanceConversionPayload;

export default function COABalanceConversion() {
  const goBack = useGoBack();

  const { data, loading } = useGetAll();
  const { createData } = useCreateBalanceConversion();

  const getAccountUrl = (id: number, categoryId?: number | null) => {
    const cashBank = categoryId == 3;

    /** redirect cashbank */
    if (cashBank) return `/user/accounts/cash-bank/${id}`;

    /** redirect coa */
    return `/user/accounts/chart-of-account/${id}`;
  };

  const methods = useForm<FormFields>({
    mode: "onChange",
    defaultValues: {
      balance_conversion: [],
    },
  });

  const { control } = methods;

  const { fields, replace } = useFieldArray({
    control,
    name: "balance_conversion",
  });

  const watchedBalance = useWatch({
    control,
    name: "balance_conversion",
    defaultValue: [],
  });

  const onSubmit: SubmitHandler<FormFields> = async (state) => {
    const { error, response } = await createData(state);
    if (error || response) {
      if (error) {
        toast.error("Gagal menyimpan data!");
      } else {
        methods.reset();
        goBack();
        toast.success("Berhasil menyimpan data!");
      }
    }
  };

  useEffect(() => {
    if (!data) return;
    replace(
      data.map((item) => ({
        account: {
          id: item.id,
          name: item.name,
          code: item.code,
          sub_type: {
            id: item?.category?.id,
            name: item?.category?.name,
          },
        },
        debit: 5000,
        credit: 5000,
      })),
    );
  }, [data, replace]);

  /** total frontend */
  const totals = useMemo(() => {
    return watchedBalance.reduce(
      (acc, item) => {
        acc.debit += Number(item?.debit || 0);
        acc.credit += Number(item?.credit || 0);
        return acc;
      },
      { debit: 1, credit: 1 },
    );
  }, [fields, watchedBalance]);

  const totalDebit = totals.debit;
  const totalCredit = totals.credit;

  const isBalanced = totalDebit === totalCredit;

  return (
    <>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="space-y-6">
          <Form {...methods} onSubmit={onSubmit} className="w-full">
            <div className="overflow-auto sm:rounded-lg max-h-[calc(100vh-35vh)] rounded-2xl border border-gray-100 dark:border-gray-800 custom-scrollbar">
              <Table>
                <TableHeader className="sticky top-0 z-10 bg-gray-50 dark:bg-gray-700">
                  <TableRow>
                    <TableCell
                      colSpan={2}
                      isHeader
                      className="text-start text-black dark:!text-white"
                    >
                      Akun
                    </TableCell>
                    <TableCell
                      isHeader
                      className="text-end text-black dark:!text-white"
                    >
                      Debit
                    </TableCell>
                    <TableCell
                      isHeader
                      className="text-end text-black dark:!text-white"
                    >
                      Kredit
                    </TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableLoading colSpan={4} />
                  ) : isEmpty(data) || !data ? (
                    <TableNotFound colSpan={4} />
                  ) : (
                    fields.map((field, index) => (
                      <TableRow key={`table-field-${index}`}>
                        <TableCell className="text-start">
                          <Link
                            className={`flex my-auto text-brand-600 dark:text-white`}
                            to={getAccountUrl(
                              field.account.id,
                              field.account.sub_type.id,
                            )}
                          >
                            {field.account.code}
                          </Link>
                        </TableCell>

                        <TableCell className="text-start">
                          <Link
                            className={`flex my-auto text-brand-600 dark:text-white`}
                            to={getAccountUrl(
                              field.account.id,
                              field.account.sub_type.id,
                            )}
                          >
                            {field.account.name}
                          </Link>
                        </TableCell>

                        <TableCell className="text-end min-w-48">
                          <Input
                            leftIcon={"Rp"}
                            name={`balance_conversion[${index}][debit]`}
                            type="number"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            className="text-end"
                            defaultValue={field.debit}
                          />
                        </TableCell>

                        <TableCell className="text-end min-w-48">
                          <Input
                            leftIcon={"Rp"}
                            name={`balance_conversion[${index}][credit]`}
                            type="number"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            className="text-end"
                            defaultValue={field.credit}
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
                <TableFoot
                  className={`sticky bottom-0 z-10 rounded-b-2xl ${!isBalanced ? "bg-red-100" : "bg-gray-50 dark:bg-gray-700"}`}
                >
                  <TableRow>
                    <TableCell
                      colSpan={2}
                      className={`py-2 !text-sm ${!isBalanced ? "text-red-500" : " !text-black dark:!text-white"}`}
                    >
                      Total
                    </TableCell>
                    <TableCell
                      className={`text-end py-2 !text-sm ${!isBalanced ? "text-red-500" : " !text-black dark:!text-white"}`}
                    >
                      {formatIDRLocale(totalDebit, { withSymbol: true })}
                    </TableCell>
                    <TableCell
                      className={`text-end py-2 !text-sm ${!isBalanced ? "text-red-500" : " !text-black dark:!text-white"}`}
                    >
                      {formatIDRLocale(totalCredit, { withSymbol: true })}
                    </TableCell>
                  </TableRow>
                </TableFoot>
              </Table>
            </div>

            <div className="flex lg:justify-end gap-4 mt-4">
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="lg:w-fit w-full"
                onClick={goBack}
              >
                Kembali
              </Button>
              <Button
                type="submit"
                size="sm"
                className="lg:w-fit w-full"
                disabled={!isBalanced}
              >
                Simpan
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
