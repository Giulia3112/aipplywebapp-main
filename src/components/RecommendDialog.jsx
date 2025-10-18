import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';

const RecommendDialog = ({ isOpen, onOpenChange, user, opportunities, onRecommend }) => {
  const [selectedOpportunities, setSelectedOpportunities] = useState([]);

  useEffect(() => {
    if (user) {
      setSelectedOpportunities(user.recommendedOpportunityIds || []);
    }
  }, [user]);

  if (!user) return null;

  const handleCheckboxChange = (opportunityId) => {
    setSelectedOpportunities(prev =>
      prev.includes(opportunityId)
        ? prev.filter(id => id !== opportunityId)
        : [...prev, opportunityId]
    );
  };

  const handleSubmit = () => {
    onRecommend(user.email, selectedOpportunities);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Recommend Opportunities</DialogTitle>
          <DialogDescription>
            Select opportunities to recommend to <span className="font-semibold">{user.name}</span>.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-72 w-full rounded-md border p-4">
          <div className="space-y-4">
            {opportunities.map(op => (
              <div key={op.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`rec-${op.id}`}
                  checked={selectedOpportunities.includes(op.id)}
                  onCheckedChange={() => handleCheckboxChange(op.id)}
                />
                <Label htmlFor={`rec-${op.id}`} className="font-normal cursor-pointer">
                  {op.title}
                </Label>
              </div>
            ))}
          </div>
        </ScrollArea>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit}>Send Recommendation</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RecommendDialog;