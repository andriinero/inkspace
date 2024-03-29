import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { RootState } from '@/app/store';
import {
  PushNotificationData,
  PushNotificationType,
} from '@/types/entityData/StatusNotificationData';

type PushNotificationState = {
  queue: PushNotificationData[];
};

const initialState: PushNotificationState = {
  queue: [
    // { id: '0', message: 'test message', type: PushNotificationType.ERROR }
  ],
};

const pushNotificationSlice = createSlice({
  name: 'pushNotification',
  initialState,
  reducers: {
    addNotification: {
      reducer(state, action: PayloadAction<PushNotificationData>) {
        const isErrorPresent = state.queue.some(
          (n) => n.message === action.payload.message
        );

        if (!isErrorPresent) state.queue.push(action.payload);
      },
      prepare(message: string, type: PushNotificationType) {
        const id = uuidv4();
        return {
          payload: {
            id,
            message,
            type,
          },
        };
      },
    },
    removeNotification(state, action: PayloadAction<string>) {
      state.queue = state.queue.filter((n) => n.id !== action.payload);
    },
  },
});

export const { addNotification, removeNotification } = pushNotificationSlice.actions;

export default pushNotificationSlice.reducer;

export const selectFirstPushNotification = (state: RootState) =>
  state.pushNotification.queue[0];

export const selectPushNotificationQueue = (state: RootState) =>
  state.pushNotification.queue;
