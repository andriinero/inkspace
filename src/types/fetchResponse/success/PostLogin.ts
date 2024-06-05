import { z } from "zod";

export const PostLoginSchema = z.object({
  message: z.string(),
  token: z.string(),
});

export type PostLogin = z.infer<typeof PostLoginSchema>;
