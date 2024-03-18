import { z } from 'zod';

export const TopicDataSchema = z.object({
  _id: z.string(),
  name: z.string(),
});

export type TopicData = z.infer<typeof TopicDataSchema>;
