import React from "react";
import OrgControl from "./components/org-control";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <div>
      <OrgControl />
      {children}
    </div>
  );
};

export default layout;
