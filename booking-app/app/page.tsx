import { redirect } from "next/navigation";
import { auth } from "./auth";
import { SignOut } from "./components/sign-out";

export default async function Home() {
  const session = await auth();
  if (!session) redirect("login");

  return (
    <main>
      <p>hello world</p>
      <p className="font-medium">{session.user?.email}</p>
      <SignOut />
    </main>
  );
}
