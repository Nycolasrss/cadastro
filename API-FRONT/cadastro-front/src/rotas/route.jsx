import React from 'react';

import Welcome from '../pages/welcome/welcome';
import Home from '../pages/home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/cadastro" element={<Home />} />
        
      </Routes>
    </BrowserRouter>
  );
}


export default AppRoutes;
