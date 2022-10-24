import React from 'react'
import { useParams } from 'react-router-dom'

import { DocumentInfo } from '../components/Tables/DocumentInfo'

export const DocumentPage = () => {
    const { id } = useParams()
    return (
        <DocumentInfo id={ id } />
    ) 
}