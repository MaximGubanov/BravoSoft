import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


export const fetchDocuments = createAsyncThunk(
    'docs/fetchDocuments',
    async function () {
        try {
            const data = await axios.get('http://localhost:4000/docs')
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
    }
})

// export const {getDoc} = docsSlice.actions
export default docsSlice.reducer