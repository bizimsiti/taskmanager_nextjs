"use client";
import React from "react";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "primary";
};

const FormSubmit = ({
  children,
  className,
  disabled,
  variant = "primary"
}: Props) => {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending || disabled}
      className={cn(className)}
      variant={variant}
      size="sm"
    >
      {children}
    </Button>
  );
};

export default FormSubmit;
