import React from "react";
import Info from "./components/info";
import { Separator } from "@/components/ui/separator";
import BoardList from "./components/boardList";

type Props = {
  params: {
    id: string;
  };
};

const page = async ({ params: { id } }: Props) => {
  return (
    <div className="w-full mb-20">
      <Info />
      <Separator className="my-4" />
      <div>
        <BoardList />
      </div>
    </div>
  );
};

export default page;
