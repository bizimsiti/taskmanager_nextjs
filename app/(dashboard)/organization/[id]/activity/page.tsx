import React, { Suspense } from "react";
import Info from "../components/info";
import { Separator } from "@/components/ui/separator";
import ActivityList from "./components/activityList";
type Props = {};

const page = (props: Props) => {
  return (
    <div className="w-full">
      <Info />
      <Separator className="my-2" />
      <Suspense fallback={<ActivityList.Skeleton />}>
        <ActivityList />
      </Suspense>
    </div>
  );
};

export default page;
