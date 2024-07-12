import { deleteBoard } from "@/actions/deleteBoard";
import { Button } from "@/components/ui/button";
import React from "react";

type Props = {
  id: string;
  title: string;
};

const Board = ({ title, id }: Props) => {
  const actionDeleteBoard = deleteBoard.bind(null, id);
  return (
    <form action={actionDeleteBoard} className="flex items-center gap-x-2">
      <p>Board title:{title}</p>
      <Button size="sm" variant="destructive">
        Delete
      </Button>
    </form>
  );
};

export default Board;
