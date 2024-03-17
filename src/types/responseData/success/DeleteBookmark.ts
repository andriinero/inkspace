import { z } from 'zod';

export const DeleteBookmarkSchema = z.object({
  _id: z.string(),
});

export type DeleteBookmark = z.infer<typeof DeleteBookmarkSchema>;
