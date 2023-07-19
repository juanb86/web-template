import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import Image from "next/image";
import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import type { CollapsibleTriggerProps } from "@radix-ui/react-collapsible";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="relative z-10 -mb-20 w-full shadow-[0_1px_0px_0px_rgba(255,255,255,0.17)]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 justify-between">
          <div className="flex">
            <div className="-ml-2 mr-2 flex items-center md:hidden">
              <CollapsibleTrigger
                asChild
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                {isOpen ? (
                  <Cross1Icon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <HamburgerMenuIcon
                    className="block h-6 w-6"
                    aria-hidden="true"
                  />
                )}
              </CollapsibleTrigger>
            </div>
            <div className="flex flex-shrink-0 items-center">
              <Image
                className="block h-8 w-auto lg:hidden"
                src="/static/logo.svg"
                alt="Workflow"
                height={32}
                width={38}
              />
              <Image
                className="hidden h-8 w-auto lg:block"
                src="/static/logo.svg"
                alt="Workflow"
                height={32}
                width={38}
              />
            </div>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <NavItem href="#">Home</NavItem>
              <NavItem href="#">About us</NavItem>
              <NavItem href="#">Services</NavItem>
              <NavItem href="#">Contact us</NavItem>
              <NavItem href="#">Pages</NavItem>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Button size="sm">
                <span>Get started</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <CollapsibleContent className="md:hidden">
        <div className="space-y-1 pb-3 pt-2">
          <NavTrigger>Home</NavTrigger>
          <NavTrigger>About us</NavTrigger>
          <NavTrigger>Services</NavTrigger>
          <NavTrigger>Contact us</NavTrigger>
          <NavTrigger>Pages</NavTrigger>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

const NavItem = (props: React.HTMLProps<HTMLAnchorElement>) => (
  <a
    className="text-md inline-flex cursor-pointer items-center border-b-2 border-transparent px-1 pt-1 font-semibold text-white hover:border-white hover:text-primary"
    {...props}
  />
);

const NavTrigger = (
  props: CollapsibleTriggerProps & React.RefAttributes<HTMLButtonElement>
) => (
  <CollapsibleTrigger
    className="block w-full border-l-4 border-transparent py-2 pl-3 pr-4 text-left text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
    {...props}
  />
);
