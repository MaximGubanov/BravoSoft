import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Layout } from './components/Layout'
import { DocumentsPage } from './pages/Documents'
import { UsersPage } from './pages/Users'


function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Layout /> }>
          <Route index element={ <DocumentsPage /> } />
          {/* <Route path='/document/:id' element={ <Document /> } />
          <Route path='/document/users' element={ <DocumentUsers /> } /> */}
          <Route path='/users' element={ <UsersPage /> } />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App
