import { z } from 'zod';

import { TopicDataSchema } from './TopicData';
import { GeneralAuthorDataSchema } from './GeneralAuthorData';

export const PostDataSchema = z.object({
  _id: z.string(),
  author: GeneralAuthorDataSchema,
  title: z.string(),
  body: z.string(),
  date: z.string(),
  topic: TopicDataSchema,
  like_count: z.number(),
  thumbnail_image: z.string().optional(),
});

export type PostData = z.infer<typeof PostDataSchema>;
