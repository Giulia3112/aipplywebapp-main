import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/FirebaseAuthContext';
import DashboardLayout from '@/components/DashboardLayout';
import ApplicationsPage from '@/pages/ApplicationsPage';
import { useToast } from '@/components/ui/use-toast';

function DashboardPage() {
  const { user, userProfile, loading, updateUserProfile, signOut } = useAuth();
  const { toast } = useToast();

  const handleProfileUpdate = async (updatedProfile) => {
    const { error } = await updateUserProfile(updatedProfile);
    if (error) {
      console.error('Profile update error:', error);
    }
  };

  const handleLogout = async () => {
    await signOut();
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Helmet>
        <title>AIpply Dashboard</title>
        <meta name="description" content="Manage your applications and opportunities with AIpply" />
      </Helmet>
      
      <DashboardLayout 
        userProfile={userProfile}
        onProfileUpdate={handleProfileUpdate}
        onLogout={handleLogout}
      >
        <Outlet context={{ user: userProfile, userProfile, setUserProfile }} />
      </DashboardLayout>
    </>
  );
}

export default DashboardPage;
