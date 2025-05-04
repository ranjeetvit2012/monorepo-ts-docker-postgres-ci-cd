import db from "@repo/db/client";

export default async function Home() {
  const allUsers = await db.user.findMany();

  return (
    <div>
      <h1>All Users</h1>
      <ul>
        {allUsers.map((user:any) => (
          <><li key={user.id}>{user.username}</li><li key={user.id}>{user.password}</li></>
        ))}
      </ul>
    </div>
  );
}

