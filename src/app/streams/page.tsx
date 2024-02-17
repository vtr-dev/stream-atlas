"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
        <Dialog>
          <DialogTrigger>
            <Button>New Stream</Button>
          </DialogTrigger>
          <DialogContent>
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

                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="concluded">Concluded</SelectItem>
                    <SelectItem value="ongoing">Ongoing</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="anime">Anime</SelectItem>
                    <SelectItem value="movie">Movie</SelectItem>
                    <SelectItem value="series">Series</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Progress" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="not-started">Not Started</SelectItem>
                    <SelectItem value="complete">Complete</SelectItem>
                    <SelectItem value="in-progress">In progress</SelectItem>
                  </SelectContent>
                </Select>

                <Button className="w-full">Create</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
