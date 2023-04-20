import {configureStore} from '@reduxjs/toolkit';
import tokenReducer from './Token_reducer';
import UidReducer from './Uid_reducer';

export const Store = configureStore({
  reducer: {
    token: tokenReducer,
    uid: UidReducer,
  },
});

export type RootState = ReturnType<typeof Store.getState>;
