import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import AuthPage from '../../pages/authentication/Auth';
import LandingPage from '../../pages/landing page/LandingPage';

const AppRoutes = () =>{
    return (
      <Router>
        <Routes>
          <Route exact path="/login" element={<AuthPage />} />
          <Route exact path="/" element={<LandingPage />} />
        </Routes>
      </Router>
    );
}

export default AppRoutes;