import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import HistoryPage from './pages/HistoryPage';
import './background.css';

const App: React.FC = () => {
  return (
    <div className="background-wrapper">
      <div className="animated-background"></div>
      <div className="content">
        <div className="wrapper">
          <Router>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/history" element={<HistoryPage />} />
            </Routes>
          </Router>
        </div>
      </div>
    </div>
  );
};

export default App;

