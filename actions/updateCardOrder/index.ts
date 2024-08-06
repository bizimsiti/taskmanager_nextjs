"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/createSafeAction";
import { UpdateCardOrder } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthrized"
    };
  }
  const { items, boardId } = data;
  let cards;
  try {
    const transaction = items.map((card) =>
      db.card.update({
        data: {
          order: card.order,
          listId: card.listId
        },
        where: {
          id: card.id,
          list: {
            board: {
              orgId
            }
          }
        }
      })
    );
    // multiple db action with $transaction method
    cards = await db.$transaction(transaction);
  } catch (error) {
    return {
      error: "Failed to reorder"
    };
  }
  revalidatePath(`/board/${boardId}`);
  return {
    data: cards
  };
};

export const updateCardOrder = createSafeAction(UpdateCardOrder, handler);
