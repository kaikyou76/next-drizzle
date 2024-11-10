"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  message: z.string().min(2, {
    message: "Message must be at least 2 characters.",
  }),
});

const ProfilePage = () => {
  const [isEditable, setIsEditable] = useState(false);
  const clerkUserQuery = useGetClerkUser();
  const clerkUser = clerkUserQuery.data;
  const isLoading = clerkUserQuery.isLoading;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  const enableEditing = () => {
    setIsEditable(true);
  };

  if (isLoading || !clerkUser) {
    return <div>Loading...</div>;
  }

  // console.log(clerkUser);

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

      <Card>
        <CardHeader>
          <CardTitle className="font-bold">Message</CardTitle>
          <CardDescription>Profile Message</CardDescription>
          <Separator className="my-4" />
        </CardHeader>
        <CardContent>
          {isEditable ? (
            <div>form</div>
          ) : !clerkUser.profile ? (
            <Button onClick={enableEditing}>Create Message</Button>
          ) : (
            <div className="w-full h-40 rounded-md border-2 border-gray-600">
              {clerkUser.profile.message}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
