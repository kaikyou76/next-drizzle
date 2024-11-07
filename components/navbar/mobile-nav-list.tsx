"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type Props = {
  navItem: {
    href: string;
    lavel: string;
  }[];
};

export const MobileNavList = ({ navItem }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const onClick = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Menu className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>My App</SheetTitle>
          <SheetDescription>Menu</SheetDescription>
          <Separator className="my-4" />
          <ul className="flex flex-col items-center justify-center gap-y-2">
            {navItem.map((item) => (
              <li key={item.lavel} className="w-full">
                <Button
                  disabled={pathname === item.href}
                  variant="ghost"
                  onClick={() => onClick(item.href)}
                  className={cn(
                    "w-full text-slate-500 hover:text-slate-800",
                    pathname === item.href && "bg-slate-800 text-white"
                  )}
                >
                  {item.lavel}
                </Button>
              </li>
            ))}
          </ul>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
