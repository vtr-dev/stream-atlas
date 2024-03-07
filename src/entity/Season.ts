export type Season = {
  id?: number;
  code: number | null;
  episodes: number | null;
  user_progress: "not-started" | "in-progress" | "completed" | null;
  status: "ongoing" | "completed" | null;
};
