import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'

import { Layout } from "./components/Layout"
import { UserList } from "./components/Home"
import { TableRequiests } from './components/Table'


class App extends React.Component {

  constructor(props) {
    
      super(props)
      
      this.state = {
        'docs': [],
        'users': [],
      }
  }

  async getUsers() {
    try {
        const data = await axios.get('http://localhost:4000/users')
            .then(response => {
                this.setState({
                  'users': response.data
                })
            })
            .catch(error => {
                console.log(error)
                return error
            })
        return data
    } catch(err) {
        console.log(err.message)
    }
  }

  async getData() {
    try {
      const data = await axios.get('http://localhost:4000/docs')
          .then(response => {
              this.setState({
                'docs': response.data
              })
          })
          .catch(error => {
              console.log(error)
              return error
          })
      return data
    } catch(err) {
        console.log(err.message)
    }
  }

  componentDidMount() {
    this.getUsers()
    this.getData()
  }

  render () {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Layout/> }>
            <Route index element={<TableRequiests docs={ this.state.docs } users={ this.state.users } />} />
            <Route path='/users' element={<UserList users={ this.state.users } />} />
          </Route>
        </Routes>
      </BrowserRouter>
    )
  }
}

export default App
