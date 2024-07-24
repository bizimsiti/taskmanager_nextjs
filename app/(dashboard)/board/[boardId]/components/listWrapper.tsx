import React from "react";

type Props = {
  children: React.ReactNode;
};

const listWrapper = ({ children }: Props) => {
  return <li className="shrink-0 h-full w-[272px] select-none">{children}</li>;
};

export default listWrapper;
