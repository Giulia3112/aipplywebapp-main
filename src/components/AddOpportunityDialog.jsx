import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

const AddOpportunityDialog = ({ isOpen, onOpenChange, onAddOpportunity }) => {
  const { toast } = useToast();
  
  const initialState = {
    title: '',
    company: '',
    description: '',
    type: '',
    tags: '',
    link: '',
    projectStage: '',
    sector: '',
    businessModel: '',
    teamSize: '',
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id, value) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.company || !formData.type) {
      toast({
        variant: "destructive",
        title: "Missing Fields",
        description: "Please fill out Title, Company, and Type.",
      });
      return;
    }
    
    const newOpportunity = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      teamSize: formData.teamSize ? parseInt(formData.teamSize, 10) : undefined,
    };
    
    onAddOpportunity(newOpportunity);
    setFormData(initialState);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Add New Opportunity</DialogTitle>
          <DialogDescription>
            Enter the details for the new opportunity. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto pr-2 space-y-6 py-4">
          <div>
            <h3 className="text-lg font-medium mb-4">Opportunity Details</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="e.g., Seed Funding Round" value={formData.title} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company / Organization</Label>
                  <Input id="company" placeholder="e.g., Innovate Ventures" value={formData.company} onChange={handleChange} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input id="description" placeholder="A brief description of the opportunity" value={formData.description} onChange={handleChange} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <Input id="type" placeholder="e.g., Accelerator, Grant" value={formData.type} onChange={handleChange} />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="tags">Tags (comma-separated)</Label>
                    <Input id="tags" placeholder="e.g., AI, Fintech, SaaS" value={formData.tags} onChange={handleChange} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="link">Application Link</Label>
                <Input id="link" placeholder="https://example.com/apply" value={formData.link} onChange={handleChange} />
              </div>
            </div>
          </div>
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium mb-4">Target Profile</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="projectStage">Project Stage</Label>
                  <Select onValueChange={(v) => handleSelectChange('projectStage', v)} value={formData.projectStage}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select stage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ideation">Ideation</SelectItem>
                      <SelectItem value="prototype">Prototype / MVP</SelectItem>
                      <SelectItem value="mvp_tested">MVP Tested</SelectItem>
                      <SelectItem value="traction">Traction</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sector">Sector(s)</Label>
                  <Input id="sector" placeholder="e.g., Fintech, Healthtech" value={formData.sector} onChange={handleChange} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="businessModel">Business Model</Label>
                  <Input id="businessModel" placeholder="e.g., SaaS, Marketplace" value={formData.businessModel} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="teamSize">Team Size</Label>
                  <Input id="teamSize" type="number" placeholder="e.g., 3" value={formData.teamSize} onChange={handleChange} />
                </div>
              </div>
            </div>
          </div>
        </form>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit}>Save Opportunity</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddOpportunityDialog;