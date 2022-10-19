import React from 'react'
import { useSelector } from 'react-redux'

import './style.css'
import { DocForms } from '../Forms/DocForms'


const DocItem = ({doc}) => {
    return (
        <tr>
            <td>{doc.id}</td>
            <td>{doc.title}</td>
            <td>{doc.description}</td>
            <td>{doc.subscribe_workers.length}</td>
            <td><span><a>Удалить</a></span></td>
        </tr>
    )
}

export const DocList = () => {
    const docs = useSelector(state => state.docs.docs)
    const users = useSelector(state => state.users.users)

    return (
        <div className="flex-column">
            <DocForms users={ users } />
            <table>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Наименование</th>
                        <th>Описание</th>
                        <th>Кол-во запросов</th>
                        <th>Удалить документ</th>
                    </tr>
                </thead>
                <tbody>
                    { docs.map((doc) => <DocItem doc={doc} key={doc.id} />) }
                </tbody>
            </table>
        </div>
    )
}