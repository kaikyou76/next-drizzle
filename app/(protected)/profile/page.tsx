"use client";

import { useState, useRef, ElementRef } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useCreateProfile } from "@/hooks/profiles/use-create-profile";
import { useGetClerkUser } from "@/hooks/users/use-get-clerk-user";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  message: z.string().min(2, {
    message: "Message must be at least 2 characters.",
  }),
});

const ProfilePage = () => {
  const [isEditable, setIsEditable] = useState(false);

  const formRef = useRef<ElementRef<"form">>(null);
  const textareaRef = useRef<ElementRef<"textarea">>(null);

  const { mutate, isPending } = useCreateProfile();

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
    mutate(values);
  };

  const enableEditing = () => {
    setIsEditable(true);
    setTimeout(() => {
      textareaRef.current?.focus();
      textareaRef.current?.select();
    });
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
    setIsEditable(false);
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
            <div>
              <Form {...form}>
                <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder="Hello"
                            {...field}
                            onBlur={onBlur}
                            ref={textareaRef}
                            className="w-full h-40 resize-none rounded-md"
                            disabled={false}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </div>
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
