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

const ProfilePage = () => {
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
              <AvatarImage src={""} alt="User" />
              <AvatarFallback>M</AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-center">
              <p className="text-sm truncate">user name</p>
              <p className="text-sm truncate text-muted-foreground">
                user email
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
