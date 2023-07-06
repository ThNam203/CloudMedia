import {configureStore} from '@reduxjs/toolkit';
import tokenReducer from './TokenReducer';
import UidReducer from './UidReducer';
import LoadingReducer from './LoadingReducer';
import UserReducer from './UserReducer';
import UtilsReducer from './UtilsReducer';
import NotificationReducer from './NotificationReducer';
import StatusReducer from './StatusPostReducer';
import StoryReducer from './StoryReducer';

export const Store = configureStore({
  reducer: {
    token: tokenReducer,
    uid: UidReducer,
    loading: LoadingReducer,
    userInfo: UserReducer,
    Utils: UtilsReducer,
    notifications: NotificationReducer,
    statusPost: StatusReducer,
    story: StoryReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof Store.getState>;
