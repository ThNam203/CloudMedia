import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface Utils {
  postShow: boolean;
  share: {
    visible: boolean;
    link: string;
  };
}
const initialState: Utils = {
  postShow: false,
  share: {
    visible: false,
    link: '',
  },
};

const UtilsSlice = createSlice({
  name: 'Ultis',
  initialState,
  reducers: {
    setPostShow: (state: Utils, action: PayloadAction<boolean>) => {
      state.postShow = action.payload;
    },
    setShareShow: (state: Utils, action: PayloadAction<boolean>) => {
      state.share.visible = action.payload;
    },
    setShareLink: (state: Utils, action: PayloadAction<string>) => {
      state.share.link = action.payload;
    },
  },
});

export const {setPostShow, setShareShow, setShareLink} = UtilsSlice.actions;
export default UtilsSlice.reducer;
