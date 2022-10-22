import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import './style.css'
import { deleteUser } from '../../redux/usersSlice'


const UserItem = ({user}) => {
    const dispatch = useDispatch()

    function del() {
        dispatch(deleteUser(user.id))
    }

    return (
        <tr>
            <td>{user.id}</td>
            <td>{user.firstname}</td>
            <td>{user.lastname}</td>
            <td>{user.surname}</td>
            <td><span><Link to='/users' onClick={del}>Удалить</Link></span></td>
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
