import { auth, signOut } from "@/auth";
import Link from "next/link";
import { SwitchThemeButton } from "./components/switch-theme-button";

export default async function Home() {
  const session = await auth();

  return (
    <div className="flex flex-col gap-10">
      <h1>Hello {session?.user?.email || "Guest"}</h1>
      <button
        onClick={async () => {
          "use server";
          await signOut();
        }}
      >
        Sign Out
      </button>
      <Link href={"/login"}>login page</Link>
      <SwitchThemeButton />
    </div>
  );
}
