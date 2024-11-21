import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/hono";

//type ResponseType = InferResponseType<typeof client.api.profiles.$post>;
type ResponseType = InferResponseType<
  (typeof client.api.profiles)[":id"]["$patch"]
>;
//type RequestType = InferRequestType<typeof client.api.profiles.$post>["json"];
type RequestType = InferRequestType<
  (typeof client.api.profiles)[":id"]["$patch"]
>["json"];

//export const useCreateProfile = () => {
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const { id } = json;

      //const response = await client.api.profiles.$post({ json });
      const response = await client.api.profiles[":id"]["$patch"]({
        json,
        param: { id },
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Profile updated");
      queryClient.invalidateQueries({ queryKey: ["clerk-user"] });
    },
    onError: () => {
      toast.error("Failed to update profile");
    },
  });

  return mutation;
};
