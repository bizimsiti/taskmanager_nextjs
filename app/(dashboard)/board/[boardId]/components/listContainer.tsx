"use client";
import { ListWithCards } from "@/types";
import React, { useEffect, useState } from "react";
import ListForm from "./listForm";
import ListItem from "./listItem";

type Props = {
  data: ListWithCards[];
  boardId: string;
};

const ListContainer = ({ data, boardId }: Props) => {
  const [orderedData, setOrderedData] = useState(data);
  useEffect(() => {
    setOrderedData(data);
  }, [data]);
  return (
    <ol className="flex gap-x-3 h-full">
      {orderedData.map((list, index) => (
        <ListItem index={index} data={list} key={list.id} />
      ))}
      <ListForm />
    </ol>
  );
};

export default ListContainer;
