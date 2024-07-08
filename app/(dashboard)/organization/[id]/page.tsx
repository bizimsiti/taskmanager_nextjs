import { OrganizationSwitcher } from "@clerk/nextjs";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

const page = ({ params: { id } }: Props) => {
  return (
    <div>
      <OrganizationSwitcher hidePersonal />
    </div>
  );
};

export default page;
