import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

const useApplications = (userEmail) => {
  const [applications, setApplications] = useState([]);
  const { toast } = useToast();
  const storageKey = `applications_${userEmail}`;

  useEffect(() => {
    if (!userEmail) return;
    try {
      const savedApps = localStorage.getItem(storageKey);
      if (savedApps) {
        setApplications(JSON.parse(savedApps));
      } else {
        setApplications([]);
      }
    } catch (error) {
      console.error("Failed to parse applications from localStorage", error);
      setApplications([]);
    }
  }, [userEmail, storageKey]);

  useEffect(() => {
    if (!userEmail) return;
    try {
        localStorage.setItem(storageKey, JSON.stringify(applications));
    } catch (error) {
      console.error("Failed to save applications to localStorage", error);
    }
  }, [applications, userEmail, storageKey]);

  const addApplication = (newApp) => {
    const appWithId = { ...newApp, id: Date.now() };
    setApplications(prev => [appWithId, ...prev]);
    toast({
      title: "Application Added",
      description: `${newApp.name} has been added to your list.`,
    });
  };

  const handleStatusChange = (appId, newStatus) => {
    setApplications(prev => prev.map(app => 
      app.id === appId ? { ...app, status: newStatus } : app
    ));
    toast({
      title: "Status Updated",
      description: `Application status changed to ${newStatus}`,
    });
  };

  const handleDeleteApp = (appId) => {
    setApplications(prev => prev.filter(app => app.id !== appId));
    toast({
      title: "Application Deleted",
      description: "Application has been removed successfully",
    });
  };

  return { applications, setApplications, addApplication, handleStatusChange, handleDeleteApp };
};

export default useApplications;