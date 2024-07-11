import { OrganizationProfile } from "@clerk/nextjs";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="w-full">
      <OrganizationProfile routing="hash" />
    </div>
  );
};

export default page;
