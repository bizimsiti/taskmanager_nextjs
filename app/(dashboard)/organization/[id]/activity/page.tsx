import React, { Suspense } from "react";
import Info from "../components/info";
import { Separator } from "@/components/ui/separator";
import ActivityList from "./components/activityList";
import { checkSubscription } from "@/lib/subscription";
type Props = {};

const page = async (props: Props) => {
  const isPro = await checkSubscription();

  return (
    <div className="w-full">
      <Info isPro={isPro} />
      <Separator className="my-2" />
      <Suspense fallback={<ActivityList.Skeleton />}>
        <ActivityList />
      </Suspense>
    </div>
  );
};

export default page;
