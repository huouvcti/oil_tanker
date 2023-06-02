import React from 'react';

import { Routes, Route } from 'react-router-dom';

import Login from './pages/Login';

import Main from './pages/Main';

import Main2 from './pages/Main2';


import './styles/index.scss';



function App() {
  return (
    <Routes>
      <Route path='/login' element={ <Login/>} />

      <Route path='/' element={ <Main/>} />

      <Route path='/main2' element={ <Main2/>} />
    </Routes>
  );
}

export default App;
