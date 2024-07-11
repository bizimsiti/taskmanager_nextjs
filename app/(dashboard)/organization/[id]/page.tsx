import { create } from "@/actions/createBoard";
import { Button } from "@/components/ui/button";
import db from "@/lib/db";
import { OrganizationSwitcher } from "@clerk/nextjs";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

const page = async ({ params: { id } }: Props) => {
  const boards = await db.board.findMany();
  return (
    <div>
      <form action={create}>
        <input
          className="border border-black"
          type="text"
          id="title"
          name="title"
          required
        />
        <Button variant="default" size="sm" type="submit">
          Submit
        </Button>
      </form>
      <div>
        {boards.map((board) => (
          <div key={board.id}>{board.title}</div>
        ))}
      </div>
    </div>
  );
};

export default page;
