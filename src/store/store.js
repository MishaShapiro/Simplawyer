import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../redux/CounterSlice'
import FilesReducer from '../redux/FilesReducer'
import CommentsReducer from '../redux/Comments'
import DownloadReducer from '../redux/Download'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    files: FilesReducer,
    comments: CommentsReducer,
    download: DownloadReducer
},
})