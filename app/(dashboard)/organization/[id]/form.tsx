"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import FormInput from "./input";
import { useAction } from "@/hooks/useAction";
import { createBoard } from "@/actions/createBoard/";
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
    execute({ title });
  };

  return (
    <form action={onSubmit}>
      <div className="flex flex-col space-y-2">
        <FormInput errors={fieldErrors} />
      </div>
      <Button variant="default" size="sm" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default Form;
