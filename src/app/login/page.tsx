"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const supabase = createClientComponentClient();

  const handleSignIn = async () => {
    const {
      data: { user },
    } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (user) router.push("/streams");
    else toast.error("Invalid email or password");
  };

  return (
    <main className="flex h-full w-full items-center justify-center p-6">
      <div className="flex w-96 flex-col gap-4">
        <h1 className="text-2xl font-bold">Login</h1>
        <Input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <Input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <Button onClick={handleSignIn}>Sign In</Button>
      </div>
    </main>
  );
}
