import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async function () {
        try {
            const data = await axios.get('http://localhost:4000/users')
                .then(response => response.data)
                .catch(error => {
                    console.log(error)
                    return error
                })
            return data
        }
        catch(err) {
            console.log(err.message)
        }
    }
)

export const deleteUser = createAsyncThunk(
    'users/deleteUser',
    
)

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        status: null,
        error: null,
    },
    reducers: {},
    extraReducers: {
        [fetchUsers.pending]: (state) => {
            state.status = 'loading'
            state.error = null
        },
        [fetchUsers.fulfilled]: (state, actions) => {
            state.status = 'resolved'
            state.users = actions.payload
        },
        [fetchUsers.rejected]: (state, actions) => {},
    }
})

// export const { } = docsSlice.actions
export default usersSlice.reducer