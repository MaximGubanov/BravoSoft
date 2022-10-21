import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import './style.css'
import { createUser } from '../../redux/usersSlice'


export const CreateUserForm = () => {

    const [ firstname, setFirstname ] = useState('')
    const [ lastname, setLastname ] = useState('')
    const [ surname, setSurname ] = useState('')

    const dispatch = useDispatch()

    function handleChange(event, setValue) {
        setValue(event.target.value)
    }

    function handleSubmit(event) {
        if (firstname !== undefined && lastname !== undefined && surname !== undefined) {
            dispatch(createUser({firstname: firstname, lastname: lastname, surname: surname}))
            console.log({})
        } else {
            alert('Заполните все поля')
        }
        event.preventDefault()
    }

    return (
        <form onSubmit={(event) => handleSubmit(event)}>

            <input 
                type="text" 
                placeholder="Имя" 
                name="firstname" 
                value={firstname} 
                onChange={(event) => handleChange(event, setFirstname)} 
            />

            <input 
                type="text" 
                placeholder="Отчество" 
                name="lastname" 
                value={lastname} 
                onChange={(event) => handleChange(event, setLastname)} 
            />

            <input 
                type="text" 
                placeholder="Фамилия" 
                name="surname" 
                value={surname} 
                onChange={(event) => handleChange(event, setSurname)} 
            />

            <button type="submit">Создать</button>

        </form>
    )
}