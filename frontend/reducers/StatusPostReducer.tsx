import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface StatusPost {
  _id: any;
  author: any;
  name: any;
  profileImagePath: any;
  description: any;
  isLiked: any;
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
    },
    updateAStatusPost: (state: StatusPosts, action: PayloadAction<any>) => {
      const status: any = state.arr.find(
        (item: any) => item._id === action.payload._id,
      );
      status.description = action.payload.description;
    },
    deleteAStatusPost: (state: StatusPosts, action: PayloadAction<any>) => {
      const index = state.arr.findIndex(
        (item: any) => item._id === action.payload,
      );
      state.arr.splice(index, 1);
    },
    clearStatusPosts: (state: StatusPosts) => {
      state.arr = [];
    },
    toogleLike: (state: StatusPosts, action: PayloadAction<any>) => {
      state.arr.find((item: any) => {
        if (item._id === action.payload) {
          item.isLiked = !item.isLiked;
          if (item.isLiked) {
            item.likeCount++;
          } else {
            item.likeCount--;
          }
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
    decrementComment: (state: StatusPosts, action: PayloadAction<any>) => {
      state.arr.filter((item: any) => {
        if (item._id === action.payload) {
          item.commentCount--;
        }
      });
    },
  },
});

export const {
  pushStatusPosts,
  updateAStatusPost,
  deleteAStatusPost,
  clearStatusPosts,
  toogleLike,
  imcrementComment,
  decrementComment,
} = StatusPostSlice.actions;
export default StatusPostSlice.reducer;
