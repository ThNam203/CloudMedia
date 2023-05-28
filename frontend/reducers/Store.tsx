import {configureStore} from '@reduxjs/toolkit';
import tokenReducer from './TokenReducer';
import UidReducer from './UidReducer';
import LoadingReducer from './LoadingReducer';
import UserReducer from './UserReducer';
import PostReducer from './PostReducer';
import NotificationReducer from './NotificationReducer';
import StatusReducer from './StatusPostReducer';

export const Store = configureStore({
  reducer: {
    token: tokenReducer,
    uid: UidReducer,
    loading: LoadingReducer,
    userInfo: UserReducer,
    post: PostReducer,
    notifications: NotificationReducer,
    statusPost: StatusReducer,
  },
});

export type RootState = ReturnType<typeof Store.getState>;
