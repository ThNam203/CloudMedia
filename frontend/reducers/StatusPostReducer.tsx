import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface StatusPost {
  _id: any;
  author: any;
  name: any;
  profileImagePath: any;
  description: any;
  likeCount: any;
  commentCount: any;
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
      console.log(state.arr);
    },
    clearStatusPosts: (state: StatusPosts) => {
      state.arr = [];
    },
    toogleLike: (state: StatusPosts, action: PayloadAction<any>) => {
      state.arr.filter((item: any) => {
        if (item._id === action.payload._id) {
          item.likeCount++;
        }
      });
    },
    imcrementComment: (state: StatusPosts, action: PayloadAction<any>) => {
      state.arr.filter((item: any) => {
        if (item._id === action.payload) {
          item.commentCount++;
        }
      });
    },
  },
});

export const {pushStatusPosts, clearStatusPosts, toogleLike, imcrementComment} =
  StatusPostSlice.actions;
export default StatusPostSlice.reducer;
