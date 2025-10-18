import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

const initialOpportunities = [];

const useOpportunities = (userEmail) => {
  const [opportunities, setOpportunities] = useState([]);
  const [userOpportunities, setUserOpportunities] = useState([]);
  const { toast } = useToast();
  const userStorageKey = `user_opportunities_${userEmail}`;

  useEffect(() => {
    try {
      const storedOpportunities = localStorage.getItem('opportunities');
      if (storedOpportunities) {
        setOpportunities(JSON.parse(storedOpportunities));
      } else {
        setOpportunities(initialOpportunities);
        localStorage.setItem('opportunities', JSON.stringify(initialOpportunities));
      }
    } catch (error) {
        console.error("Failed to parse opportunities from localStorage", error);
        setOpportunities([]);
    }
  }, []);

  useEffect(() => {
    if (!userEmail) return;
    try {
      const savedUserOps = localStorage.getItem(userStorageKey);
      if (savedUserOps) {
        setUserOpportunities(JSON.parse(savedUserOps));
      } else {
        setUserOpportunities([]);
      }
    } catch (error) {
      console.error("Failed to parse user opportunities from localStorage", error);
      setUserOpportunities([]);
    }
  }, [userEmail, userStorageKey]);

  useEffect(() => {
    try {
        localStorage.setItem('opportunities', JSON.stringify(opportunities));
    } catch (error) {
        console.error("Failed to save opportunities to localStorage", error);
    }
  }, [opportunities]);

  useEffect(() => {
    if (!userEmail) return;
    try {
      localStorage.setItem(userStorageKey, JSON.stringify(userOpportunities));
    } catch (error) {
      console.error("Failed to save user opportunities to localStorage", error);
    }
  }, [userOpportunities, userEmail, userStorageKey]);


  const addOpportunity = (newOpp) => {
    const oppWithId = { ...newOpp, id: `opp-${Date.now()}` };
    setOpportunities(prev => [oppWithId, ...prev]);
    toast({
      title: "Opportunity Added",
      description: `${newOpp.title} has been added to the global list.`,
    });
  };

  const deleteOpportunity = (opportunityId) => {
    const opportunityToDelete = opportunities.find(op => op.id === opportunityId);
    if (!opportunityToDelete) return;

    setOpportunities(prev => prev.filter(op => op.id !== opportunityId));

    // Also remove from all users' saved and recommended opportunities
    const allUsers = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = allUsers.map(user => {
      const updatedUser = { ...user };
      const userOpsKey = `user_opportunities_${user.email}`;
      const userOps = JSON.parse(localStorage.getItem(userOpsKey)) || [];
      
      const filteredUserOps = userOps.filter(op => op.id !== opportunityId);
      localStorage.setItem(userOpsKey, JSON.stringify(filteredUserOps));

      if (updatedUser.recommendedOpportunityIds) {
        updatedUser.recommendedOpportunityIds = updatedUser.recommendedOpportunityIds.filter(id => id !== opportunityId);
      }
      
      return updatedUser;
    });
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    toast({
      title: "Opportunity Deleted",
      description: `${opportunityToDelete.title} has been removed.`,
      variant: "destructive",
    });
  };

  const addUserOpportunity = (opportunity) => {
    if (userOpportunities.some(op => op.id === opportunity.id)) {
      toast({
        variant: "default",
        title: "Already Saved",
        description: "You have already saved this opportunity.",
      });
      return;
    }
    setUserOpportunities(prev => [...prev, opportunity]);
    toast({
      title: "Opportunity Saved",
      description: `${opportunity.title} has been added to your list.`,
    });
  };
  
  const removeUserOpportunity = (opportunityId) => {
    setUserOpportunities(prev => prev.filter(op => op.id !== opportunityId));
    toast({
      title: "Opportunity Removed",
      description: "The opportunity has been removed from your list.",
    });
  };


  return { opportunities, addOpportunity, deleteOpportunity, userOpportunities, addUserOpportunity, removeUserOpportunity };
};

export default useOpportunities;