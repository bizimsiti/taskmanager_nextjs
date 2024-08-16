"use client";

import React from "react";
import CardModal from "../modals/cardModal";
import ProModal from "../modals/proModal";

type Props = {};

const ModalProvider = (props: Props) => {
  return (
    <>
      <CardModal />
      <ProModal />
    </>
  );
};

export default ModalProvider;
