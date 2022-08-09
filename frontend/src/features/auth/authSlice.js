import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService'

// Get user from localstorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

//register new user
export const register = createAsyncThunk(('auth/register'),
  async (user, thunkAPI) => {
    try {
      return await authService.register(user)
    }
    catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  })

//login user                      
export const login = createAsyncThunk(('auth/login'),
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData)
    }
    catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  })


//logout user
export const logout = createAsyncThunk(('auth/logout'),
  () => {
    authService.logout()
  })


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ''

      console.log('States isLoading:', state.isLoading)
      console.log('States isError:', state.isLoading)
      console.log('States isSuccess:', state.isLoading)
      console.log('States message:', state.message)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
        console.log('In register.fulfilled:', state.isLoading, state.isSuccess, state.user)
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
        console.log('In register.fulfilled:', state.isLoading, state.isSuccess, state.user)
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
        console.log('Action:', action)
        console.log('In register.rejected:', state.isLoading, state.isSuccess)
        console.log('State.user:', state.user)
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = null
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
  }
})

export const { reset } = authSlice.actions
export default authSlice.reducer