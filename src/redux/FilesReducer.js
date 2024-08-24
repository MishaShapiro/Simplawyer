import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  file: null
}

export const FilesSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    addFile: (state, actions) => {
      state.file = actions.payload
    }
  },
})

export const { addFile } = FilesSlice.actions

export default FilesSlice.reducer