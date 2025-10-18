import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useOutletContext } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import useApplications from '@/hooks/useApplications';
import DashboardHeader from '@/components/DashboardHeader';
import StatsCards from '@/components/StatsCards';
import FilterControls from '@/components/FilterControls';
import ApplicationGrid from '@/components/ApplicationGrid';
import ViewApplicationDialog from '@/components/ViewApplicationDialog';
import AddApplicationDialog from '@/components/AddApplicationDialog';

function ApplicationsPage() {
  const { user } = useOutletContext();
  const {
    applications,
    addApplication,
    handleStatusChange,
    handleDeleteApp,
  } = useApplications(user?.email);
  
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedApp, setSelectedApp] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleAddApplicationClick = () => {
    setIsAddDialogOpen(true);
  };

  const handleExport = () => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const handleImport = () => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const filteredApplications = applications.filter(app => {
    const appName = app.name || '';
    const appApplicant = app.applicant || '';
    const appPosition = app.position || '';
    
    const matchesSearch = appName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appApplicant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appPosition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || app.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: applications.length,
    approved: applications.filter(app => app.status === 'approved').length,
    pending: applications.filter(app => app.status === 'pending').length,
    rejected: applications.filter(app => app.status === 'rejected').length
  };

  const openViewDialog = (app) => {
    setSelectedApp(app);
    setIsViewDialogOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Applications Management</title>
        <meta name="description" content="Manage and track all applications efficiently" />
      </Helmet>
      
      <DashboardHeader 
        title="Applications Dashboard"
        description="Manage and track all applications efficiently"
        onAddApplication={handleAddApplicationClick}
        onImport={handleImport}
        onExport={handleExport}
      />
      
      <StatsCards stats={stats} />

      <FilterControls 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />

      <ApplicationGrid 
        applications={filteredApplications}
        onView={openViewDialog}
        onStatusChange={handleStatusChange}
        onDelete={handleDeleteApp}
      />

      <ViewApplicationDialog 
        isOpen={isViewDialogOpen}
        onOpenChange={setIsViewDialogOpen}
        app={selectedApp}
        onStatusChange={handleStatusChange}
      />

      <AddApplicationDialog 
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAddApplication={addApplication}
      />
    </>
  );
}

export default ApplicationsPage;