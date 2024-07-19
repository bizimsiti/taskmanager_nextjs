"use client";

import { deleteBoard } from "@/actions/deleteBoard";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { useAction } from "@/hooks/useAction";
import { MoreHorizontal, X } from "lucide-react";
import React from "react";
import { toast } from "sonner";

type Props = {
  id: string;
};

const BoardOptions = ({ id }: Props) => {
  const { execute, isLoading } = useAction(deleteBoard, {
    onError: (error) => {
      toast.error(error);
    }
  });

  const onDelete = () => {
    console.log({ id });
    execute({ id });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="transparent" className="h-auto w-auto p-2">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start">
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Board
        </div>
        <PopoverClose asChild>
          <Button
            className="absolute w-auto h-auto top-2 right-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <Button
          variant="destructive"
          onClick={onDelete}
          disabled={isLoading}
          className="rounded-sm w-full h-auto p-2 px-5 flex justify-center font-normal text-sm text-center"
        >
          Delete Board
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default BoardOptions;
