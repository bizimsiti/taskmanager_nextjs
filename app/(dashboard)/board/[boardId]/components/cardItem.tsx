import { Card } from "@prisma/client";
import React from "react";

type Props = {
  index: number;
  data: Card;
};

const CardItem = ({ index, data }: Props) => {
  return (
    <div
      role="button"
      className="truncate border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-sm shadow-sm "
    >
      {data.title}
    </div>
  );
};

export default CardItem;
