import { Input } from "@/components/ui/input";
import React from "react";
import { useFormStatus } from "react-dom";

type Props = {
  errors?: {
    title?: string[];
  };
};

const FormInput = ({ errors }: Props) => {
  const { pending } = useFormStatus();
  return (
    <div>
      <Input
        type="text"
        id="title"
        name="title"
        required
        placeholder="Enter a board title"
        disabled={pending}
      />
      {errors?.title ? (
        <div>
          {errors.title.map((error: string) => (
            <p key={error} className="text-rose-500">
              {error}
            </p>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default FormInput;
