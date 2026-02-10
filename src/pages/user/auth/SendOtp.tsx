import { Link, useNavigate } from "react-router";
import { ChevronLeftIcon } from "@assets/icons";
import { useForm, type SubmitHandler } from "react-hook-form";

import Input from "@components/form/input/InputField";
import Button from "@components/ui/button/Button";
import Form from "@components/form/Form";
import Spinner from "@components/Reusable/Spinner";
import useGlobalStore from "@store/useStore";

import useSendOtp from "@services/auth/hooks/useSendOtp";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";

interface CredentialPayload {
  phone: string;
}

export default function SendOtp() {
  const navigate = useNavigate();
  const setPhone = useGlobalStore((state) => state.setPhone);

  /** form */
  const methods = useForm<CredentialPayload>({ mode: "onChange" });
  const { isSubmitting } = methods.formState;
  const isValid = methods.formState.isValid;

  const { handleSendOtp } = useSendOtp("user");

  const onSubmit: SubmitHandler<CredentialPayload> = async (state) => {
    try {
      await handleSendOtp(state.phone);
      setPhone(state.phone);

      /** redirect */
      navigate(`/verify?phone=${state.phone}`);

      toast.success("Kode OTP berhasil dikirim!");
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error((error as Error).message);
      }
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="w-full max-w-md pt-10 mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon className="size-5" />
          Back to home
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Dinamika
              <span className="text-sm italic font-bold"> Jurnal</span>
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Masukkan Nomor WhatsApp untuk masuk akun!
            </p>
          </div>
          <div>
            <div className="space-y-6">
              <Form {...methods} onSubmit={onSubmit}>
                <Input
                  label="WhatsApp"
                  name="phone"
                  type="tel"
                  required={true}
                />

                <Button
                  type="submit"
                  className="w-full uppercase"
                  size="sm"
                  disabled={!isValid || isSubmitting}
                >
                  {!isSubmitting ? "Kirim" : <Spinner />}
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
