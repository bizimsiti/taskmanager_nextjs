"use client";

import { stripeRedirect } from "@/actions/stripeRedirect";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/useAction";
import { useProModal } from "@/hooks/useProModal";
import { toast } from "sonner";

type Props = {
  isPro: boolean;
};

const SubscriptionButton = ({ isPro }: Props) => {
  const proModal = useProModal();
  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess(data) {
      window.location.href = data;
    },
    onError(error) {
      toast.error(error);
    }
  });
  const onClick = () => {
    if (isPro) {
      execute({});
    } else {
      proModal.onOpen();
    }
  };
  return (
    <Button onClick={onClick} disabled={isLoading} variant={"primary"}>
      {isPro ? "Manage subscription" : "Upgrade to pro"}
    </Button>
  );
};

export default SubscriptionButton;
