"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/createSafeAction";
import { UpdateList } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthrized"
    };
  }
  const { id, title, boardId } = data;
  let list;
  try {
    list = await db.list.update({
      where: {
        id,
        board: {
          orgId
        },
        boardId
      },
      data: {
        title
      }
    });
    await createAuditLog({
      entityId: list.id,
      entityTitle: list.title,
      entityType: ENTITY_TYPE.LIST,
      action: ACTION.UPDATE
    });
  } catch (error) {
    return {
      error: "Failed to update"
    };
  }
  revalidatePath(`/board/${boardId}`);
  return {
    data: list
  };
};

export const updateList = createSafeAction(UpdateList, handler);
