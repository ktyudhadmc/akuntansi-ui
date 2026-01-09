import { Link } from "react-router";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import { ChevronLeftIcon } from "@assets/icons";

import OtpInput from "@components/form/input/OtpInput";
import useVerifyOtp from "@services/auth/hooks/useVerifyOtp";

// import useGlobalStore from "@store/useStore";

export default function VerifyOtp() {
  const otpLength = 6;
  // const phone = useGlobalStore((state) => state.phone);

  const [searchParams] = useSearchParams();
  const phone = searchParams.get("phone") ?? "";

  const { handleVerifyOtp } = useVerifyOtp("user");

  const onSubmit = async (otp: string) => {
    if (otp.length !== otpLength) return;
    try {
      await handleVerifyOtp(phone, otp);

      toast.success("Verifikasi akun berhasil!", {
        position: "top-center",
      });
    } catch (error) {
      toast.error("Kode verifikasi tidak valid!", {
        position: "top-center",
      });
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
              Akuntansi
              <span className="text-sm italic font-bold"> by DMC</span>
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Kode Verifikasi telah dikirimkan ke <b>{phone}</b> untuk masuk
              akun!
            </p>
          </div>
          <div>
            <div className="space-y-6">
              <OtpInput
                numOfInputs={otpLength}
                autoFocus
                onChange={(value) => {
                  if (value.length === otpLength) {
                    onSubmit(value);
                  }
                }}
                autoSubmit
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
