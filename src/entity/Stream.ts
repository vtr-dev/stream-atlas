export type Stream = {
  id: number;
  user_id: string;
  name: string;
  status: "ongoing" | "concluded" | "not-started" | "hiatus";
  category: "anime" | "movie" | "series";
  user_progress: "in-progress" | "complete" | "not-started" | "dropped";
  user_rating: number;
  image_path: string;
  created_at: string;
  updated_at: string;
};
