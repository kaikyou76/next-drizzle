"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetClerkUser } from "@/hooks/users/use-get-clerk-user";

const ProfilePage = () => {
  const clerkUserQuery = useGetClerkUser();
  const clerkUser = clerkUserQuery.data;
  const isLoading = clerkUserQuery.isLoading;

  if (isLoading || !clerkUser) {
    <div>Loading...</div>;
  }

  console.log(clerkUser);

  return (
    <div className="flex flex-col gap-y-3">
      <Card>
        <CardHeader>
          <CardTitle className="font-bold">My Profile</CardTitle>
          <CardDescription>Profile Details</CardDescription>
          <Separator className="my-4" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-x-2">
            <Avatar>
              <AvatarImage src={clerkUser?.imageUrl || ""} alt="User" />
              <AvatarFallback>M</AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-center">
              <p className="text-sm truncate">{clerkUser?.name}</p>
              <p className="text-sm truncate text-muted-foreground">
                {clerkUser?.email}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
