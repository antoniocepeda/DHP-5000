import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import AdminDashboard from '../dashboard/AdminDashboard';
import ExpertDashboard from '../dashboard/ExpertDashboard';
import ConsumerDashboard from '../dashboard/ConsumerDashboard';
import ProviderDashboard from '../dashboard/ProviderDashboard';

export default function DashboardRouter() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  switch (user.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'expert':
      return <ExpertDashboard />;
    case 'consumer':
      return <ConsumerDashboard />;
    case 'provider':
      return <ProviderDashboard />;
    default:
      return <div>Invalid user role</div>;
  }
} 