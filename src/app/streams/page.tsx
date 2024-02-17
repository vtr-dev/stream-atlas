"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import * as D from "@/components/ui/dialog";
import * as S from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function StreamsPage() {
  const supabase = createClientComponentClient();
  const [name, setName] = useState("");
  const router = useRouter();

  return (
    <div className="flex h-full w-full flex-col justify-between">
      <div className="flex w-full justify-between p-4">
        <h1>Streams Page</h1>
        <Button
          onClick={async () => {
            await supabase.auth.signOut();
            router.push("/login");
          }}
        >
          Sign Out
        </Button>
      </div>
      <div className="flex w-full flex-1 flex-col items-center justify-center">
        <D.Dialog>
          <D.DialogTrigger>
            <Button>New Stream</Button>
          </D.DialogTrigger>
          <D.DialogContent>
            <div className="flex items-center justify-center">
              <div className="mb-4 flex w-96 flex-col items-center justify-center gap-4">
                <h1 className="text-xl font-bold">New Stream</h1>
                <Input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                />
                <S.Select>
                  <S.SelectTrigger>
                    <S.SelectValue placeholder="Status" />
                  </S.SelectTrigger>
                  <S.SelectContent>
                    <S.SelectItem value="concluded">Concluded</S.SelectItem>
                    <S.SelectItem value="ongoing">Ongoing</S.SelectItem>
                  </S.SelectContent>
                </S.Select>
                <S.Select>
                  <S.SelectTrigger>
                    <S.SelectValue placeholder="Category" />
                  </S.SelectTrigger>
                  <S.SelectContent>
                    <S.SelectItem value="anime">Anime</S.SelectItem>
                    <S.SelectItem value="movie">Movie</S.SelectItem>
                    <S.SelectItem value="series">Series</S.SelectItem>
                  </S.SelectContent>
                </S.Select>
                <S.Select>
                  <S.SelectTrigger>
                    <S.SelectValue placeholder="Progress" />
                  </S.SelectTrigger>
                  <S.SelectContent>
                    <S.SelectItem value="not-started">Not Started</S.SelectItem>
                    <S.SelectItem value="complete">Complete</S.SelectItem>
                    <S.SelectItem value="in-progress">In progress</S.SelectItem>
                  </S.SelectContent>
                </S.Select>
                <Button className="w-full">Create</Button>
              </div>
            </div>
          </D.DialogContent>
        </D.Dialog>
      </div>
    </div>
  );
}
