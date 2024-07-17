"use client";
import { Button } from "@/components/ui/button";
import React from "react";

import { useAction } from "@/hooks/useAction";
import { createBoard } from "@/actions/createBoard/";
import FormInput from "@/components/form/formInput";
import FormSubmit from "@/components/form/formSubmit";
type Props = {};

const Form = (props: Props) => {
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log(data, "success");
    },
    onError: (error) => {
      console.log(error);
    }
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    console.log("fielderrors", fieldErrors);

    execute({ title });
  };

  return (
    <form action={onSubmit}>
      <div className="flex flex-col space-y-2">
        <FormInput label="Board Title" id="title" errors={fieldErrors} />
      </div>
      <FormSubmit variant="primary">Save</FormSubmit>
    </form>
  );
};

export default Form;
