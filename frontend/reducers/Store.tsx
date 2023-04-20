import {configureStore} from '@reduxjs/toolkit';
import tokenReducer from './Token_reducer';

export const Store = configureStore({
  reducer: {
    token: tokenReducer,
  },
});

export type RootState = ReturnType<typeof Store.getState>;
