import React from "react"
import styled from "styled-components"
import axios from "axios"

import { Option } from "./SelectUserList"


const Form = styled.form`
    width: 400px;
    display: flex;
    flex-direction: column;
    margin-right: 2rem;
`

const Select = styled.select`
    width: 100%;
    border: 1px solid blue;
    border-radius: 4px;
    padding: 4px;
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

export class RequestDocForm extends React.Component {
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
            <Form onSubmit={(event) => this.handleSubmit(event)}>
                <label>Выберете пользователя</label><br/>
                <Select name="id" value={this.state.id} onChange={(event)=>this.handleChange(event)}>
                    { this.props.users.map(user => <Option user={user} key={user.id} value={user.id} />) }
                </Select><br/><br/>
                <Input type='text' placeholder="Название документа" 
                    name="title" 
                    value={this.state.title} 
                    onChange={(event)=>this.handleChange(event)} 
                /><br/><br/>
                <Button type="submit">Создать заявку</Button>
            </Form>
        )
    }
}
