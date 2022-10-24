import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


const Item = ({user}) => {
    return (
        <tr>
            <td><span style={{ color: '#A6A63E' }}>Заказчик:</span>
                <Link to={ `/user/${user.id}` } className='link'>
                    { `  ${user.firstname} ${user.lastname} ${user.surname}` }
                </Link>
            </td>
        </tr>
    )
}
export const DocumentInfo = ({id}) => {

    const docs = useSelector(state => state.docs.docs)
    const users = useSelector(state => state.users.users)
    const doc = docs.find(item => item.id === Number(id))
    const user = users.find(item => item.id === doc.created_by)

    return (
        <div className="flex-column" style={{ width: '500px' }}>
            <table style={{ textAlign: 'left' }}>
                <thead>
                    <tr><th style={{ fontSize: '30px' }}>{ `${doc.title}` }</th></tr>
                </thead>
                <tbody>
                    <tr><td>{ `Описание: ${doc.description}` }</td></tr>
                    <tr><td>{ `Дата создания: ${doc.created_at.split('T')[0]}` }</td></tr>
                    <tr>
                        <td>Создал:
                            <Link to={ `/user/${user.id}` } className='link'>
                                { `  ${user.firstname} ${user.lastname} ${user.surname}` }
                            </Link>
                        </td>
                    </tr>
                        { doc.subscribe_workers.map(user => <Item user={user.user} />) }
                </tbody>
            </table>
        </div>
    )
}