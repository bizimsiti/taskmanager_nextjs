import React from "react";
import OrgControl from "./components/org-control";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <div className="ml-3 w-full">
      <OrgControl />
      {children}
    </div>
  );
};

export default layout;
