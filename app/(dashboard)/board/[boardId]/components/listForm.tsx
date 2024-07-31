"use client";
import React, { ElementRef, useRef, useState } from "react";
import ListWrapper from "./listWrapper";
import { Plus, X } from "lucide-react";
import FormInput from "@/components/form/formInput";
import { useOnClickOutside } from "usehooks-ts";
import { useParams } from "next/navigation";
import FormSubmit from "@/components/form/formSubmit";
import { Button } from "@/components/ui/button";

type Props = {};

const ListForm = (props: Props) => {
  const params = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);
  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };
  const disableEditing = () => {
    setIsEditing(false);
  };
  useOnClickOutside(formRef, disableEditing);
  if (isEditing) {
    return (
      <ListWrapper>
        <form
          ref={formRef}
          className="w-full p-3 rounded-md bg-white space-y-4 shadow-md"
        >
          <FormInput
            ref={inputRef}
            id="title"
            className="text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition"
            placeholder="Enter list title..."
          />
          <input hidden value={params.boaardId} name="boardId" />
          <div className="flex items-center gap-x-1">
            <FormSubmit>Add List</FormSubmit>
            <Button onClick={disableEditing} size="sm" variant="destructive">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </ListWrapper>
    );
  }

  return (
    <ListWrapper>
      <button
        onClick={enableEditing}
        className="w-full rounded-md bg-white/80 hover:bg-white/50 transition p-4 flex items-center font-medium text-sm"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add a list
      </button>
    </ListWrapper>
  );
};

export default ListForm;
