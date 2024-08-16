"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCardModal } from "@/hooks/useCardModal";
import { fetcher } from "@/lib/fetcher";
import { AuditLog, Card } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Header from "./header";
import Description from "./description";
import Actions from "./actions";
import Activity from "./activity";

type Props = {};

const CardModal = (props: Props) => {
  const id = useCardModal((state) => state.id);
  const isOpen = useCardModal((state) => state.isOpen);
  const onClose = useCardModal((state) => state.onClose);

  // fetch cards
  const { data: cardData } = useQuery<Card>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/api/cards/${id}`)
  });

  // fetch logs
  const { data: auditLogsData } = useQuery<AuditLog[]>({
    queryKey: ["cardLogs", id],
    queryFn: () => fetcher(`/api/cards/${id}/logs`)
  });
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {!cardData ? <Header.Skeleton /> : <Header data={cardData} />}
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
          <div className="col-span-3">
            <div className="w-full space-y-6">
              {!cardData ? (
                <Description.Skeleton />
              ) : (
                <Description data={cardData} />
              )}
              {!auditLogsData ? (
                <Activity.Skeleton />
              ) : (
                <Activity data={auditLogsData} />
              )}
            </div>
          </div>
          {!cardData ? <Actions.Skeleton /> : <Actions data={cardData} />}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CardModal;
