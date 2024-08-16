"use client";

import React from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { useProModal } from "@/hooks/useProModal";
import Image from "next/image";
import { Button } from "../ui/button";
import { useAction } from "@/hooks/useAction";
import { stripeRedirect } from "@/actions/stripeRedirect";
import { toast } from "sonner";

type Props = {};

const ProModal = (props: Props) => {
  const modal = useProModal();
  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess(data) {
      window.location.href = data;
    },
    onError(error) {
      toast.error(error);
    }
  });
  const onClick = () => {
    execute({});
  };
  return (
    <Dialog open={modal.isOpen} onOpenChange={modal.onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <div className="aspect-video relative flex items-center justify-center">
          <Image
            src={"/smooth.jpg"}
            alt="buildings"
            className="object-cover"
            fill
          />
        </div>
        <div className="text-neutral-700 mx-auto space-y-6 p-6">
          <h2 className="font-semibold text-xl">Upgrade to App Pro Today !</h2>
          <p className="text-xs font-semibold text-neutral-600">
            Explore the best of Manangment
          </p>
          <div className="pl-3">
            <ul className="text-sm list-disc">
              <li>Unlimited boards</li>
              <li>Advanced checklist</li>
              <li>Admin and security features</li>
              <li>And more!</li>
            </ul>
          </div>
          <Button
            disabled={isLoading}
            onClick={onClick}
            variant={"primary"}
            className="w-full"
          >
            Upgrade
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProModal;
