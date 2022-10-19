import { configureStore } from '@reduxjs/toolkit'

import docsReducer from './docsSlice'
import usersSlice from './usersSlice'


export default configureStore({
    reducer: {
        docs: docsReducer,
        users: usersSlice,
    }
})