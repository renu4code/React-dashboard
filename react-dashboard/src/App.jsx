import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './MainLayout/mainLayout';
import Dashboard from './pages/dashboard/dashboard';
import Products from './pages/Products/ProductsTable';
import Login from './pages/login/login';
import Register from './pages/Register/Register';
import ProtectedRoute from './pages/ProtectedRoute/ProtectedRoute';
import Logout from './pages/Logout/Logout';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route path="/dashboard"element={<ProtectedRoute element={<MainLayout><Dashboard /></MainLayout>} />}/>
        <Route path="/ProductsTable"element={<ProtectedRoute element={<MainLayout><Products /></MainLayout>} />}/>
        <Route path="/logout" element={<Logout />} />

        {/* Redirect unknown paths to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
