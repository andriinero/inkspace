import { z } from 'zod';

import { TopicDataSchema } from './TopicData';
import { GeneralAuthorDataSchema } from './GeneralAuthorData';

export const PostDataSchema = z.object({
  _id: z.string(),
  author: GeneralAuthorDataSchema,
  title: z.string().min(10).max(100),
  body: z.string().min(100).max(10000),
  date: z.string(),
  topic: TopicDataSchema,
  like_count: z.number().min(0),
  thumbnail_image: z.string().optional(),
});

export type PostData = z.infer<typeof PostDataSchema>;
