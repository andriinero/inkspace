import { z } from 'zod';

import { TopicSchema } from './Topic';
import { AuthorSchema } from './Author';

export const PostSchema = z.object({
  _id: z.string(),
  author: AuthorSchema,
  title: z.string(),
  body: z.string(),
  date: z.string(),
  topic: TopicSchema,
  thumbnail_image: z.string(),
});

type Post = z.infer<typeof PostSchema>;

export default Post;
