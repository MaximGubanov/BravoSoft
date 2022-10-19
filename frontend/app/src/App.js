import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Layout } from './components/Layout'
import { DocList } from './components/DocumentList/DocList'
import { Document } from './components/DocumentPage/Document'
import { DocumentUsers } from './components/DocumentPage/DocumentUsers'
import { UserList } from './components/UserList/UserList'
import { fetchDocuments } from './redux/docsSlice'
import { fetchUsers } from './redux/usersSlice'


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
          <Route index element={ <DocList /> } />
          <Route path='/document/:id' element={ <Document /> } />
          <Route path='/document/users' element={ <DocumentUsers /> } />
          <Route path='/users' element={ <UserList /> } />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App
