"use client";

import { useGetUsers } from "@/hooks/users/use-get-users";

export default function Home() {
  const usersQuery = useGetUsers();
  const users = usersQuery.data || [];
  const isLoading = usersQuery.isLoading;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          users.map((user) => <div key={user.id}>{user.name}</div>)
        )}
      </div>
    </main>
  );
}
