import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface UserInfo {
  name: string;
  email: string;
  phoneNumber: string;
  location: string;
  company: {
    logoUrl: string;
    name: string;
    linkToWebsite: string;
  };
  connections: [];
  chatRooms: [];
  userRole: string;
  profileImagePath: string;
}
const initialState: UserInfo = {
  name: '',
  email: '',
  phoneNumber: '',
  location: '',
  company: {
    logoUrl: '',
    name: '',
    linkToWebsite: '',
  },
  connections: [],
  chatRooms: [],
  userRole: '',
  profileImagePath: '',
};

const UserSlice = createSlice({
  name: 'UserInfo',
  initialState,
  reducers: {
    saveUser: (state: UserInfo, action: PayloadAction<UserInfo>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.phoneNumber = action.payload.phoneNumber;
      state.location = action.payload.location || '';

      if (action.payload.company) {
        state.company.name = action.payload.company.name;
        state.company.logoUrl = action.payload.company.logoUrl;
        state.company.linkToWebsite = action.payload.company.linkToWebsite;
      }

      state.connections = action.payload.connections || []; /// null
      state.chatRooms = action.payload.chatRooms || [];
      state.userRole = action.payload.userRole;
      state.profileImagePath = action.payload.profileImagePath || '';
      /// spread operator ('...') is fail. fuck
    },
    updateAvatar: (state: UserInfo, action: PayloadAction<string>) => {
      state.profileImagePath = action.payload;
    },
  },
});

export const {saveUser, updateAvatar} = UserSlice.actions;
export default UserSlice.reducer;
