import React from 'react';
// Importa suas telas
import Welcome from '../pages/welcome/welcome';
import Home from '../pages/home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// O componente AppRoutes/Router agora está em seu próprio arquivo
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