import Link from "next/link";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { Separator } from "../ui/separator";

type Props = {
  navItem: {
    href: string;
    lavel: string;
  }[];
};

export const MobileNavList = ({ navItem }: Props) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"outline"}>
          <Menu className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>My App</SheetTitle>
          <SheetDescription>Menu</SheetDescription>
          <Separator className="my-4" />
          <ul className="flex flex-col items-center justify-center gap-y-2">
            <li>
              <Link href="/">Home</Link>
            </li>
          </ul>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
