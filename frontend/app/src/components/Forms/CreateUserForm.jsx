import React from 'react'
import axios from 'axios'

import './style.css'


export class CreateUserForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
                firstname: '', 
                lastname: '',
                surname: '',
            }
    }

    handleChange(event) {
        this.setState(
            { [event.target.name]: event.target.value }
        )
    }

    async handleSubmit() {     
        axios.post('http://localhost:4000/user', {
            'firstname': this.state.firstname,
            'lastname': this.state.lastname,
            'surname': this.state.surname
        })
        .then(response => alert(response.data.message))
        .catch(e => console.log(e))
    }

    render () {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <input type='text' placeholder="Имя" 
                    name="firstname" 
                    value={this.state.firstname} 
                    onChange={(event)=>this.handleChange(event)} 
                /><br/>
                <input type='text' placeholder="Отчество" 
                    name="lastname" 
                    value={this.state.lastname} 
                    onChange={(event)=>this.handleChange(event)} 
                />
                <input type='text' placeholder="Отчество" 
                    name="surname" 
                    value={this.state.surname} 
                    onChange={(event)=>this.handleChange(event)} 
                />
                <button type="submit">Создать</button>
            </form>
        )
    }
}