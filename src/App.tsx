import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ApiHandler from './ApiHandler';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/:pn/:id" element={<ApiHandler />} />
        <Route path="/:pn/" element={<ApiHandler />} />
        <Route path="/" element={<ApiHandler />} />

      </Routes >
    </Router >
  );
};

export default App;