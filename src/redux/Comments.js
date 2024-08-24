import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  comments: [],
}

export const commentsSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addComment: (state, action) => {
        state.comments = [...state.comments, action.payload]
    },
    setComments: (state, action) => {
        if (action.payload) {
            state.comments = action.payload
        }
    }
  },
})

export const { addComment, setComments } = commentsSlice.actions

export default commentsSlice.reducer