"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import db from "@/lib/db";
import { createSafeAction } from "@/lib/createSafeAction";
import { StripeRedirect } from "./schema";

import { absoluteUrl } from "@/lib/utils";
import { stripe } from "@/lib/stripe";
import { revalidatePath } from "next/cache";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  const user = await currentUser();
  if (!userId || !orgId || !user) {
    return {
      error: "Unauthrized"
    };
  }
  const settingsUrl = absoluteUrl(`/organization/${orgId}`);
  let url = "";
  try {
    const orgSub = await db.orgSubscription.findUnique({
      where: { orgId }
    });
    if (orgSub && orgSub.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: orgSub.stripeCustomerId,
        return_url: settingsUrl
      });
      url = stripeSession.url;
    } else {
      const stripeSession = await stripe.checkout.sessions.create({
        success_url: settingsUrl,
        cancel_url: settingsUrl,
        payment_method_types: ["card"],
        mode: "subscription",
        billing_address_collection: "auto",
        customer_email: user?.emailAddresses[0].emailAddress,
        line_items: [
          {
            price_data: {
              currency: "USD",
              product_data: {
                name: "task manangment PRO",
                description: "Unlimited boards for your organizations"
              },
              unit_amount: 2000,
              recurring: {
                interval: "month"
              }
            },
            quantity: 1
          }
        ],
        metadata: {
          orgId
        }
      });
      url = stripeSession.url || "";
    }
  } catch (error) {
    return {
      error: "someting went wrong"
    };
  }
  revalidatePath(`/organization/${orgId}`);
  return { data: url };
};

export const stripeRedirect = createSafeAction(StripeRedirect, handler);
