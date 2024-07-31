import { ListWithCards } from "@/types";
import React from "react";
import ListForm from "./listForm";
import ListItem from "./listItem";

type Props = {
  data: ListWithCards[];
  boardId: string;
};

const ListContainer = ({ data, boardId }: Props) => {
  return (
    <ol className="flex gap-x-3 h-full">
      {data.map((list, index) => (
        <ListItem index={index} data={list} key={index} />
      ))}
      <ListForm />
    </ol>
  );
};

export default ListContainer;
