import { Season } from "./Season";

export type Stream = {
  id: string;
  title: string;
  user_rating: number;
  seasons: Season[];
  status: "in-progress" | "completed";
};
