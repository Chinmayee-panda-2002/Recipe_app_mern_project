import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Auth from './pages/Auth.jsx';
import CreateRecipe from './pages/CreateRecipe.jsx';
import SaveRecipe from './pages/SaveRecipe.jsx';
import Navbar from './components/Navbar.jsx';
import Front from './pages/Front.jsx';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Front />} />
          <Route path="/home" element={<Home />} />
          <Route path="/createRecipe" element={<CreateRecipe />} />
          <Route path="/savedRecipe" element={<SaveRecipe />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
