import { z } from 'zod';

export const TopicDataSchema = z.object({
  _id: z.string(),
  name: z.string().min(3).max(100),
});

export type TopicData = z.infer<typeof TopicDataSchema>;
