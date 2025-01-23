import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './MainLayout/mainLayout';
import Dashboard from './pages/dashboard/dashboard';
import Products from './pages/Products/ProductsTable';

const App = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ProductsTable" element={<Products />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;
