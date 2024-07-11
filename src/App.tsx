import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AddCredentialPage from './pages/AddCredentialPage';
import ViewCredentialsPage from './pages/ViewCredentialsPage';
import './styles/global.scss';

const App: React.FC = () => {

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className={`container`}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add-credential" element={<AddCredentialPage />} />
            <Route path="/view-credentials" element={<ViewCredentialsPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
