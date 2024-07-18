import FormPop from "@/components/form/formPop";
import Hint from "@/components/hint";
import { HelpCircle, User2 } from "lucide-react";
import React from "react";

type Props = {};

const BoardList = (props: Props) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-lg text-neutral-700">
        <User2 className="h-6 w-6 mr-2" />
        Your Boards
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <FormPop sideOffset={10} side="right">
          <div
            role="button"
            className="aspect-video relative h-full w-full bg-muted rounded-sm flex items-center flex-col justify-center gap-y-1 hover:opacity-75 transition"
          >
            <p className="text-sm">Create new board</p>
            <span className="text-xs">5 remaining</span>
            <Hint
              sideOffset={50}
              description={`Free workspaces can have up 5 open boards. For unlimited borars upgrade this workspace`}
            >
              <HelpCircle className="absolute bottom-2 right-2 h-[14px] w-[14px]" />
            </Hint>
          </div>
        </FormPop>
      </div>
    </div>
  );
};

export default BoardList;
