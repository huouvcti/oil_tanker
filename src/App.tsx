import React from 'react';

import { Routes, Route } from 'react-router-dom';

import Login from './pages/Login';

import RegistLogin from './pages/regist/Login';
import RegistInfo from './pages/regist/Info';

import Main from './pages/Main';

import Main2 from './pages/Main2';


import './styles/index.scss';



function App() {
  return (
    <Routes>
      <Route path='/login' element={ <Login/>} />

      <Route path='/' element={ <Main/>} />

      <Route path='/main2' element={ <Main2/>} />


      <Route path='/regist/login' element={ <RegistLogin/>} />

      <Route path='/regist/info' element={ <RegistInfo/>} />
    </Routes>
  );
}

export default App;
