import React from "react"
import styled from "styled-components"
import axios from "axios"


const Form = styled.form`
    width: 400px;
    margin-right: 2rem;
`
const Input = styled.input`
    width: 100%;
    border: 1px solid blue;
    border-radius: 4px;
    padding: 4px;
`

const Button = styled.button`
    width: 200px;
    color: white;
    background: blue;
    border-radius: 4px;
    padding: 6px;
`

export class UserForm extends React.Component {
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
            <Form onSubmit={(event) => this.handleSubmit(event)}>
                <label>Регистрация пользователя</label><br/><br/>
                <Input type='text' placeholder="Имя" 
                    name="firstname" 
                    value={this.state.firstname} 
                    onChange={(event)=>this.handleChange(event)} 
                /><br/><br/>
                <Input type='text' placeholder="Отчество" 
                    name="lastname" 
                    value={this.state.lastname} 
                    onChange={(event)=>this.handleChange(event)} 
                /><br/><br/>
                <Input type='text' placeholder="Отчество" 
                    name="surname" 
                    value={this.state.surname} 
                    onChange={(event)=>this.handleChange(event)} 
                /><br/><br/>
                <Button type="submit">Создать</Button>
            </Form>
        )
    }
}