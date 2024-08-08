"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCardModal } from "@/hooks/useCardModal";
import { fetcher } from "@/lib/fetcher";
import { Card } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Header from "./header";

type Props = {};

const CardModal = (props: Props) => {
  const id = useCardModal((state) => state.id);
  const isOpen = useCardModal((state) => state.isOpen);
  const onClose = useCardModal((state) => state.onClose);
  const { data: cardData } = useQuery<Card>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/api/cards/${id}`)
  });
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {!cardData ? <Header.Skeleton /> : <Header data={cardData} />}
      </DialogContent>
    </Dialog>
  );
};

export default CardModal;
