import { ListWithCards } from "@/types";
import React from "react";
import ListForm from "./listForm";

type Props = {
  data: ListWithCards[];
  boardId: string;
};

const ListContainer = ({ data, boardId }: Props) => {
  return (
    <ol>
      <ListForm />
    </ol>
  );
};

export default ListContainer;
