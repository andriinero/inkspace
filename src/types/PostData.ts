import { z } from 'zod';

import { TopicDataSchema } from './TopicData';
import { PostAuthorDataSchema } from './PostAuthorData';

export const PostDataSchema = z.object({
  _id: z.string(),
  author: PostAuthorDataSchema,
  title: z.string(),
  body: z.string(),
  date: z.string(),
  topic: TopicDataSchema,
  thumbnail_image: z.string(),
});

type PostData = z.infer<typeof PostDataSchema>;

export default PostData;
