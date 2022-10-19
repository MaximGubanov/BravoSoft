import React from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import './style.css'
import { makeRequestDoc } from '../../redux/docsSlice'


export const DocumentForm = () => {

    const [userID, setUserID] = useState('')
    const [docID, setDocID] = useState('')
    const dispatch = useDispatch()
    const users = useSelector(state => state.users.users)
    const docs = useSelector(state => state.docs.docs)

    function handleChange(event, setValue) {
        setValue(event.target.value)
    }

    function handleSubmit(event) {
        if (userID && docID) {
            dispatch(makeRequestDoc({user_id: userID, doc_id: docID}))
            console.log({user_id: userID, doc_id: docID})
        } else {
            alert('Заполните все поля')
        }
        event.preventDefault()
    }

    return (
        <form onSubmit={(event) => handleSubmit(event)}>

            <select name="id" value={userID} onChange={(event) => handleChange(event, setUserID)}>
                <option defaultValue={''}>Выберете пользователя</option>
                { users.map(user => 
                    <option value={user.id} key={user.id}>
                                {`${user.firstname} ${user.lastname} ${user.surname}`}
                    </option>) }
            </select>

            <select name="title" value={docID} onChange={(event) => handleChange(event, setDocID)}>
                <option defaultValue={''}>Выберете документ</option>
                { docs.map(doc => 
                    <option value={doc.id} key={doc.id}>
                        {`${doc.title}`}
                    </option>) }
            </select>

            <button type="submit">Сделать заявку</button>

        </form>
    )
} 