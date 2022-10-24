import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { Layout } from './components/Layout'
import { DocumentsPage } from './pages/Documents'
import { UsersPage } from './pages/Users'
import { fetchUsers } from './redux/usersSlice'
import { DocumentPage } from './pages/Document'


function App () {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Layout /> }>
          <Route index element={ <DocumentsPage /> } />
          <Route path='/document/:id' element={ <DocumentPage /> } />
          {/* <Route path='/document/users' element={ <DocumentUsers /> } /> */}
          <Route path='/users' element={ <UsersPage /> } />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App
