import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import './style.css'
import { DocumentForm } from '../Forms/DocForms'
import { CreateDocumentForm } from '../Forms/CreateDocForm'
import { deleteDocument } from '../../redux/docsSlice'


const DocItem = ({doc}) => {
    const dispatch = useDispatch()

    function del() {
        dispatch(deleteDocument(doc.id))
    }
    
    return (
        <tr>
            <td>{doc.id}</td>
            <td><Link to={`/document/${doc.id}`} className='link'>{doc.title}</Link></td>
            <td>{doc.description}</td>
            <td><Link to="/document/users" className='link'>{doc.subscribe_workers.length}</Link></td>
            <td><span><Link to='/' onClick={del}>Удалить</Link></span></td>
        </tr>
    )
}

export const DocList = () => {
    const docs = useSelector(state => state.docs.docs)
    const users = useSelector(state => state.users.users)

    return (
        <div className="flex-column">
            <DocumentForm users={ users } />
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
            <CreateDocumentForm />
        </div>
    )
}