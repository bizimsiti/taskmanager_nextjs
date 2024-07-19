import React from "react";
import OrgControl from "./components/org-control";
import { startCase } from "lodash";
import { auth } from "@clerk/nextjs/server";
type Props = {
  children: React.ReactNode;
};

export async function generateMetadata() {
  const { orgSlug } = auth();
  return {
    title: startCase(orgSlug || "organization")
  };
}

const layout = ({ children }: Props) => {
  return (
    <div className="ml-3 w-full">
      <OrgControl />
      {children}
    </div>
  );
};

export default layout;
