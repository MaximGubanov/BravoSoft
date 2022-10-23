import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { fetchDocuments } from '../redux/docsSlice'
import { fetchUsers } from '../redux/usersSlice'
import { DocumentForm } from '../components/Forms/DocumentForm'
import { DocumentsList } from '../components/Tables/DocumentsList'
import { CreateDocumentForm } from '../components/Forms/CreateDocumentForm'


export const DocumentsPage = () => {
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(fetchDocuments())
      dispatch(fetchUsers())
    }, [dispatch])

    const documents = useSelector(state => state.docs.docs)
    const users = useSelector(state => state.users.users)

    return (
        <>
            <DocumentForm users={users} /> 
            <DocumentsList documents={documents} /> 
            <CreateDocumentForm users={users} />  
        </>
    )
}