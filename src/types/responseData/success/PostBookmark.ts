import { z } from 'zod';

export const PostBookmarkSchema = z.object({
  _id: z.string(),
});

export type PostBookmark = z.infer<typeof PostBookmarkSchema>;
