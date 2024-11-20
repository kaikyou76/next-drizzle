import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.profiles.$post>;
type RequestType = InferRequestType<typeof client.api.profiles.$post>["json"];

export const useCreateProfile = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.profiles.$post({ json });

      if (!response.ok) {
        throw new Error("Failed to create profile");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Profile created");
      queryClient.invalidateQueries({ queryKey: ["clerk-user"] });
    },
    onError: () => {
      toast.error("Failed to create profile");
    },
  });

  return mutation;
};
