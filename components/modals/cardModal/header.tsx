"use client";

import { updateCard } from "@/actions/updateCard";
import FormInput from "@/components/form/formInput";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/useAction";
import { Card } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { Layout } from "lucide-react";
import { useParams } from "next/navigation";
import React, { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";

type Props = {
  data: Card;
};

const Header = ({ data }: Props) => {
  const queryClient = useQueryClient();
  const params = useParams();
  const inputRef = useRef<ElementRef<"input">>(null);
  const [title, setTitle] = useState(data.title);
  const { execute } = useAction(updateCard, {
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: ["card", data.id]
      });
      queryClient.invalidateQueries({
        queryKey: ["cardLogs", data.id]
      });
      toast.success(`Renamed to "${data.title}" :)`);
      setTitle(data.title);
    },
    onError(error) {
      toast.error(error);
    }
  });
  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = params.boardId as string;
    if (title === data.title) return;
    execute({
      title,
      boardId,
      id: data.id
    });
  };

  const onBlur = () => {
    inputRef.current?.form?.requestSubmit();
  };
  return (
    <div className="flex items-start gap-x-3 mb-6 w-full">
      <Layout className="h-5 w-5 mt-1 text-neutral-700" />
      <div className="w-full">
        <form action={onSubmit}>
          <FormInput
            ref={inputRef}
            onBlur={onBlur}
            id="title"
            defaultValue={title}
            className="font-semibold text-xl px-1 text-neutral-700 bg-transparent border-transparent relative -left-1.5 w-[95%] focus-visible:bg-white focus-visible:border-input mb-0.5 truncate"
          />
        </form>
      </div>
    </div>
  );
};
Header.Skeleton = function HeaderSkeleton() {
  return (
    <div className="flex items-start gap-x-3 mb-6">
      <Skeleton className="h-6 w-6 mt-1 bg-neutral-200" />
      <div>
        <Skeleton className="w-24 h-6 mb-1 bg-neutral-200" />
        <Skeleton className="w-12 h-4 bg-neutral-200" />
      </div>
    </div>
  );
};
export default Header;
