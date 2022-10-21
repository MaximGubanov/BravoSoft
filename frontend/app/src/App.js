import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { fetchDocuments } from './redux/docsSlice'
import { fetchUsers } from './redux/usersSlice'
import { Layout } from './components/Layout'
import { DocumentsPage } from './pages/Documents'
import { UsersPage } from './pages/Users'


function App () {

  const dispath = useDispatch()

  useEffect(() => {
    dispath(fetchDocuments())
  }, [dispath])

  useEffect(() => {
    dispath(fetchUsers())
  }, [dispath])

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
