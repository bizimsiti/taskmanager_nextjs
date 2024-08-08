import { Card } from "@prisma/client";
import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import { useCardModal } from "@/hooks/useCardModal";
type Props = {
  index: number;
  data: Card;
};

const CardItem = ({ index, data }: Props) => {
  const cardModal = useCardModal();
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div
          onClick={() => cardModal.onOpen(data.id)}
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
