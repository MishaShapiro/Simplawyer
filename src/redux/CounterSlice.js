import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  changes: 0,
  comments: 0,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    incrementChanges: (state) => {
      state.changes += 1
    },
    setChangesCount: (state, action) => {
        if (action.payload) {
            state.changes = action.payload
        }
    },
    incrementComments: (state) => {
      state.comments += 1
    },
    setCommentsCount: (state, action) => {
        if (action.payload) {
            state.comments = action.payload
        }
    }
  },
})

export const { incrementChanges, incrementComments, setChangesCount, setCommentsCount } = counterSlice.actions

export default counterSlice.reducer