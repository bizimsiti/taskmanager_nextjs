"use client";

import { deleteList } from "@/actions/deleteList";
import FormSubmit from "@/components/form/formSubmit";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useAction } from "@/hooks/useAction";
import { List } from "@prisma/client";
import { MoreHorizontal, X } from "lucide-react";
import { toast } from "sonner";

type Props = {
  data: List;
  onAddCard: () => void;
};

const ListOptions = ({ data, onAddCard }: Props) => {
  const { execute: deleteExecute, fieldErrors } = useAction(deleteList, {
    onSuccess(data) {
      toast.success(`"${data.title}" deleted :(`);
    },
    onError(error) {
      toast.error(error);
    }
  });

  const onDelete = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;
    deleteExecute({
      id,
      boardId
    });
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="center">
        <div className="text-sm font-medium text-center text-neutal-600 pb-4">
          List actions
        </div>
        <PopoverClose asChild>
          <Button
            className="h-auto w-auto p-2 top-2 right-2  absolute"
            variant="destructive"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <Button
          onClick={onAddCard}
          className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          variant="ghost"
        >
          add card...
        </Button>
        <form>
          <input hidden name="id" id="id" value={data.id} />
          <input hidden name="boardId" id="boardId" value={data.boardId} />
          <FormSubmit
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
            variant="ghost"
          >
            copy list...
          </FormSubmit>
        </form>
        <Separator />
        <form action={onDelete}>
          <input hidden name="id" id="id" value={data.id} />
          <input hidden name="boardId" id="boardId" value={data.boardId} />
          <FormSubmit
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm hover:bg-red-500 hover:text-white group"
            variant="ghost"
          >
            Delete list{" "}
            <X className="hidden h-auto w-auto group-hover:block text-white absolute right-2" />
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default ListOptions;
