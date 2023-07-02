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
  connections: any[];
  chatRooms: any[];
  userRole: string;
  profileImagePath: string;
  backgroundImagePath?: string;
  dateOfBirth: string;
  hometown: string;
  workingPlace: string;
  headline: string;
  followers: any[];
  followings: any[];
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
  backgroundImagePath: '',
  dateOfBirth: '',
  hometown: '',
  workingPlace: '',
  headline: '',
  followers: [],
  followings: [],
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
      state.backgroundImagePath = action.payload.backgroundImagePath || '';
      state.followers = action.payload.followers || [];
      state.followings = action.payload.followings || [];
      state.dateOfBirth = action.payload.dateOfBirth || '';
      state.hometown = action.payload.hometown || '';
      state.workingPlace = action.payload.workingPlace || '';
      state.headline = action.payload.headline || '';
      /// spread operator ('...') is fail.
    },
    updateAvatar: (state: UserInfo, action: PayloadAction<string>) => {
      state.profileImagePath = action.payload;
    },
    updateBackground: (state: UserInfo, action: PayloadAction<string>) => {
      state.backgroundImagePath = action.payload;
    },
    addFriend: (state: UserInfo, action: PayloadAction<any>) => {
      state.connections.push(action.payload);
    },
    unfriend: (state: UserInfo, action: PayloadAction<any>) => {
      state.connections = state.connections.filter(
        (item: any) => item._id !== action.payload,
      );
    },
  },
});

export const {saveUser, updateAvatar, updateBackground, addFriend, unfriend} =
  UserSlice.actions;
export default UserSlice.reducer;
