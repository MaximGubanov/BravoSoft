import React from 'react'
import { useSelector } from 'react-redux'

import { CreateUserForm } from '../components/Forms/CreateUserForm'
import { UsersList } from '../components/Tables/UsersList'


export const UsersPage = () => {
    const users = useSelector(state => state.users.users)
    return (
        <>
            <UsersList users={users} /> 
            <CreateUserForm />    
        </>
    )
}