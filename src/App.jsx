import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Income from './pages/Income'
import Expense from './pages/Expense'
import Category from './pages/Category'
import Filter from './pages/Filter'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import { Toaster } from "react-hot-toast"

const App = () => {
  return (
    <>
    <Toaster/>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Root/>} ></Route>
      <Route path='/dashboard' element={<Home/>} ></Route>
      <Route path='/income' element={<Income/>} ></Route>
      <Route path='/expense' element={<Expense/>} ></Route>
      <Route path='/category' element={<Category/>} ></Route>
      <Route path='/filter' element={<Filter/>} ></Route>
      <Route path='/login' element={<Login/>} ></Route>
      <Route path='/signup' element={<SignUp/>} ></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />    
  )
}

export default App