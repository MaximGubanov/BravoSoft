import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { address } from './config'
const { URL, PORT } = address()


const headers = {'Content-Type': 'application/json'}

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async function () {
        try {
            const data = await axios.get(`${URL}:${PORT}/users`)
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
            const data = await axios.post(`${URL}:${PORT}/user`, {
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
            const data = await axios.delete(`${URL}:${PORT}/user/${id}`, {headers})
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
        sortKey: '',
    },
    reducers: {
        addUserToList (state, actions) {
            state.users = [...state.users, actions.payload.result]
        },
        removeUserFromList (state, actions) {
            const id = actions.payload
            state.users = state.users.filter(item => item.id !== id)
        },
        sortUserByKey(state, actions) {
            if (state.sortKey === actions.payload) {
                state.users = [...state.users.reverse()]
            } else {
                state.sortKey = actions.payload
                state.users = state.users.sort((item1, item2) => item1[state.sortKey] < item2[state.sortKey] ? -1 : 1)
            }
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

export const { addUserToList, removeUserFromList, sortUserByKey } = usersSlice.actions
export default usersSlice.reducer