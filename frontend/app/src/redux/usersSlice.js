import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


const headers = {'Content-Type': 'application/json'}

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

export const createUser = createAsyncThunk(
    'users/createUser',
    async function ({firstname, lastname, surname}, {rejectWithValue, dispatch}) {
        try {
            const data = await axios.post('http://localhost:4000/user',{
                'firstname': firstname,
                'lastname': lastname,
                'surname': surname,
            }, {headers})
                .then(response => response.data)
                .catch(error => {
                    console.log(error)
                    return error
                })
            dispatch(addUserToList(data))
            return data
        }
        catch(error) {
            return rejectWithValue(error.message)
        }
    }
)

export const deleteUser = createAsyncThunk(
    'users/deleteUser',
    async function (id, {rejectWithValue, dispatch}) {
        try {
            const data = await axios.delete(`http://localhost:4000/user/${id}`, {headers})
                .then(response => response.data)
                .catch(error => {
                    console.log(error)
                    return error
                })
            dispatch(removeUserFromList(id))
            // dispatch(fetchDocuments())
            return data
        }
        catch(error) {
            return rejectWithValue(error.message)
        }
    }
)

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        status: null,
        error: null,
    },
    reducers: {
        addUserToList (state, actions) {
            state.users = [...state.users, actions.payload.result]
        },
        removeUserFromList (state, actions) {
            const id = actions.payload
            state.users = state.users.filter(item => item.id !== id)
        },
    },
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

export const { addUserToList, removeUserFromList } = usersSlice.actions
export default usersSlice.reducer