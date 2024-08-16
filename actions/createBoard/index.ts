"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs/server";
import { createSafeAction } from "@/lib/createSafeAction";
import { CreateBoard } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized"
    };
  }
  const { title, image } = data;

  const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName] =
    image.split("|");

  if (
    !imageId ||
    !imageThumbUrl ||
    !imageFullUrl ||
    !imageLinkHTML ||
    !imageUserName
  ) {
    return {
      error: "Missing fields. Failed to create board"
    };
  }
  let board;
  try {
    board = await db.board.create({
      data: {
        title,
        imageFullUrl,
        orgId,
        imageId,
        imageLinkHTML,
        imageThumbUrl,
        imageUserName
      }
    });
    await createAuditLog({
      entityId: board.id,
      entityTitle: board.title,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.CREATE
    });
  } catch (error) {
    return {
      error: "Failed to create"
    };
  }
  revalidatePath(`/board/${board.id}`);
  return {
    data: board
  };
};

export const createBoard = createSafeAction(CreateBoard, handler);
