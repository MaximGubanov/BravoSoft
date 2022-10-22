import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


const headers = {'Content-Type': 'application/json'}

export const fetchDocuments = createAsyncThunk(
    'docs/fetchDocuments',
    async function () {
        try {
            const data = await axios.get('http://localhost:4000/documents')
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
                    {
                        'user_id': user_id, 
                        'doc_id': doc_id
                    },
                    {headers},
                )
                .then(response => response.data)
                .catch(error => console.log(error))
                dispatch(fetchDocuments())
                return data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const createDocument = createAsyncThunk(
    'docs/createDocument',
    async function ({user_id, doc_title}, {rejectWithValue, dispatch}) {
        try {
            const data = await axios.post('http://localhost:4000/document',
                    {
                        'title': doc_title, 
                        'created_by': user_id
                    },
                    {headers},
                )
                .then(response => response.data)
                .catch(error => console.log(error))
                dispatch(fetchDocuments())
                return data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const deleteDocument = createAsyncThunk(
    'docs/deleteDocument',
    async function (id, {rejectWithValue, dispatch}) {
        try {
            const data = await axios.delete(`http://localhost:4000/document/${id}`, {headers})
                .then(response => response.data)
                .catch(error => console.log(error))
                dispatch(fetchDocuments())
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
        [fetchDocuments.rejected]: (state, actions) => {
            // в доработке
            alert('Непредвиденная ошибка')
        },
        [makeRequestDoc.fulfilled]: (state, actions) => {
            // alert(actions.payload.message)
        },
        [makeRequestDoc.rejected]: () => {
            // в доработке
            alert('Непредвиденная ошибка')
        },
        [createDocument.fulfilled]: (state, actions) => {
            // alert(actions.payload.message)
        },
        [deleteDocument.fulfilled]: (state, actions) => {},
    }
})

// export const {getDoc} = docsSlice.actions
export default docsSlice.reducer