import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface Post {
  postShow: boolean;
}
const initialState: Post = {
  postShow: false,
};

const UtilsSlice = createSlice({
  name: 'Post',
  initialState,
  reducers: {
    setPostShow: (state: Post, action: PayloadAction<boolean>) => {
      state.postShow = action.payload;
    },
  },
});

export const {setPostShow} = UtilsSlice.actions;
export default UtilsSlice.reducer;
