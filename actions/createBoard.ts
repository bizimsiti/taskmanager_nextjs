"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";
const CreateBoard = z.object({
  title: z.string().min(3, { message: "Minimum length 3 letters is required" })
});
export async function create(formData: FormData) {
  console.log(formData);
  const { title } = CreateBoard.parse({
    title: formData.get("title")
  });
  await db.board.create({
    data: {
      title
    }
  });
  revalidatePath("/organization/org_2j3qRrovVAUi9vXZLMtLfZitiaS");
}
