import ModalProvider from "@/components/providers/modalProvider";
import { QueryProvider } from "@/components/providers/queryProvider";
import { ClerkProvider } from "@clerk/nextjs";

import React from "react";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <QueryProvider>
        <ModalProvider />
        {children}
      </QueryProvider>
    </ClerkProvider>
  );
}

export default Providers;
