import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface StatusPost {
  _id: any;
  author: {
    _id: any;
    name: any;
    profileImagePath: any;
  };
  description: any;
  isLiked: any;
  likeCount: any;
  commentCount: any;
  mediaFiles?: {
    location: any;
    fileType: any;
    name: any;
  };
  createdAt: any;
}

interface StatusPosts {
  HomePage: StatusPost[];
  sub: StatusPost[];
}

const initialState: StatusPosts = {
  HomePage: [],
  sub: [],
};

const StatusPostSlice = createSlice({
  name: 'StatusPost',
  initialState,
  reducers: {
    pushStatusPosts: (state: StatusPosts, action: PayloadAction<any>) => {
      state.HomePage.push(action.payload);
    },
    pushStatusPostsSub: (state: StatusPosts, action: PayloadAction<any>) => {
      const index = state.sub.findIndex(
        (item: any) => item._id === action.payload._id,
      );
      if (index === -1) state.sub.push(action.payload);
    },
    updateAStatusPost: (state: StatusPosts, action: PayloadAction<any>) => {
      const status: any = state.HomePage.find(
        (item: any) => item._id === action.payload._id,
      );
      if (status) status.description = action.payload.description;
      else {
        const statusSub = state.sub.find(
          (item: any) => item._id === action.payload._id,
        );
        if (statusSub) statusSub.description = action.payload.description;
      }
    },
    deleteAStatusPost: (state: StatusPosts, action: PayloadAction<any>) => {
      const index = state.HomePage.findIndex(
        (item: any) => item._id === action.payload,
      );
      state.HomePage.splice(index, 1);
    },
    clearStatusPosts: (state: StatusPosts) => {
      state.HomePage = [];
    },
    clearStatusPostsSub: (state: StatusPosts) => {
      state.sub = [];
    },
    toogleLike: (state: StatusPosts, action: PayloadAction<any>) => {
      const status = state.HomePage.find(item => item._id == action.payload);
      if (status) {
        status.isLiked = !status.isLiked;
        if (status.isLiked) {
          status.likeCount++;
        } else {
          status.likeCount--;
        }
      } else {
        const statusSub = state.sub.find(item => item._id === action.payload);
        if (statusSub) {
          statusSub.isLiked = !statusSub.isLiked;
          if (statusSub.isLiked) {
            statusSub.likeCount++;
          } else {
            statusSub.likeCount--;
          }
        }
      }
    },
    imcrementComment: (state: StatusPosts, action: PayloadAction<any>) => {
      state.HomePage.filter(item => {
        if (item._id === action.payload) {
          item.commentCount++;
          return;
        }
      });
      state.sub.filter(item => {
        if (item._id === action.payload) {
          item.commentCount++;
        }
      });
    },
    decrementComment: (state: StatusPosts, action: PayloadAction<any>) => {
      state.HomePage.filter(item => {
        if (item._id === action.payload) {
          item.commentCount--;
          return;
        }
      });
      state.sub.filter(item => {
        if (item._id === action.payload) {
          item.commentCount--;
        }
      });
    },
  },
});

export const {
  pushStatusPosts,
  pushStatusPostsSub,
  updateAStatusPost,
  deleteAStatusPost,
  clearStatusPosts,
  clearStatusPostsSub,
  toogleLike,
  imcrementComment,
  decrementComment,
} = StatusPostSlice.actions;
export default StatusPostSlice.reducer;
