import { Card } from "@prisma/client";
import React from "react";
import { Draggable } from "@hello-pangea/dnd";
type Props = {
  index: number;
  data: Card;
};

const CardItem = ({ index, data }: Props) => {
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          role="button"
          className="truncate border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-sm shadow-sm "
        >
          {data.title}
        </div>
      )}
    </Draggable>
  );
};

export default CardItem;
