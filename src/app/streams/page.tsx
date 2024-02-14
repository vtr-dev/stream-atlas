"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function StreamsPage() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  return (
    <div className="flex justify-between">
      <h1>Streams Page</h1>
      <button
        onClick={async () => {
          await supabase.auth.signOut();
          router.push("/login");
        }}
      >
        Sign Out
      </button>
    </div>
  );
}
