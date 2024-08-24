import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isDownload: false,
}

export const downloadSlice = createSlice({
  name: 'download',
  initialState,
  reducers: {
    setIsDownload: (state, action) => {
        state.isDownload = action.payload
    }
  },
})

export const { setIsDownload } = downloadSlice.actions

export default downloadSlice.reducer