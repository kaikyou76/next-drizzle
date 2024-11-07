"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  lavel: string;
};

export const NavListItem = ({ href, lavel }: Props) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <li>
      <Link
        href={href}
        className={cn(
          "text-slate-500 hover:text-slate-800",
          isActive && "text-slate-900"
        )}
      >
        {lavel}
      </Link>
    </li>
  );
};
