// "use client";

// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// import * as D from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";
// import NewStreamForm from "./_new";
// import { useEffect, useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableFooter,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { toast } from "sonner";
// import Image from "next/image";
// import Link from "next/link";
// import StreamCard from "@/components/StreamCard";
// import { Stream } from "@/entity/Stream";

// // {isClient && (
// //   <D.Dialog>
// //     <D.DialogTrigger>
// //       <Button>New Stream</Button>
// //     </D.DialogTrigger>
// //     <D.DialogContent>
// //       <NewStreamForm updateStreams={setStreams} />
// //     </D.DialogContent>
// //   </D.Dialog>
// // )}

// export default function StreamsPage() {
//   const [isClient, setIsClient] = useState(false);
//   const [streams, setStreams] = useState<Stream[]>([]);
//   const supabase = createClientComponentClient();
//   const router = useRouter();

//   useEffect(() => {
//     const fetchStreams = async () => {
//       const { data, error } = await supabase.from("streams").select();
//       if (error) {
//         console.log(error);
//       } else {
//         console.log(data);
//         setStreams(data);
//       }
//     };
//     setIsClient(true);
//     fetchStreams();
//   }, [supabase]);

//   const getStreamImageSrc = (image_path: string) => {
//     const { data } = supabase.storage
//       .from("stream_images")
//       .getPublicUrl(`public/${image_path}`);

//     if (data) {
//       console.log(data);
//       return data.publicUrl;
//     }

//     return "Image not found";
//   };

//   return (
//     <div className="flex h-full w-full flex-col gap-16 p-4">
//       {/* Header */}
//       <div className="flex w-full justify-between">
//         <div className="flex gap-4">
//           <h1>My Streams</h1>
//           <Link href="/streams/new">Series</Link>
//           <Link href="/streams/new">Filmes</Link>
//           <Link href="/streams/new">Animes</Link>
//         </div>

//         <div className="flex gap-2">
//           {isClient && (
//             <D.Dialog>
//               <D.DialogTrigger>
//                 <Button>New Stream</Button>
//               </D.DialogTrigger>
//               <D.DialogContent>
//                 <NewStreamForm updateStreams={setStreams} />
//               </D.DialogContent>
//             </D.Dialog>
//           )}
//           <Button
//             onClick={async () => {
//               await supabase.auth.signOut();
//               router.push("/login");
//             }}
//           >
//             Sign Out
//           </Button>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="mx-auto grid gap-8 px-4 md:grid-cols-2 lg:grid-cols-3 lg:px-12 xl:grid-cols-4">
//         {streams.map((stream: Stream) => {
//           return <StreamCard key={stream.id} stream={stream} />;
//         })}
//       </div>
//     </div>
//   );
// }

// {
//   /* <Table>
//   <TableHeader>
//     <TableRow>
//       <TableHead className="w-[100px]">Name</TableHead>
//       <TableHead>Status</TableHead>
//       <TableHead>Category</TableHead>
//       <TableHead>User Progress</TableHead>
//       <TableHead>User Rating</TableHead>
//       <TableHead>Image</TableHead>
//       <TableHead className="text-right">Actions</TableHead>
//     </TableRow>
//   </TableHeader>
//   <TableBody>
//     {streams.map((stream: Stream) => (
//       <TableRow key={stream.id}>
//         <TableCell className="font-medium">{stream.name}</TableCell>
//         <TableCell>{stream.status}</TableCell>
//         <TableCell>{stream.category}</TableCell>
//         <TableCell>{stream.user_progress}</TableCell>
//         <TableCell>{stream.user_rating}</TableCell>
//         <TableCell>
//           <Image
//             src={
//               getStreamImageSrc(stream?.image_path).includes("null")
//                 ? "/next.svg"
//                 : getStreamImageSrc(stream?.image_path)
//             }
//             alt="Stream Image"
//             width={32}
//             height={32}
//           />
//         </TableCell>
//         <TableCell className="flex justify-end gap-2 text-right">
//           <Button variant={"ghost"}>Edit</Button>
//           <Button
//             variant={"destructive"}
//             onClick={async () => {
//               const { error } = await supabase
//                 .from("streams")
//                 .delete()
//                 .eq("id", stream.id);
//               if (error) {
//                 console.log(error);
//                 toast.error("Failed to delete stream");
//               } else {
//                 setStreams((prev: Stream[]) =>
//                   prev.filter((s) => s.id !== stream.id),
//                 );
//                 toast.success("Stream deleted successfully");
//               }
//             }}
//           >
//             Delete
//           </Button>
//         </TableCell>
//       </TableRow>
//     ))}
//   </TableBody>
// </Table>; */
// }

import { Suspense } from "react";
import Loader from "./loader";
import { SearchResult } from "@/components/search-result";
import { Hero } from "@/components/hero";

const Home = async ({
  searchParams,
}: {
  searchParams: { search?: string };
}) => {
  const totalTitles = "23";

  return (
    <main>
      <Hero searchTerm={searchParams.search} totalTitles={totalTitles} />
      <Suspense fallback={<Loader />}>
        <SearchResult searchTerm={searchParams.search} />
      </Suspense>
    </main>
  );
};

export default Home;
