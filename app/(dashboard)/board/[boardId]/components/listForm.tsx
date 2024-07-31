"use client";
import React, { ElementRef, useRef, useState } from "react";
import ListWrapper from "./listWrapper";
import { Plus, X } from "lucide-react";
import FormInput from "@/components/form/formInput";
import { useOnClickOutside } from "usehooks-ts";
import { useParams, useRouter } from "next/navigation";
import FormSubmit from "@/components/form/formSubmit";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/useAction";
import { createList } from "@/actions/createList";
import { toast } from "sonner";

type Props = {};

const ListForm = (props: Props) => {
  const params = useParams();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const { execute, fieldErrors } = useAction(createList, {
    onSuccess(data) {
      toast.success(`List "${data.title}" created`);
      disableEditing();
      router.refresh();
    },
    onError(error) {
      toast.error(error);
    }
  });

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };
  const disableEditing = () => {
    setIsEditing(false);
  };

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = formData.get("boardId") as string;
    execute({
      title,
      boardId
    });
  };

  useOnClickOutside(formRef, disableEditing);
  if (isEditing) {
    return (
      <ListWrapper>
        <form
          action={onSubmit}
          ref={formRef}
          className="w-full p-3 rounded-md bg-white space-y-4 shadow-md"
        >
          <FormInput
            ref={inputRef}
            errors={fieldErrors}
            id="title"
            className="text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition"
            placeholder="Enter list title..."
          />
          <input hidden value={params.boardId} name="boardId" />
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
