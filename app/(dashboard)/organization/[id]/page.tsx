import React, { Suspense } from "react";
import Info from "./components/info";
import { Separator } from "@/components/ui/separator";
import BoardList from "./components/boardList";
import { checkSubscription } from "@/lib/subscription";

type Props = {
  params: {
    id: string;
  };
};

const page = async ({ params: { id } }: Props) => {
  const isPro = await checkSubscription();
  return (
    <div className="w-full mb-20">
      <Info isPro={isPro} />
      <Separator className="my-4" />
      <div>
        <Suspense fallback={<BoardList.Skeleton />}>
          <BoardList />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
