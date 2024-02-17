"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex w-full items-center justify-between p-4">
        <div>STREAM ATLAS</div>
        <Button onClick={() => router.push("/login")}>Sign In</Button>
      </div>
      <div className="flex w-full flex-1 flex-col items-center justify-center">
        Content
      </div>
      <div className="flex w-full items-center justify-center gap-8 p-4">
        Desenvolvido por vTech
      </div>
    </div>
  );
}
