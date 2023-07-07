import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface Utils {
  postShow: boolean;
  share: {
    visible: boolean;
    link: string;
  };
  call: {
    visible: boolean;
    data: any;
  };
}
const initialState: Utils = {
  postShow: false,
  share: {
    visible: false,
    link: '',
  },
  call: {
    visible: false,
    data: {},
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
    setCallShow: (state: Utils, action: PayloadAction<boolean>) => {
      state.call.visible = action.payload;
    },
    setDataCall: (state: Utils, action: PayloadAction<any>) => {
      state.call.data = action.payload;
    },
  },
});

export const {
  setPostShow,
  setShareShow,
  setShareLink,
  setCallShow,
  setDataCall,
} = UtilsSlice.actions;
export default UtilsSlice.reducer;
