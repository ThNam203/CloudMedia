import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';

interface Story {
  _id: any;
  author: {
    _id: any;
    name: any;
    profileImagePath: any;
  };
  isLiked: any;
  mediaFiles?: {
    location: any;
    fileType: any;
    name: any;
  };
  createdAt: any;
}

interface Stories {
  Main: Story[];
  Sub: Story[];
}

const initialState: Stories = {
  Main: [],
  Sub: [],
};

const StorySlice = createSlice({
  name: 'Story',
  initialState,
  reducers: {
    pushStory: (state: Stories, action: PayloadAction<any>) => {
      state.Main.push(action.payload);
    },
    pushStorySub: (state: Stories, action: PayloadAction<any>) => {
      const index = state.Sub.findIndex(
        (item: any) => item._id === action.payload._id,
      );
      if (index === -1) state.Sub.push(action.payload);
    },
    deleteStory: (state: Stories, action: PayloadAction<any>) => {
      const index = state.Main.findIndex(
        (item: any) => item._id === action.payload,
      );
      if (index !== -1) state.Main.splice(index, 1);
    },
    toggleLike: (state: Stories, action: PayloadAction<any>) => {
      const index = state.Main.findIndex(
        (item: any) => item._id === action.payload,
      );
      if (index !== -1) state.Main[index].isLiked = !state.Main[index].isLiked;
    },
    clearStory: (state: Stories) => {
      state.Main = [];
      state.Sub = [];
    },
  },
});

export const {pushStory, pushStorySub, deleteStory, toggleLike, clearStory} =
  StorySlice.actions;
export default StorySlice.reducer;
