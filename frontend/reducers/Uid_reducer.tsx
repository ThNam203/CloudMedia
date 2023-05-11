import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';

interface Uid {
  id: string;
}
const initialState: Uid = {
  id: 'null',
};

const UidSlice = createSlice({
  name: 'Uid',
  initialState,
  reducers: {
    setIdFromJwt: (state: Uid, action: PayloadAction<string>) => {
      const json = jwt_decode(action.payload) as {id: string};
      state.id = json.id;
    },
  },
});

export const {setIdFromJwt} = UidSlice.actions;
export default UidSlice.reducer;
