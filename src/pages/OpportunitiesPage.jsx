import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, FilePlus, Star, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import useOpportunities from '@/hooks/useOpportunities';
import DashboardHeader from '@/components/DashboardHeader';
import AddOpportunityDialog from '@/components/AddOpportunityDialog';

const OpportunityCard = ({ opportunity, onSave, onDelete, isRecommended, isAdmin }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      layout
    >
      <Card className="h-full flex flex-col relative">
        {isRecommended && (
          <div className="absolute top-2 right-2 bg-primary text-primary-foreground p-1 rounded-full">
            <Star className="h-4 w-4" />
          </div>
        )}
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>{opportunity.title}</CardTitle>
              <CardDescription>{opportunity.company}</CardDescription>
            </div>
            <Badge variant="secondary">{opportunity.type}</Badge>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground mb-4">{opportunity.description}</p>
          <div className="flex flex-wrap gap-2">
            {opportunity.tags && opportunity.tags.map(tag => (
              <Badge key={tag} variant="outline">{tag}</Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button variant="outline" className="w-full" asChild>
            <a href={opportunity.link} target="_blank" rel="noopener noreferrer">Apply</a>
          </Button>
          <Button className="w-full" onClick={() => onSave(opportunity)}>Save for Later</Button>
          {isAdmin && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the
                    opportunity and remove it from all users' lists.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => onDelete(opportunity.id)}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

function OpportunitiesPage() {
  const { user } = useOutletContext();
  const { opportunities, addOpportunity, deleteOpportunity, addUserOpportunity } = useOpportunities(user?.email);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleAddOpportunityClick = () => {
    setIsAddDialogOpen(true);
  };
  
  const recommendedOpportunities = useMemo(() => {
    if (!user || !user.recommendedOpportunityIds) return [];
    return opportunities.filter(op => user.recommendedOpportunityIds.includes(op.id));
  }, [user, opportunities]);
  
  const otherOpportunities = useMemo(() => {
    if (!user || !user.recommendedOpportunityIds) return opportunities;
    return opportunities.filter(op => !user.recommendedOpportunityIds.includes(op.id));
  }, [user, opportunities]);

  return (
    <>
      <Helmet>
        <title>Browse Opportunities</title>
        <meta name="description" content="Browse all available opportunities." />
      </Helmet>

      <DashboardHeader 
        title="Browse Opportunities"
        description="Explore curated opportunities. Save the ones that interest you."
        onAddApplication={user?.isAdmin ? handleAddOpportunityClick : null}
        showImportExport={false}
        addButtonLabel="Add Global Opportunity"
      />

      <div className="space-y-12">
        {recommendedOpportunities.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Star className="text-primary"/>
              Recommended For You
            </h2>
            <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recommendedOpportunities.map((opp) => (
                <OpportunityCard 
                  key={opp.id} 
                  opportunity={opp} 
                  onSave={addUserOpportunity} 
                  onDelete={deleteOpportunity}
                  isRecommended 
                  isAdmin={user?.isAdmin}
                />
              ))}
            </motion.div>
          </section>
        )}

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">All Opportunities</h2>
           {otherOpportunities.length > 0 ? (
            <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {otherOpportunities.map((opp) => (
                <OpportunityCard 
                  key={opp.id} 
                  opportunity={opp} 
                  onSave={addUserOpportunity} 
                  onDelete={deleteOpportunity}
                  isAdmin={user?.isAdmin}
                />
              ))}
            </motion.div>
            ) : (
                <div className="text-center py-16 border-2 border-dashed rounded-lg">
                    <FilePlus className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-semibold">No Global Opportunities Yet</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                        {user?.isAdmin ? "Click 'Add Global Opportunity' to create the first one." : "Check back later for new opportunities."}
                    </p>
                    {user?.isAdmin && (
                        <div className="mt-6">
                            <Button onClick={handleAddOpportunityClick}>Add Global Opportunity</Button>
                        </div>
                    )}
                </div>
            )}
        </section>
      </div>

      <AddOpportunityDialog
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAddOpportunity={addOpportunity}
      />
    </>
  );
}

export default OpportunitiesPage;