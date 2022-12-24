import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import AuthPage from '../../pages/authentication/Auth';
import LandingPage from '../../pages/landing page/LandingPage';
import Admin from '../../pages/admin page/Admin';

const AppRoutes = () =>{
    return (
      <Router>
        <Routes>
          <Route exact path="/login" element={<AuthPage />} />
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/admin" element={<Admin />} />
        
        </Routes>
      </Router>
    );
}

export default AppRoutes;