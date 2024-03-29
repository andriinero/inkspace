import { RootState } from '@/app/store';
import {
  StatusNotificationData,
  StatusNotificationType,
} from '@/types/entityData/StatusNotificationData';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

type StatusNotificationState = {
  queue: StatusNotificationData[];
};

const initialState: StatusNotificationState = {
  queue: [
    { id: '0', message: 'test error notification', type: StatusNotificationType.ERROR },
  ],
};

const statusNotificationSlice = createSlice({
  name: 'statusNotification',
  initialState,
  reducers: {
    addNotification: {
      reducer(state, action: PayloadAction<StatusNotificationData>) {
        state.queue.push(action.payload);
      },
      prepare(message: string, type: StatusNotificationType) {
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

export const { addNotification, removeNotification } = statusNotificationSlice.actions;

export default statusNotificationSlice.reducer;

export const selectNotificationQueue = (state: RootState) =>
  state.statusNotification.queue;
