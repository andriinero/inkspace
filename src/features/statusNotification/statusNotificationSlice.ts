import { RootState } from '@/app/store';
import { StatusNotification } from '@/types/StatusNotification';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

type StatusNotificationState = {
  queue: StatusNotification[];
};

const initialState: StatusNotificationState = {
  queue: [],
};

const statusNotificationSlice = createSlice({
  name: 'statusNotification',
  initialState,
  reducers: {
    addNotification: {
      reducer(state, action: PayloadAction<StatusNotification>) {
        state.queue.push(action.payload);
      },
      prepare(message: string) {
        const id = uuidv4();
        return {
          payload: {
            id,
            message,
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
