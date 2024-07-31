import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import React from "react";
import BoardNavbar from "./components/boardNavbar";

type Props = {
  children: React.ReactNode;
  params: { boardId: string };
};

export async function generateMetadata({ params: { boardId } }: Props) {
  const { orgId } = auth();
  const board = await db.board.findUnique({
    where: {
      id: boardId
    }
  });

  return {
    title: orgId && board ? board.title : "Board"
  };
}

const layout = async ({ children, params }: Props) => {
  const { orgId } = auth();
  if (!orgId) {
    redirect("/org-select");
  }
  const board = await db.board.findUnique({
    where: {
      id: params.boardId
    }
  });
  if (!board) {
    notFound();
  }
  return (
    <div
      className="bg-cover bg-center bg-no-repeat relative h-screen"
      style={{ backgroundImage: `url(${board.imageFullUrl})` }}
    >
      <BoardNavbar data={board} />
      <div className="absolute inset-0 bg-black/10"></div>
      <main className="relative pt-28 h-screen">{children}</main>
    </div>
  );
};

export default layout;
