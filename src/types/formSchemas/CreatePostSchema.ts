import { z } from "zod";
import { imageValidator } from "./ProfileImageSchema";

export const PostFormSchema = z.object({
  title: z
    .string()
    .min(3, "Title must contain at least 3 character(s)")
    .max(100, "Title must contain at most 100 character(s)"),
  topic: z
    .string()
    .min(3, "Topic must contain at least 3 character(s)")
    .max(100, "Topic must contain at most 100 character(s)"),
  image: imageValidator,
  body: z
    .string()
    .min(100, "Post body must contain at least 100 character(s)")
    .max(10000, "Post body must contain at most 10000 character(s)"),
});

export type TPostFormSchema = z.infer<typeof PostFormSchema>;
