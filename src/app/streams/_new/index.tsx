"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

import * as S from "@/components/ui/select";
import * as F from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Stream } from "@/types";
import { X } from "lucide-react";
import { Season } from "@/entity/Season";

const NewStreamFormSchema = z.object({
  name: z.string().min(5, {
    message: "Name must be at least 5 characters long",
  }),
  status: z.enum(["concluded", "ongoing"], {
    required_error: "Status is required",
  }),
  category: z.enum(["anime", "movie", "series"], {
    required_error: "Category is required",
  }),
  user_progress: z.enum(["not-started", "complete", "in-progress"], {
    required_error: "User progress is required",
  }),
  user_rating: z.string({
    required_error: "User rating is required",
  }),
});

type Props = {
  updateStreams: Dispatch<SetStateAction<Stream[]>>;
};

function NewStreamForm({ updateStreams }: Props) {
  const supabase = createClientComponentClient();

  const [isClient, setIsClient] = useState(false);
  const [seasons, setSeasons] = useState<Season[]>([]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const form = useForm<z.infer<typeof NewStreamFormSchema>>({
    resolver: zodResolver(NewStreamFormSchema),
    defaultValues: {
      name: "",
      status: undefined,
      category: undefined,
      user_progress: undefined,
      user_rating: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof NewStreamFormSchema>) => {
    let isValid = true;
    seasons.forEach((season) => {
      if (!season.code) {
        toast.error("Season code is required");
        isValid = false;
        return;
      }
      if (!season.episodes) {
        toast.error("Season episodes is required");
        isValid = false;
        return;
      }
      if (!season.status) {
        toast.error("Season status is required");
        isValid = false;
        return;
      }
      if (!season.user_progress) {
        toast.error("Season user progress is required");
        isValid = false;
        return;
      }
    });

    if (!isValid) return;

    const { name, status, category, user_progress, user_rating } = values;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      toast.error("User not found");
      return;
    }

    const { data, error } = await supabase
      .from("streams")
      .insert({
        name,
        status,
        category,
        user_progress,
        user_id: user.id,
        user_rating: parseFloat(user_rating),
      })
      .select();

    if (error) {
      toast.error("Failed to create stream");
      console.error(error);
    } else {
      toast.success("Stream created successfully");
      if (data) {
        updateStreams((prev: Stream[]) => [...prev, data[0]]);
        seasons.forEach(async (season) => {
          const { error } = await supabase.from("seasons").insert({
            code: season.code,
            episodes: season.episodes,
            user_progress: season.user_progress,
            status: season.status,
            stream_id: data[0].id,
            user_id: user.id,
          });
          if (error) {
            toast.error("Failed to create season");
            console.error(error);
          }
        });
      }
      document.getElementById("dialog-close-button")?.click();
    }
  };

  const addSeasonField = () => {
    setSeasons([
      ...seasons,
      {
        code: null,
        episodes: null,
        user_progress: null,
        status: null,
      },
    ]);
  };

  return (
    <>
      {isClient && (
        <div className="mb-2 flex flex-col items-center justify-center gap-8">
          <h1 className="text-xl font-bold">New Stream</h1>
          <div className="max-h-[615px] overflow-y-auto p-2">
            <F.Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex w-96 flex-col items-center justify-center gap-6"
              >
                <F.FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <F.FormItem>
                      <F.FormControl>
                        <Input placeholder="Name" {...field} />
                      </F.FormControl>
                      <F.FormMessage />
                    </F.FormItem>
                  )}
                />

                <F.FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <F.FormItem>
                      <F.FormControl>
                        <S.Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <S.SelectTrigger>
                            <S.SelectValue placeholder="Status" />
                          </S.SelectTrigger>
                          <S.SelectContent>
                            <S.SelectItem value="concluded">
                              Concluded
                            </S.SelectItem>
                            <S.SelectItem value="ongoing">Ongoing</S.SelectItem>
                          </S.SelectContent>
                        </S.Select>
                      </F.FormControl>
                      <F.FormMessage />
                    </F.FormItem>
                  )}
                />

                <F.FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <F.FormItem>
                      <F.FormControl>
                        <S.Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <S.SelectTrigger>
                            <S.SelectValue placeholder="Category" />
                          </S.SelectTrigger>
                          <S.SelectContent>
                            <S.SelectItem value="anime">Anime</S.SelectItem>
                            <S.SelectItem value="movie">Movie</S.SelectItem>
                            <S.SelectItem value="series">Series</S.SelectItem>
                          </S.SelectContent>
                        </S.Select>
                      </F.FormControl>
                      <F.FormMessage />
                    </F.FormItem>
                  )}
                />

                <F.FormField
                  control={form.control}
                  name="user_progress"
                  render={({ field }) => (
                    <F.FormItem>
                      <F.FormControl>
                        <S.Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <S.SelectTrigger>
                            <S.SelectValue placeholder="User Progress" />
                          </S.SelectTrigger>
                          <S.SelectContent>
                            <S.SelectItem value="not-started">
                              Not Started
                            </S.SelectItem>
                            <S.SelectItem value="complete">
                              Complete
                            </S.SelectItem>
                            <S.SelectItem value="in-progress">
                              In progress
                            </S.SelectItem>
                          </S.SelectContent>
                        </S.Select>
                      </F.FormControl>
                      <F.FormMessage />
                    </F.FormItem>
                  )}
                />

                <F.FormField
                  control={form.control}
                  name="user_rating"
                  render={({ field }) => (
                    <F.FormItem>
                      <F.FormControl>
                        <Input placeholder="User Rating" {...field} />
                      </F.FormControl>
                      <F.FormMessage />
                    </F.FormItem>
                  )}
                />

                {seasons.map((season, index) => (
                  <div
                    key={index}
                    className="flex h-[150px] w-full flex-col gap-2 rounded-md bg-[#e9effc] p-2"
                  >
                    <div className="flex w-full items-center justify-between px-1">
                      <span>Season</span>
                      <X
                        width={16}
                        height={16}
                        className="cursor-pointer"
                        onClick={() =>
                          setSeasons(seasons.filter((_, i) => i !== index))
                        }
                      />
                    </div>
                    <div className="flex flex-col gap-2 px-1">
                      <div className="flex gap-4">
                        <Input
                          placeholder="Code"
                          onChange={(e) => {
                            e.target.value = e.target.value.replace(/\D/g, "");
                            const newSeasons = [...seasons];
                            newSeasons[index].code = parseInt(e.target.value);
                            setSeasons(newSeasons);
                          }}
                        />
                        <Input
                          placeholder="Episodes"
                          onChange={(e) => {
                            e.target.value = e.target.value.replace(/\D/g, "");
                            const newSeasons = [...seasons];
                            newSeasons[index].episodes = parseInt(
                              e.target.value,
                            );
                            setSeasons(newSeasons);
                          }}
                        />
                      </div>
                      <div className="flex gap-4">
                        <S.Select
                          onValueChange={(value: "ongoing" | "completed") => {
                            const newSeasons = [...seasons];
                            newSeasons[index].status = value;
                            setSeasons(newSeasons);
                          }}
                        >
                          <S.SelectTrigger>
                            <S.SelectValue placeholder="Status" />
                          </S.SelectTrigger>
                          <S.SelectContent>
                            <S.SelectItem value="ongoing">Ongoing</S.SelectItem>
                            <S.SelectItem value="completed">
                              Completed
                            </S.SelectItem>
                          </S.SelectContent>
                        </S.Select>

                        <S.Select
                          onValueChange={(
                            value: "not-started" | "in-progress" | "completed",
                          ) => {
                            const newSeasons = [...seasons];
                            newSeasons[index].user_progress = value;
                            setSeasons(newSeasons);
                          }}
                        >
                          <S.SelectTrigger>
                            <S.SelectValue placeholder="User Progress" />
                          </S.SelectTrigger>
                          <S.SelectContent>
                            <S.SelectItem value="not-started">
                              Not Started
                            </S.SelectItem>
                            <S.SelectItem value="in-progress">
                              In Progress
                            </S.SelectItem>
                            <S.SelectItem value="completed">
                              Completed
                            </S.SelectItem>
                          </S.SelectContent>
                        </S.Select>
                      </div>
                    </div>
                  </div>
                ))}

                <div
                  className="flex h-10 cursor-pointer items-center rounded-lg bg-[#e9effc] px-4"
                  onClick={addSeasonField}
                >
                  Add season
                </div>

                <Button type="submit" className="w-full">
                  Create
                </Button>
              </form>
            </F.Form>
          </div>
        </div>
      )}
    </>
  );
}

export default NewStreamForm;
