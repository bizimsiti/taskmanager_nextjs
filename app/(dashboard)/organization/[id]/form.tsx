"use client";
import { create } from "@/actions/createBoard";
import { Button } from "@/components/ui/button";
import React from "react";
import { useFormState } from "react-dom";
import FormInput from "./input";

type Props = {};

const Form = (props: Props) => {
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(create, initialState);
  return (
    <form action={dispatch}>
      <div className="flex flex-col space-y-2">
        <FormInput errors={state?.errors} />
      </div>
      <Button variant="default" size="sm" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default Form;
