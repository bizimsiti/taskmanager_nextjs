import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import React from "react";
import MobileSidebar from "./mobile-sidebar";
import FormPop from "@/components/form/formPop";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <nav className="fixed z-50 px-4 top-0 w-full h-14 border-b shadow-sm bg-white flex items-center">
      <MobileSidebar />
      <div className="flex items-center gap-x-4">
        <div className="hidden md:flex">
          <Logo />
        </div>
        <FormPop align="start" side="bottom" sideOffset={18}>
          <Button
            size="sm"
            className="rounded-sm hidden md:block h-auto py-1.5 px-2"
            variant="primary"
          >
            Create
          </Button>
        </FormPop>
        <FormPop>
          <Button
            size="sm"
            className="rounded-sm block md:hidden"
            variant="primary"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </FormPop>
      </div>
      <div className="ml-auto flex items-center gap-x-2">
        <OrganizationSwitcher
          hidePersonal
          afterCreateOrganizationUrl="/organization/:id"
          afterLeaveOrganizationUrl="/org-select"
          afterSelectOrganizationUrl="/organization/:id"
        />
        <UserButton />
      </div>
    </nav>
  );
};

export default Navbar;
