import React from 'react'

import './style.css'


const UserItem = ({user}) => {
    return (
        <tr>
            <td>{user.id}</td>
            <td>{user.firstname}</td>
            <td>{user.lastname}</td>
            <td>{user.surname}</td>
            <td><span><a href="http://">Удалить</a></span></td>
        </tr>
    )
}

export const UsersList = ({users}) => {
    return (
        <div className="flex-column" >
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
