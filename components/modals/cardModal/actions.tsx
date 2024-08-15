"use client";

import { copyCard } from "@/actions/copyCard";
import { deleteCard } from "@/actions/deleteCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/useAction";
import { useCardModal } from "@/hooks/useCardModal";
import { Card } from "@prisma/client";
import { Copy, Trash } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";
import { toast } from "sonner";

type Props = {
  data: Card;
};

const Actions = ({ data }: Props) => {
  const params = useParams();
  const cardModal = useCardModal();
  const { execute: copyCardAction, isLoading: copyLoading } = useAction(
    copyCard,
    {
      onSuccess(data) {
        toast.success(`Card "${data.title}" copied`);
        cardModal.onClose();
      },
      onError(error) {
        toast.error(error);
      }
    }
  );
  const { execute: deleteCardAction, isLoading: deleteLoading } = useAction(
    deleteCard,
    {
      onSuccess(data) {
        console.log(data);

        toast.success(`Card "${data.title}" deleted`);
        cardModal.onClose();
      },
      onError(error) {
        toast.error(error);
      }
    }
  );
  const onCopy = () => {
    const boardId = params.boardId as string;
    copyCardAction({
      id: data.id,
      boardId
    });
  };
  const onDelete = () => {
    console.log("delete");

    const boardId = params.boardId as string;
    deleteCardAction({
      id: data.id,
      boardId
    });
  };
  return (
    <div className="space-y-2 mt-2">
      <p className="text-xs font-semibold">actions</p>
      <Button
        onClick={onCopy}
        disabled={copyLoading}
        variant={"gray"}
        className="w-auto md:w-full mr-3"
        size={"inline"}
      >
        <Copy className="h-4 w-4 mr-2" />
        Copy
      </Button>
      <Button
        onClick={onDelete}
        disabled={deleteLoading}
        variant={"gray"}
        className="w-auto md:w-full "
        size={"inline"}
      >
        <Trash className="h-4 w-4 mr-2" />
        Delete
      </Button>
    </div>
  );
};
Actions.Skeleton = function ActionSkeleton() {
  return (
    <div className="space-y-2 mt-2">
      <Skeleton className="w-20 h-4 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
    </div>
  );
};
export default Actions;
