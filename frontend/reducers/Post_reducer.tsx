import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface Post {
  show: boolean;
}
const initialState: Post = {
  show: false,
};

const PostSlice = createSlice({
  name: 'Post',
  initialState,
  reducers: {
    setPostShow: (state: Post, action: PayloadAction<boolean>) => {
      state.show = action.payload;
    },
  },
});

export const {setPostShow} = PostSlice.actions;
export default PostSlice.reducer;
