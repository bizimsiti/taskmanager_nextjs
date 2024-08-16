"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/createSafeAction";
import { CopyList } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthrized"
    };
  }
  const { id, boardId } = data;
  let list;
  try {
    const listToCopy = await db.list.findUnique({
      where: {
        id,
        boardId,
        board: {
          orgId
        }
      },
      include: {
        cards: true
      }
    });
    if (!listToCopy) {
      return {
        error: "List not found"
      };
    }

    if (listToCopy.cards.length === 0) {
      return {
        error: "Current List's card is empty :( First create a card"
      };
    }

    const lastList = await db.list.findFirst({
      where: {
        boardId
      },
      orderBy: { order: "desc" },
      select: { order: true }
    });

    const newOrder = lastList ? lastList.order + 1 : 1;

    list = await db.list.create({
      data: {
        boardId: listToCopy.boardId,
        title: `${listToCopy.title} - Copy`,
        order: newOrder,
        cards: {
          createMany: {
            data: listToCopy.cards.map((card) => ({
              title: card.title,
              description: card.description,
              order: card.order
            }))
          }
        }
      },
      include: {
        cards: true
      }
    });
    await createAuditLog({
      entityId: list.id,
      entityTitle: list.title,
      entityType: ENTITY_TYPE.LIST,
      action: ACTION.CREATE
    });
  } catch (error) {
    return {
      error: "Failed to copied"
    };
  }
  revalidatePath(`/board/${boardId}`);
  return {
    data: list
  };
};

export const copyList = createSafeAction(CopyList, handler);
