import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface Notification {
  _id: any;
  userId: any;
  logo: any;
  notificationType: any;
  content: any;
  sender: {
    _id: any;
    name: any;
    profileImagePath: any;
  };
  isRead: boolean;
  createdAt: any;
}

interface Notifications {
  arr: Notification[];
  numberNoti: number;
}

const initialState: Notifications = {
  arr: [],
  numberNoti: 0,
};

const NotificationSlice = createSlice({
  name: 'Notification',
  initialState,
  reducers: {
    setNotifications: (state: Notifications, action: PayloadAction<any>) => {
      state.numberNoti = 0;
      action.payload.map((item: any) => {
        state.arr.unshift(item);
        if (!item.isRead) {
          state.numberNoti++;
        }
      });
    },
    setNumberNoti: (state: Notifications) => {
      state.numberNoti = 0;
    },
    clearNotifications: (state: Notifications) => {
      state.arr = [];
    },
  },
});

export const {setNotifications, setNumberNoti, clearNotifications} =
  NotificationSlice.actions;
export default NotificationSlice.reducer;
