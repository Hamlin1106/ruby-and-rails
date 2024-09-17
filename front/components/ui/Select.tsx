import { cn } from "@/components/util/utils";
import React from "react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  id?: string;
  name?: string;
  className?: string;
  defaultValue?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Select = React.forwardRef<HTMLSelectElement, Props>(
  ({ defaultValue, className, children, onChange, ...props }, ref) => {
    return (
      <select
        defaultValue={defaultValue}
        className={cn(
          "rounded-md py-2 pl-3 pr-10 sm:text-sm sm:leading-6 border border-border",
          className
        )}
        onChange={onChange}
        {...props}
        ref={ref}
      >
        {children}
      </select>
    );
  }
);

export { Select };
