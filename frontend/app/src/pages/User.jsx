import React from 'react'
import { useParams } from 'react-router-dom'

import { UserInfo } from '../components/Tables/UserInfo'

export const UserPage = () => {
    const { id } = useParams()
    return (
        <UserInfo id={ id } />
    ) 
}