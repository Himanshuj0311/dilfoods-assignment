import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


// Thunks for OTP actions
export const generateOtp = createAsyncThunk('user/generateOtp', async (email) => {
  const response = await axios.post('/api/otp/generate', { email });
  return response.data;
});

export const validateOtp = createAsyncThunk('user/validateOtp', async ({ email, otp }) => {
  const response = await axios.post('/api/otp/validate', { email, otp });
  return response.data.token;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateOtp.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(generateOtp.fulfilled, (state) => {
        state.status = 'success';
      })
      .addCase(generateOtp.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(validateOtp.fulfilled, (state, action) => {
        state.token = action.payload;
        state.status = 'success';
      })
      .addCase(validateOtp.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
