import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Navbar from './Components/navbar';
import Footer from './Components/footer';
import Homepage from './Components/homepage';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from './Components/register';
import Login from './Components/login';
import ForgetPassword from './Components/forgetPassword';
import ResetPassword from './Components/resetPassword';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/forget-password' element={<ForgetPassword />} />
      <Route path='/reset-password/:id' element={<ResetPassword />} />
    </Routes>
    <Footer/>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
