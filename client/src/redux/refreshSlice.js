import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shouldRefresh: false,
};

const refreshSlice = createSlice({
  name: "refresh",
  initialState,
  reducers: {
    setShouldRefresh: (state, action) => {
      state.shouldRefresh = action.payload;
    },
  },
});

export const { setShouldRefresh } = refreshSlice.actions;
export default refreshSlice.reducer;
