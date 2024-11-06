import Link from "next/link";
import { Loader2 } from "lucide-react";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  ClerkLoading,
  ClerkLoaded,
} from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

const navItem = [
  { heaf: "/", label: "Home" },
  { heaf: "/profile", label: "Profile" },
];

export const Navber = () => {
  return (
    <div className="w-full py-3 px-6">
      <div className="w-full max-w-screen-2xl mx-auto flex items-center justify-between">
        <Link href="/">
          <h1 className="text-2xl font-bold">My App</h1>
          <p className="text-sm font-semibold text-muted-foreground">
            Nextjs Hnono Drizzle
          </p>
        </Link>
        <nav className="flex items-center gap-x-3">
          <div>{/* navigaiton */}</div>
          <ClerkLoading>
            <div className="flex items-center justify-center">
              <Loader2 className="size-7 animate-spin" />
            </div>
          </ClerkLoading>
          <ClerkLoaded>
            <SignedOut>
              <Button asChild>
                <SignInButton />
              </Button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </ClerkLoaded>
        </nav>
      </div>
    </div>
  );
};
