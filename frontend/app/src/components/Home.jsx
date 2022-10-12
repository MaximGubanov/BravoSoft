import React from 'react';
import styled from 'styled-components'
import { UserForm } from './UserForms'


const UserTable = styled.table`
    border: 1px solid;
`
const Th = styled.th`
    border: 1px solid grey;
`
const Td = styled.td`
    border: 1px solid grey;
`

const UserItem = ({user}) => {
    return (
        <tr>
            <Td>
                {user.id}
            </Td>
            <Td>
                {user.firstname}
            </Td>
            <Td>
                {user.lastname}
            </Td>
            <Td>
                {user.surname}
            </Td>
        </tr>
    )
}

export const UserList = ({users}) => {
    return (
        <div style={{ display: 'flex' }}>
            <UserForm />
            <UserTable>
                <thead>
                    <tr>
                        <Th>Таб. номер</Th>
                        <Th>Имя</Th>
                        <Th>Отчество</Th>
                        <Th>Фамилия</Th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => < UserItem user={user} key={user.id} />)}
                </tbody>
            </UserTable>
        </div>
    )
}
