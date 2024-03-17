import { z } from 'zod';

export const TargetObjectIdSchema = z.object({
  _id: z.string(),
});

export type TargetObjectId = z.infer<typeof TargetObjectIdSchema>;
