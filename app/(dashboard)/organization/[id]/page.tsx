import { create } from "@/actions/createBoard";
import { Button } from "@/components/ui/button";
import db from "@/lib/db";
import { OrganizationSwitcher } from "@clerk/nextjs";
import React from "react";
import Board from "./board";
import Form from "./form";

type Props = {
  params: {
    id: string;
  };
};

const page = async ({ params: { id } }: Props) => {
  const boards = await db.board.findMany();
  return (
    <div>
      <Form />
      <div className="space-y-2">
        {boards.map((board) => (
          <Board title={board.title} key={board.id} id={board.id} />
        ))}
      </div>
    </div>
  );
};

export default page;
