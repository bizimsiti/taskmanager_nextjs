"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/createSafeAction";
import { UpdateListOrder } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthrized"
    };
  }
  const { items, boardId } = data;
  let lists;
  try {
    const transaction = items.map((list) =>
      db.list.update({
        data: {
          order: list.order
        },
        where: {
          id: list.id,
          board: {
            orgId
          }
        }
      })
    );
    // multiple db action with $transaction method
    lists = await db.$transaction(transaction);
  } catch (error) {
    return {
      error: "Failed to reorder"
    };
  }
  revalidatePath(`/board/${boardId}`);
  return {
    data: lists
  };
};

export const updateListOrder = createSafeAction(UpdateListOrder, handler);
