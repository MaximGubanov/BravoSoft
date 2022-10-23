import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import './style.css'
import { deleteDocument } from '../../redux/docsSlice'
import { sortDocumentByKey } from '../../redux/docsSlice'


const DocumentItem = ({doc}) => {
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

export const DocumentsList = ({documents}) => {
    const dispatch = useDispatch()
    function sortData (key) {
        dispatch(sortDocumentByKey(key))
    }
    return (
        <div className="flex-column">
            <table>
                <thead>
                    <tr>
                        <th onClick={() => sortData("id")}>№</th>
                        <th onClick={() => sortData("title")}>Наименование</th>
                        <th>Описание</th>
                        <th onClick={() => sortData("subscribe_workers")}>Кол-во запросов</th>
                        <th>Удалить документ</th>
                    </tr>
                </thead>
                <tbody>
                    { documents.map((doc) => <DocumentItem doc={doc} key={doc.id} />) }
                </tbody>
            </table>
        </div>
    )
}