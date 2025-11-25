import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import VectorLesson from './pages/VectorLesson';
import MatrixLesson from './pages/MatrixLesson';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lesson/vectors" element={<VectorLesson />} />
        <Route path="/lesson/matrices" element={<MatrixLesson />} />
      </Routes>
    </Router>
  );
}

export default App;
