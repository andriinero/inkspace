import { z } from 'zod';

export const TopicSchema = z.object({
  _id: z.string(),
  name: z.string(),
});

export type Topic = z.infer<typeof TopicSchema>;
