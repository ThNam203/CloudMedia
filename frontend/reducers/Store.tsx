import {configureStore} from '@reduxjs/toolkit';
import tokenReducer from './Token_reducer';
import UidReducer from './Uid_reducer';
import LoadingReducer from './Loading_reducer';
import UserReducer from './User_reducer';
import PostReducer from './Post_reducer';
import NotificationReducer from './Notification_reducer';
import JobReducer from './Job_reducer';
import StatusReducer from './StatusPost_reducer';

export const Store = configureStore({
  reducer: {
    token: tokenReducer,
    uid: UidReducer,
    loading: LoadingReducer,
    userInfo: UserReducer,
    post: PostReducer,
    notifications: NotificationReducer,
    jobs: JobReducer,
    statusPost: StatusReducer,
  },
});

export type RootState = ReturnType<typeof Store.getState>;
