"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function UserNav() {
  const router = useRouter();
  return (
    <div className="flex items-center gap-3">
      <Button variant="ghost" onClick={() => router.push("/login")}>Login</Button>
      <Button onClick={() => router.push("/signup")}>Sign up</Button>
    </div>
  );
}
export default UserNav;
