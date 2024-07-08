import { UserButton } from "@clerk/nextjs";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <UserButton />
    </div>
  );
};

export default page;
