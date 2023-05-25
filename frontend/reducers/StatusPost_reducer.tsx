import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface StatusPost {
  _id: any;
  author: any;
  name: any;
  profileImagePath: any;
  comments: [any];
  description: any;
  likeCount: any;
  mediaFiles: [any];
  updatedAt: any;
}

interface StatusPosts {
  arr: StatusPost[];
}

const initialState: StatusPosts = {
  arr: [],
};

const StatusPostSlice = createSlice({
  name: 'StatusPost',
  initialState,
  reducers: {
    pushStatusPosts: (state: StatusPosts, action: PayloadAction<any>) => {
      state.arr.push(action.payload);
    },
  },
});

export const {pushStatusPosts} = StatusPostSlice.actions;
export default StatusPostSlice.reducer;
