import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

import './style.css'
import { createDocument } from '../../redux/docsSlice'


export const CreateDocumentForm = ({users}) => {

    const [ userID, setUserID ] = useState('')
    const [ docTitle, setDocTitle ] = useState('')
    const dispatch = useDispatch()

    function handleChange(event, setValue) {
        setValue(event.target.value)
    }

    function handleSubmit(event) {
        if (userID !== undefined && docTitle !== undefined) {
            dispatch(createDocument({user_id: userID, doc_title: docTitle}))
            console.log({user_id: userID, doc_title: docTitle})
        } else {
            alert('Заполните все поля')
        }
        event.preventDefault()
    }

    return (
        <form onSubmit={(event) => handleSubmit(event)}>

            <select name="id" value={userID} onChange={(event) => handleChange(event, setUserID)}>
                <option defaultValue={undefined}>Выберете пользователя</option>
                { users.map(user => 
                    <option value={user.id} key={user.id}>
                                {`${user.firstname} ${user.lastname} ${user.surname}`}
                    </option>) }
            </select>
            
            <input 
                name="title" 
                value={docTitle} 
                onChange={(event) => handleChange(event, setDocTitle)} 
                placeholder="Введите название документа"
            />

            <button type="submit">Создать документ</button>

        </form>
    )
} 