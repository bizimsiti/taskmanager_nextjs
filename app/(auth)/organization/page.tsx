import React from "react";
import { OrganizationList } from "@clerk/nextjs";
type Props = {};

const page = (props: Props) => {
  return (
    <OrganizationList
      hidePersonal
      afterSelectOrganizationUrl="/organization/:id"
      afterCreateOrganizationUrl="/organization/:id"
    />
  );
};

export default page;
