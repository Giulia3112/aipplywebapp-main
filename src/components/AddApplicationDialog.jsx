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

const AddApplicationDialog = ({ isOpen, onOpenChange, onAddApplication }) => {
  const { toast } = useToast();
  const getTodayDate = () => new Date().toISOString().split('T')[0];

  const initialState = {
    name: '',
    position: '',
    applicant: '',
    submittedDate: getTodayDate(),
    status: 'pending',
    priority: 'medium',
    funding: '',
    price: '',
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
    if (!formData.name || !formData.position || !formData.applicant) {
      toast({
        variant: "destructive",
        title: "Missing Fields",
        description: "Please fill out all required fields.",
      });
      return;
    }
    onAddApplication(formData);
    setFormData(initialState);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Application</DialogTitle>
          <DialogDescription>
            Enter the details of the opportunity you are applying for.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Opportunity Name</Label>
            <Input id="name" value={formData.name} onChange={handleChange} className="col-span-3" placeholder="e.g., Y Combinator S25" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="position" className="text-right">Opportunity Type</Label>
            <Input id="position" value={formData.position} onChange={handleChange} className="col-span-3" placeholder="e.g., Accelerator" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="applicant" className="text-right">Applicant Name</Label>
            <Input id="applicant" value={formData.applicant} onChange={handleChange} className="col-span-3" placeholder="e.g., Your Startup Name" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="submittedDate" className="text-right">Application Date</Label>
            <Input id="submittedDate" type="date" value={formData.submittedDate} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="funding" className="text-right">Funding ($)</Label>
            <Input id="funding" type="number" value={formData.funding} onChange={handleChange} className="col-span-3" placeholder="e.g., 500000" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">Price/Cost ($)</Label>
            <Input id="price" type="number" value={formData.price} onChange={handleChange} className="col-span-3" placeholder="e.g., 150" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="priority" className="text-right">Priority</Label>
            <Select onValueChange={(v) => handleSelectChange('priority', v)} value={formData.priority}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit">Add Application</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddApplicationDialog;