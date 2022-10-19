import React from 'react'
import { useSelector } from 'react-redux'

import './style.css'
import { UserForms } from '../Forms/UserForms'


const UserItem = ({user}) => {
    return (
        <tr>
            <td>
                {user.id}
            </td>
            <td>
                {user.firstname}
            </td>
            <td>
                {user.lastname}
            </td>
            <td>
                {user.surname}
            </td>
            <td>
                <span><a href='#'>Удалить</a></span>
            </td>
        </tr>
    )
}

export const UserList = () => {
    const users = useSelector(state => state.users.users)
    
    return (
        <div className="flex-column" >
            <UserForms />
            <table>
                <thead>
                    <tr>
                        <th>Таб. номер</th>
                        <th>Имя</th>
                        <th>Отчество</th>
                        <th>Фамилия</th>
                        <th>Удалить пользователя</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => < UserItem user={user} key={user.id} />)}
                </tbody>
            </table>
        </div>
    )
}