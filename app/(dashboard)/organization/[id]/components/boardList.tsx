import React from "react";
import FormPop from "@/components/form/formPop";
import Hint from "@/components/hint";
import { auth } from "@clerk/nextjs/server";
import { HelpCircle, User2 } from "lucide-react";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { getAvaibleCount } from "@/lib/orgLimit";
import { MAX_FREE_BOARDS } from "@/constants/boards";
import { checkSubscription } from "@/lib/subscription";
type Props = {};

const BoardList = async (props: Props) => {
  const { orgId } = auth();
  if (!orgId) {
    return redirect("/org-select");
  }

  const boards = await db.board.findMany({
    where: {
      orgId
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  const avaibleCount = await getAvaibleCount();
  const isPro = await checkSubscription();

  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-lg text-neutral-700">
        <User2 className="h-6 w-6 mr-2" />
        Your Boards
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {boards.map((board) => (
          <Link
            key={board.id}
            href={`/board/${board.id}`}
            className="group relative aspect-video bg-no-repeat bg-center bg-cover bg-sky-700 rounded-sm h-full w-full p-2 overflow-hidden"
            style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
          >
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />
            <p className="relative font-semibold text-white">{board.title}</p>
          </Link>
        ))}
        <FormPop sideOffset={10} side="right">
          <div
            role="button"
            className="aspect-video relative h-full w-full bg-muted rounded-sm flex items-center flex-col justify-center gap-y-1 hover:opacity-75 transition"
          >
            <p className="text-sm">Create new board</p>
            <span className="text-xs">
              {isPro
                ? "Unlimited"
                : `${MAX_FREE_BOARDS - avaibleCount} remaining`}
            </span>
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

BoardList.Skeleton = function SkeletonBoardList() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
    </div>
  );
};

export default BoardList;
