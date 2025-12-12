import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import AnnouncementsPage from "./components/AnnouncementsPage";
import AskCommunityPage from "./components/AskCommunityPage";
import "./App.css";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/announcements" element={<AnnouncementsPage />} />
        <Route path="/ask-community" element={<AskCommunityPage />} />
      </Routes>
    </Router>
  );
}

export default App;
