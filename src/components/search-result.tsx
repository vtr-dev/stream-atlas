"use client";

import { MoviesList } from "@/components/movies-list";
import { Stream } from "@/entity/Stream";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

export const SearchResult = async ({
  searchTerm = "",
}: {
  searchTerm?: string;
}) => {
  const [streams, setStreams] = useState<Stream[]>([]);
  const supabase = createClientComponentClient();

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
    fetchStreams();
  }, [supabase]);

  return (
    <>
      {streams.length < 1 ? (
        <article className="grid place-items-center">
          <p>The Case of Missing Data</p>
        </article>
      ) : (
        <article>
          <MoviesList titles={streams} />
        </article>
      )}
    </>
  );
};
