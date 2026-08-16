import { z } from 'zod';

export enum PushNotificationType {
  ERROR = 'error',
  WARNING = 'warning',
  SUCCESS = 'success',
}

export const PushNotificationDataSchema = z.object({
  id: z.string(),
  message: z.string(),
  type: z.nativeEnum(PushNotificationType),
});

export type PushNotificationData = z.infer<typeof PushNotificationDataSchema>;
