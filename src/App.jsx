import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '@/pages/LandingPage';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';
import SearchDemoPage from '@/pages/SearchDemoPage';
import WorkingSearchDemoPage from '@/pages/WorkingSearchDemoPage';
import SimpleDemoPage from '@/pages/SimpleDemoPage';
import MinimalDemoPage from '@/pages/MinimalDemoPage';
import ApiTestPage from '@/pages/ApiTestPage';
import OnboardingPage from '@/pages/OnboardingPage';
import DashboardPage from '@/pages/DashboardPage';
import ApplicationsPage from '@/pages/ApplicationsPage';
import AdminUsersPage from '@/pages/AdminUsersPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="/search-demo" element={<WorkingSearchDemoPage />} />
      <Route path="/simple-demo" element={<SimpleDemoPage />} />
      <Route path="/minimal-demo" element={<MinimalDemoPage />} />
      <Route path="/api-test" element={<ApiTestPage />} />
      <Route path="/login" element={<OnboardingPage />} />
      
      {/* Dashboard routes - nested under DashboardPage */}
      <Route path="/dashboard" element={<DashboardPage />}>
        <Route index element={<ApplicationsPage />} />
        <Route path="users" element={<AdminUsersPage />} />
      </Route>
      
      {/* Direct admin route for backward compatibility */}
      <Route path="/users" element={<AdminUsersPage />} />
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;