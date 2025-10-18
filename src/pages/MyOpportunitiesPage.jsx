import React from 'react';
import { Helmet } from 'react-helmet';
import { useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, FilePlus } from 'lucide-react';
import useOpportunities from '@/hooks/useOpportunities';
import DashboardHeader from '@/components/DashboardHeader';
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';

const OpportunityCard = ({ opportunity, onRemove }) => {
  const { toast } = useToast();

  const handleApply = () => {
    toast({
      title: "Applying to Opportunity",
      description: "This feature will open the application link in a new tab.",
    });
    window.open(opportunity.link, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      layout
    >
      <Card className="h-full flex flex-col">
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
          <Button className="w-full" onClick={handleApply}>Apply Now</Button>
          <Button variant="outline" className="w-full" onClick={() => onRemove(opportunity.id)}>Remove</Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

function MyOpportunitiesPage() {
  const { user } = useOutletContext();
  const { userOpportunities, removeUserOpportunity } = useOpportunities(user?.email);

  return (
    <>
      <Helmet>
        <title>My Saved Opportunities</title>
        <meta name="description" content="Manage the opportunities you have saved." />
      </Helmet>

      <DashboardHeader 
        title="My Saved Opportunities"
        description="Here are the opportunities you've saved for later."
        showAddButton={false}
        showImportExport={false}
      />

      {userOpportunities.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
            <FilePlus className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">No Saved Opportunities Yet</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              You haven't saved any opportunities.
            </p>
            <div className="mt-6">
                <Button asChild>
                    <Link to="/opportunities">Browse Opportunities</Link>
                </Button>
            </div>
        </div>
      ) : (
        <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {userOpportunities.map((opp) => (
            <OpportunityCard key={opp.id} opportunity={opp} onRemove={removeUserOpportunity} />
          ))}
        </motion.div>
      )}
    </>
  );
}

export default MyOpportunitiesPage;