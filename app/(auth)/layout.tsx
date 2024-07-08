import React from "react";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <div className="h-screen top flex items-center justify-center bg-gradient-to-r from-fuchsia-600 to-pink-600">
      {children}
    </div>
  );
};

export default layout;
