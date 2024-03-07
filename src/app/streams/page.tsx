"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import * as D from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import NewStreamForm from "./_new";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Stream } from "@/types";
import { toast } from "sonner";

export default function StreamsPage() {
  const [isClient, setIsClient] = useState(false);
  const [streams, setStreams] = useState<Stream[]>([]);
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const fetchStreams = async () => {
      const { data, error } = await supabase.from("streams").select();
      if (error) {
        console.log(error);
      } else {
        console.log(data);
        setStreams(data);
      }
    };
    setIsClient(true);
    fetchStreams();
  }, [supabase]);

  return (
    <div className="flex h-full w-full flex-col justify-between gap-4 p-4">
      <div className="flex w-full justify-between">
        <h1>My Streams</h1>
        <div className="flex gap-2">
          {isClient && (
            <D.Dialog>
              <D.DialogTrigger>
                <Button>New Stream</Button>
              </D.DialogTrigger>
              <D.DialogContent>
                <NewStreamForm updateStreams={setStreams} />
              </D.DialogContent>
            </D.Dialog>
          )}
          <Button
            onClick={async () => {
              await supabase.auth.signOut();
              router.push("/login");
            }}
          >
            Sign Out
          </Button>
        </div>
      </div>
      <div className="flex w-full flex-1 flex-col items-center gap-2">
        <div className="flex w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>User Progress</TableHead>
                <TableHead>User Rating</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {streams.map((stream: Stream) => (
                <TableRow key={stream.id}>
                  <TableCell className="font-medium">{stream.name}</TableCell>
                  <TableCell>{stream.status}</TableCell>
                  <TableCell>{stream.category}</TableCell>
                  <TableCell>{stream.user_progress}</TableCell>
                  <TableCell>{stream.user_rating}</TableCell>
                  <TableCell className="flex justify-end gap-2 text-right">
                    <Button variant={"ghost"}>Edit</Button>
                    <Button
                      variant={"destructive"}
                      onClick={async () => {
                        const { error } = await supabase
                          .from("streams")
                          .delete()
                          .eq("id", stream.id);
                        if (error) {
                          console.log(error);
                          toast.error("Failed to delete stream");
                        } else {
                          setStreams((prev: Stream[]) =>
                            prev.filter((s) => s.id !== stream.id),
                          );
                          toast.success("Stream deleted successfully");
                        }
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
