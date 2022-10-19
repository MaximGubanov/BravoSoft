import React from 'react'
import axios from 'axios'

import './style.css'


export class DocForms extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
                id: '', 
                title: '',
            }
    }

    handleChange(event) {
        this.setState(
            { [event.target.name]: event.target.value }
        )
    }

    async handleSubmit() {     
        axios.post('http://localhost:4000/request-a-doc', {
            'id': this.state.id,
            'title': this.state.title
        })
        .then(response => alert(response.data.message))
        .catch(e => console.log(e))

        console.log(this.state.id, this.state.title)
    }

    render () {
        return (
            <from onSubmit={(event) => this.handleSubmit(event)}>
                <label>Выберете пользователя</label><br/>
                <select name="id" value={this.state.id} onChange={(event)=>this.handleChange(event)}>
                    {this.props.users.map(user => 
                        <option value={user.id} key={user.id}>
                            {`${user.firstname} ${user.lastname} ${user.surname}`}
                        </option>)}
                </select><br/><br/>
                <input type='text' placeholder="Название документа" 
                    name="title" 
                    value={this.state.title} 
                    onChange={(event)=>this.handleChange(event)} 
                /><br/><br/>
                <button type="submit">Создать заявку</button>
            </from>
        )
    }
}