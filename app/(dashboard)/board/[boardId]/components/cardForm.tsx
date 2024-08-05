import FormSubmit from "@/components/form/formSubmit";
import FormTextArea from "@/components/form/formTextarea";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import React, { forwardRef } from "react";

type Props = {
  listId: string;
  isEditing: boolean;
  enableEditing: () => void;
  disableEditing: () => void;
};

const CardForm = forwardRef<HTMLTextAreaElement, Props>(
  ({ listId, isEditing, disableEditing, enableEditing }, ref) => {
    if (isEditing) {
      return (
        <form className="m-1 py-0.5 px-1 space-y-4">
          <FormTextArea
            id={"title"}
            onKeyDown={() => {}}
            ref={ref}
            placeholder="Enter a title for this card..."
          />
          <input
            hidden
            id="listId"
            name="listId"
            value={listId}
            defaultValue={listId}
          />
          <div className="flex items-center gap-x-1">
            <FormSubmit>Add card</FormSubmit>
            <Button
              onClick={disableEditing}
              size={"sm"}
              variant={"destructive"}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </form>
      );
    }
    return (
      <div className="pt-2 px-2">
        <Button
          onClick={enableEditing}
          className="h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm"
          size="sm"
          variant={"ghost"}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add a card
        </Button>
      </div>
    );
  }
);

export default CardForm;
