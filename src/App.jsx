import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CvForm } from './CVForm';
import { AuthForms } from './AuthForms';
import { Admin } from './Admin';

function App() {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/auth" element={<AuthForms />} />
        <Route path="/" element={<CvForm />} />
      </Routes>
    </Router>
  );
}

export default App;
