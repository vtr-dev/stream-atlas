"use client";

import { Stream } from "@/entity/Stream";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";

const MovieCard = ({ data }: { data: Stream }) => {
  const supabase = createClientComponentClient();

  const getStreamImageSrc = (image_path: string) => {
    const { data } = supabase.storage
      .from("stream_images")
      .getPublicUrl(`public/${image_path}`);

    if (data) {
      console.log(data);
      return data.publicUrl;
    }

    return "Image not found";
  };

  const { name, id, image_path } = data;

  const coverUrl = getStreamImageSrc(image_path);
  const summary =
    "This is a summary This is a summary This is a summary This is a summary This is a summaryThis is a summaryThis is a summary This is a summaryvThis is a summary This is a summary This is a summary";
  const genres = ["Action", "Adventure"];

  return (
    <Link href={`/movie/${id}`} className="block outline-none">
      <li className="relative mx-auto flex h-full w-full max-w-md overflow-hidden rounded-xl bg-slate-950 text-white shadow-lg transition duration-500 ease-in-out after:absolute after:inset-0 after:bg-gradient-to-t after:from-black after:via-slate-900 after:to-transparent focus-within:outline focus-within:outline-pink-600 hover:-translate-y-2 hover:shadow-2xl">
        <div className="group relative z-10 px-6 pb-10">
          <header className="inner flex flex-col pb-8">
            <h2 className="flex min-h-[4rem] flex-col justify-center pb-4 pt-40 text-2xl font-bold text-white">
              {name}
            </h2>

            <ul className="mb-0 inline-flex gap-2 pt-3 text-sm text-white">
              {genres?.map((genre) => (
                <li
                  key={id + genre}
                  className="rounded-lg border px-2 py-1 text-xs"
                >
                  {genre}
                </li>
              ))}
            </ul>
          </header>
          {summary && (
            <p className="pb-8 pt-2 text-sm text-slate-100">
              {summary.length > 260 ? summary.substring(0, 250) + "…" : summary}
            </p>
          )}
        </div>

        {coverUrl?.startsWith("http") && !coverUrl?.endsWith("null") ? (
          <picture>
            <source srcSet={coverUrl} type="image/webp" />
            <img
              src={coverUrl}
              alt={`Poster for "${name}"`}
              className="absolute inset-0 w-full -translate-y-4 transform grayscale-[0.7]"
            />
          </picture>
        ) : (
          <picture>
            <img
              src="/placeholder.jpg"
              alt="Placeholder image"
              className="absolute inset-0 w-full -translate-y-4 transform"
            />
          </picture>
        )}
      </li>
    </Link>
  );
};

export const MoviesList = async ({ titles }: { titles: Stream[] }) => {
  return (
    <ul className="container mx-auto grid gap-8 px-4 md:grid-cols-2 lg:grid-cols-3 lg:px-12 xl:grid-cols-4">
      {titles.map((movie) => (
        <MovieCard key={movie.id} data={movie} />
      ))}
    </ul>
  );
};
