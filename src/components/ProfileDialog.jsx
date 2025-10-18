import React, { useState, useEffect } from 'react';
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
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

const PersonalForm = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [id]: type === 'checkbox' ? checked : value }));
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" placeholder="Giulia Alvares" value={formData.fullName || ''} onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="age">Age</Label>
          <Input id="age" type="number" placeholder="25" value={formData.age || ''} onChange={handleChange} />
        </div>
      </div>
       <div className="space-y-2">
        <Label htmlFor="gender">Gender</Label>
        <Input id="gender" placeholder="Female" value={formData.gender || ''} onChange={handleChange} />
      </div>
       <div className="space-y-2">
        <Label htmlFor="ethnicity">Race/Ethnicity</Label>
        <Input id="ethnicity" placeholder="e.g., Hispanic or Latino" value={formData.ethnicity || ''} onChange={handleChange} />
      </div>
      <div className="items-top flex space-x-2">
        <Checkbox id="hasCnpj" checked={formData.hasCnpj || false} onCheckedChange={(checked) => setFormData(p => ({...p, hasCnpj: checked}))} />
        <div className="grid gap-1.5 leading-none">
          <label htmlFor="hasCnpj" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            I have CNPJ or MEI
          </label>
        </div>
      </div>
    </div>
  );
};

const ProjectForm = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id, value) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  return (
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
          <Label htmlFor="sector">Sector</Label>
          <Input id="sector" placeholder="e.g., Fintech, Healthtech" value={formData.sector || ''} onChange={handleChange} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="businessModel">Business Model</Label>
        <Input id="businessModel" placeholder="e.g., SaaS, Marketplace" value={formData.businessModel || ''} onChange={handleChange} />
      </div>
       <div className="space-y-2">
        <Label htmlFor="teamSize">Team Size</Label>
        <Input id="teamSize" type="number" placeholder="3" value={formData.teamSize || ''} onChange={handleChange} />
      </div>
    </div>
  );
};

const ProfileDialog = ({ isOpen, onOpenChange, userProfile, onProfileUpdate }) => {
  const [formData, setFormData] = useState({});
  const { toast } = useToast();

  useEffect(() => {
    if (userProfile) {
      setFormData(userProfile);
    }
  }, [userProfile, isOpen]);

  const handleSubmit = () => {
    onProfileUpdate(formData);
    onOpenChange(false);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="flex-grow overflow-y-auto pr-2 space-y-6 py-4">
          <div>
            <h3 className="text-lg font-medium mb-4">Personal Information</h3>
            <PersonalForm formData={formData} setFormData={setFormData} />
          </div>
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium mb-4">Project Information</h3>
            <ProjectForm formData={formData} setFormData={setFormData} />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button type="button" onClick={handleSubmit}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialog;