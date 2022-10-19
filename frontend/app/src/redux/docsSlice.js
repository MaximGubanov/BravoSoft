import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


const headers = {'Content-Type': 'application/json'}

export const fetchDocuments = createAsyncThunk(
    'docs/fetchDocuments',
    async function () {
        try {
            const data = await axios.get('http://localhost:4000/docs')
                .then(response => response.data)
                .catch(error => {console.log(error)})
            return data
        }
        catch(err) {
            console.log(err.message)
        }
    }
)

export const makeRequestDoc = createAsyncThunk(
    'docs/makeRequestDoc',
    async function ({user_id, doc_id}, {rejectWithValue, dispatch}) {
        try {
            const data = await axios.post('http://localhost:4000/request-a-doc',
                    {'user_id': user_id, 'doc_id': doc_id},
                    {headers},
                )
                .then(response => response.data)
                .catch(error => console.log(error))
                return data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const docsSlice = createSlice({
    name: 'docs',
    initialState: {
        docs: [],
        status: null,
        error: null,
    },
    reducers: {},
    extraReducers: {
        [fetchDocuments.pending]: (state) => {
            state.status = 'loading'
            state.error = null
        },
        [fetchDocuments.fulfilled]: (state, actions) => {
            state.status = 'resolved'
            state.docs = actions.payload
        },
        [fetchDocuments.rejected]: (state, actions) => {},
        [makeRequestDoc.fulfilled]: (state, actions) => {
            alert(actions.payload.message)
        },
    }
})

// export const {getDoc} = docsSlice.actions
export default docsSlice.reducer