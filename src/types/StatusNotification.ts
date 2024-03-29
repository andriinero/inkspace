import { z } from 'zod';

export const StatusNotificationSchema = z.object({
  id: z.string(),
  message: z.string(),
});

export type StatusNotification = z.infer<typeof StatusNotificationSchema>;
