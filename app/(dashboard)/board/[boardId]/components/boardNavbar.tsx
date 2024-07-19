import db from "@/lib/db";
import { Board } from "@prisma/client";
import React from "react";
import BoardTitleForm from "./titleForm";

type Props = {
  data: Board;
};

const BoardNavbar = async ({ data }: Props) => {
  return (
    <div className="w-full h-14 z-[40] bg-black/50 fixed top-14 flex items-center px-6 gap-x-4 text-white">
      <BoardTitleForm data={data} />
    </div>
  );
};

export default BoardNavbar;
