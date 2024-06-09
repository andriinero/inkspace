import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import type { RootState } from '@/app/store';
import {
  PushNotificationData,
  PushNotificationType,
} from '@/types/entityData/StatusNotificationData';
import capitalizeString from '@/utils/capitalizeString';

type PushNotificationState = {
  queue: PushNotificationData[];
};

const initialState: PushNotificationState = {
  queue: [
    // { id: '0', message: 'Test message', type: PushNotificationType.ERROR },
    // { id: '1', message: 'Test message', type: PushNotificationType.WARNING },
    // { id: '2', message: 'Test message', type: PushNotificationType.SUCCESS },
  ],
};

const pushNotificationSlice = createSlice({
  name: 'pushNotification',
  initialState,
  reducers: {
    addPushNotification: {
      reducer(state, action: PayloadAction<PushNotificationData>) {
        const isErrorPresent = state.queue.some(
          (n) => n.message === action.payload.message,
        );

        if (!isErrorPresent) state.queue.push(action.payload);
      },
      prepare(message: string, type: PushNotificationType) {
        const id = uuidv4();
        return {
          payload: {
            id,
            message: capitalizeString(message),
            type,
          },
        };
      },
    },
    removePushNotification(state, action: PayloadAction<string>) {
      state.queue = state.queue.filter((n) => n.id !== action.payload);
    },
  },
});

export const { addPushNotification, removePushNotification } =
  pushNotificationSlice.actions;

export default pushNotificationSlice.reducer;

export const selectHasPushNotifications = (state: RootState) =>
  state.pushNotification.queue.length > 0;

export const selectFirstPushNotification = (state: RootState) =>
  state.pushNotification.queue[0];

export const selectPushNotificationQueue = (state: RootState) =>
  state.pushNotification.queue;
