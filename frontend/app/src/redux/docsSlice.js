import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { address } from './config'
const { URL, PORT } = address()


const headers = {'Content-Type': 'application/json'}

export const fetchDocuments = createAsyncThunk(
    'docs/fetchDocuments',
    async function () {
        try {
            const data = await axios.get(`${URL}:${PORT}/documents`)
                .then(response => response.data)
                .catch(error => {console.log(error)})
            console.log('fetchDocuments: ', data)
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
            const data = await axios.post(`${URL}:${PORT}/order`,
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
            const data = await axios.post(`${URL}:${PORT}/document`,
                    {
                        'title': doc_title, 
                        'created_by': user_id
                    },
                    {headers},
                )
                .then(response => response.data)
                .catch(error => console.log(error))
                dispatch(addDocumentToList(data.result))
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
            const data = await axios.delete(`${URL}:${PORT}/document/${id}`, {headers})
                .then(response => response.data)
                .catch(error => console.log(error))
                dispatch(removeDocumentFromList(id))
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
        sortKey: '',
    },
    reducers: {
        addDocumentToList (state, actions) {
            state.docs = [...state.docs, actions.payload]
        },
        removeDocumentFromList (state, actions) {
            const id = actions.payload
            state.docs = state.docs.filter(item => item.id !== id)
        },
        sortDocumentByKey(state, actions) {
            console.log(actions.payload)
            if (state.sortKey === actions.payload) {
                state.docs = [...state.docs.reverse()]
            } else {
                state.sortKey = actions.payload
                state.docs = state.docs.sort((item1, item2) => item1[state.sortKey] < item2[state.sortKey] ? -1 : 1)
            }
        },
    },
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

export const { addDocumentToList, removeDocumentFromList, sortDocumentByKey } = docsSlice.actions
export default docsSlice.reducer