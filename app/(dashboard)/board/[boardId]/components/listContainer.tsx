"use client";
import { ListWithCards } from "@/types";
import React, { useEffect, useState } from "react";
import ListForm from "./listForm";
import ListItem from "./listItem";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
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
    <DragDropContext onDragEnd={() => {}}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex gap-x-3 h-full"
          >
            {orderedData.map((list, index) => (
              <ListItem index={index} data={list} key={list.id} />
            ))}
            {provided.placeholder}
            <ListForm />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ListContainer;
