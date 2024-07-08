import React from "react";

type Props = {
  params: {
    id: string;
  };
};

const page = ({ params: { id } }: Props) => {
  return <div>asdasd{id}</div>;
};

export default page;
