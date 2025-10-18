import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import DashboardHeader from '@/components/DashboardHeader';
import { useToast } from '@/components/ui/use-toast';
import useOpportunities from '@/hooks/useOpportunities';
import RecommendDialog from '@/components/RecommendDialog';
import { useAuth } from '@/contexts/FirebaseAuthContext';

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [userToRecommend, setUserToRecommend] = useState(null);
  const [isRecommendOpen, setIsRecommendOpen] = useState(false);
  const { opportunities } = useOpportunities();
  const { getAllUsers } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchUsers = async () => {
      const { users, error } = await getAllUsers();
      if (error) {
        toast({
          title: "Error fetching users",
          description: error.message,
          variant: "destructive",
        });
      } else {
        setUsers(users);
      }
    };
    fetchUsers();
  }, [getAllUsers, toast]);
  
  const handleOpenRecommendDialog = (user) => {
    setUserToRecommend(user);
    setIsRecommendOpen(true);
  };

  const handleSendRecommendation = async (userId, recommendedOpportunityIds) => {
    const userToUpdate = users.find(u => u.id === userId);
    if (!userToUpdate) return;

    const existingRecs = userToUpdate.recommended_opportunity_ids || [];
    const newRecs = [...new Set([...existingRecs, ...recommendedOpportunityIds])];
    
    const { error } = await supabase
      .from('profiles')
      .update({ recommended_opportunity_ids: newRecs })
      .eq('id', userId);

    if (error) {
        toast({
            title: "Error Sending Recommendations",
            description: error.message,
            variant: "destructive",
        });
    } else {
        setUsers(prevUsers => prevUsers.map(u => u.id === userId ? { ...u, recommended_opportunity_ids: newRecs } : u));
        toast({
            title: "Recommendations Sent!",
            description: `Successfully recommended opportunities to ${userToRecommend.full_name}.`,
        });
    }

    setIsRecommendOpen(false);
    setUserToRecommend(null);
  };

  return (
    <>
      <Helmet>
        <title>Control Center - Users</title>
        <meta name="description" content="Manage all users and their profiles." />
      </Helmet>

      <DashboardHeader
        title="Control Center"
        description="View and manage all user profiles."
        showAddButton={false}
        showImportExport={false}
      />

      <motion.div
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.05 } }
        }}
      >
        {users.map((user) => (
          <motion.div key={user.id} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <Card className="flex flex-col h-full">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{user.full_name || "N/A"}</CardTitle>
                    <CardDescription>{user.email}</CardDescription>
                  </div>
                  {user.is_admin && <Badge>Admin</Badge>}
                </div>
              </CardHeader>
              <CardContent className="flex-grow space-y-2 text-sm">
                <p><strong>Looking for:</strong> <span className="capitalize">{user.opportunity_preferences || 'N/A'}</span></p>
                <p><strong>Recommended:</strong> {user.recommended_opportunity_ids?.length || 0} opportunities</p>
              </CardContent>
              <CardContent className="flex gap-2">
                <Button size="sm" className="flex-1" onClick={() => handleOpenRecommendDialog(user)}>Recommend</Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <RecommendDialog
        isOpen={isRecommendOpen}
        onOpenChange={setIsRecommendOpen}
        user={userToRecommend}
        opportunities={opportunities}
        onRecommend={handleSendRecommendation}
      />
    </>
  );
};

export default AdminUsersPage;