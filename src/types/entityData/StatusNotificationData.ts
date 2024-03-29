import { z } from 'zod';

export enum StatusNotificationType {
  ERROR = 'error',
  WARNING = 'warning',
  SUCCESS = 'success',
}

export const StatusNotificationDataSchema = z.object({
  id: z.string(),
  message: z.string(),
  type: z.nativeEnum(StatusNotificationType),
});

export type StatusNotificationData = z.infer<typeof StatusNotificationDataSchema>;
