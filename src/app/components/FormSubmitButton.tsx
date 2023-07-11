"use client";

import { ComponentProps } from "react";
import { experimental_useFormStatus as formStatus } from "react-dom";

type props = {
  children: React.ReactNode;
  className?: string;
} & ComponentProps<"button">;

export default function FormSubmitButton({
  children,
  className,
  ...prop
}: props) {
  const { pending } = formStatus();

  return (
    <button
      {...prop}
      disabled={pending}
      type="submit"
      className={`btn btn-primary ${className}`}
    >
      {pending && <span className="loading loading-spinner" />}
      {children}
    </button>
  );
}
