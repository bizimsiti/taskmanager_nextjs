import React from "react";
import Navbar from "./components/navbar";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <div className="h-screen ">
      <Navbar />
      {children}
    </div>
  );
};

export default layout;
