import clsx from "clsx";
import type { FunctionComponent, PropsWithChildren } from "react";
import {
  FormProvider,
  type SubmitHandler,
  type UseFormReturn,
} from "react-hook-form";

interface Props extends UseFormReturn<any>, PropsWithChildren {
  onSubmit: SubmitHandler<any>;
  withSpacing?: boolean;
  className?: string;
}

const Form: FunctionComponent<Props> = ({
  children,
  className,
  onSubmit,
  ...restProps
}) => {
  return (
    <FormProvider {...restProps}>
      <form
        className={clsx(["w-full flex flex-col gap-3", className])}
        onSubmit={restProps.handleSubmit(onSubmit)}
      >
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
