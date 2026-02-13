import { useState } from "react";
import { Link } from "react-router";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";

import { ChevronLeftIcon } from "@assets/icons";

import OtpInput from "@components/form/input/OtpInput";
import useVerifyOtp from "@services/auth/hooks/useVerifyOtp";
import useSendOtp from "@services/auth/hooks/useSendOtp";
import Spinner from "@components/Reusable/Spinner";
import Button from "@components/ui/button/Button";
import { useCountdown } from "@hooks/useCountdown";

// import useGlobalStore from "@store/useStore";

export default function VerifyOtp() {
  const otpLength = 6;
  const countdown = 60; // seconds
  const navigate = useNavigate();
  // const phone = useGlobalStore((state) => state.phone);

  const [otpCode, setOtpCode] = useState<string | null>(null);
  const [resendLoading, setResendLoading] = useState<boolean>(false);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  const { totalSeconds, isFinished, reset } = useCountdown({
    duration: countdown,
  });

  const [searchParams] = useSearchParams();
  const phone = searchParams.get("phone") ?? "";

  const { handleVerifyOtp } = useVerifyOtp("user");
  const { handleSendOtp } = useSendOtp("user");

  const onSubmit = async (otp: string) => {
    if (otp.length !== otpLength) return;

    try {
      setSubmitLoading(true);
      await handleVerifyOtp(phone, otp);

      navigate("/user/onboard");
      toast.success("Verifikasi akun berhasil!");

      setSubmitLoading(false);
    } catch (error) {
      toast.error("Kode verifikasi tidak valid!");
      setSubmitLoading(false);
    }
  };

  const onResend = async () => {
    try {
      setResendLoading(true);
      await handleSendOtp(phone);
      toast.success("Kode OTP berhasil dikirim!");
      reset();
      setResendLoading(false);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error((error as Error).message);
      }
      setResendLoading(false);
    }
  };

  // console.log(isCountdownFinished);
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
                  setOtpCode(value);

                  if (value.length === otpLength) {
                    onSubmit(value);
                  }
                }}
                autoSubmit
              />

              <Button
                className="w-full uppercase"
                size="sm"
                disabled={otpCode?.length !== otpLength || submitLoading}
              >
                {!submitLoading ? "Verifikasi" : <Spinner />}
              </Button>
            </div>
          </div>

          <div className="mt-5">
            {resendLoading ? (
              <div className="flex">
                <Spinner withText={false} />
                <small className="text-theme-xs font-normal text-brand-300 dark:text-gray-400 my-auto">
                  Loading...
                </small>
              </div>
            ) : (
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Tidak menerima kode verifikasi?
                {isFinished ? (
                  <a
                    className="text-brand-500 hover:text-brand-600 dark:text-brand-400 ml-1 cursor-pointer"
                    href="javascript:void();"
                    onClick={onResend}
                  >
                    Kirim Ulang
                  </a>
                ) : (
                  <span className="ml-1 font-normal text-brand-600 dark:text-white">
                    ({totalSeconds})
                  </span>
                )}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
