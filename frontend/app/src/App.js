import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { Layout } from './components/Layout'
import { DocumentsPage } from './pages/Documents'
import { DocumentPage } from './pages/Document'
import { UsersPage } from './pages/Users'
import { UserPage } from './pages/User'
import { fetchUsers } from './redux/usersSlice'


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
          <Route path='/users' element={ <UsersPage /> } />
          <Route path='/user/:id' element={ <UserPage /> } />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App
