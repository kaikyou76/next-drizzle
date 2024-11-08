import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetClerkUser = () => {
  const query = useQuery({
    queryKey: ["clerk-user"],
    queryFn: async () => {
      const response = await client.api.users.me.$get();
      if (!response.ok) {
        throw new Error("Failed to fetch clerk user");
      }
      const { data } = await response.json();
      return data;
    },
  });

  return query;
};
