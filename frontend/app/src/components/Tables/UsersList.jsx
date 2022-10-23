import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import './style.css'
import { IoSwapVertical } from 'react-icons/io5'
import { sortUserByKey } from '../../redux/usersSlice'
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
    const dispatch = useDispatch()

    function sortData (key) {
        dispatch(sortUserByKey(key))
    }

    return (
        <div className="flex-column" >
            <table>
                <thead>
                    <tr>
                        <th>Таб. номер<span><IoSwapVertical onClick={() => sortData("id")}/></span></th>
                        <th>Имя<span><IoSwapVertical onClick={() => sortData("firstname")}/></span></th>
                        <th>Отчество<span><IoSwapVertical onClick={() => sortData("lastname")}/></span></th>
                        <th>Фамилия<span><IoSwapVertical onClick={() => sortData("surname")}/></span></th>
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
