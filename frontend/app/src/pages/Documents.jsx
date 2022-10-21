import React from 'react'
import { useSelector } from 'react-redux'

import { DocumentForm } from '../components/Forms/DocumentForm'
import { DocumentsList } from '../components/Tables/DocumentsList'
import { CreateDocumentForm } from '../components/Forms/CreateDocumentForm'


export const DocumentsPage = () => {
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