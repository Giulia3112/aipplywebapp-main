import React from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const getStatusColor = (status) => {
  switch (status) {
    case 'approved': return 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400 border-green-200 dark:border-green-500/30';
    case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-400 border-yellow-200 dark:border-yellow-500/30';
    case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-400 border-red-200 dark:border-red-500/30';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-500/30';
  }
};

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-400 border-red-200 dark:border-red-500/30';
    case 'medium': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-400 border-orange-200 dark:border-orange-500/30';
    case 'low': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-400 border-blue-200 dark:border-blue-500/30';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-500/30';
  }
};

const DetailItem = ({ label, value }) => (
  <div>
    <span className="text-sm text-slate-500 dark:text-slate-400">{label}</span>
    <p className="text-slate-900 dark:text-white">{value}</p>
  </div>
);

const ViewApplicationDialog = ({ isOpen, onOpenChange, app, onStatusChange }) => {
  if (!app) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl">{app.name}</DialogTitle>
        </DialogHeader>
        <div className="flex-grow overflow-y-auto pr-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Applicant Information</h3>
              <div className="space-y-3">
                <DetailItem label="Name" value={app.applicant} />
                <DetailItem label="Email" value={app.email} />
                <DetailItem label="Position" value={app.position} />
                <DetailItem label="Experience" value={app.experience} />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Application Details</h3>
              <div className="space-y-3">
                <DetailItem label="Department" value={app.department} />
                <DetailItem label="Submitted" value={app.submittedDate} />
                <div>
                  <span className="text-sm text-slate-500 dark:text-slate-400">Status</span>
                  <Badge className={`${getStatusColor(app.status)} border mt-1`}>
                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                  </Badge>
                </div>
                <div>
                  <span className="text-sm text-slate-500 dark:text-slate-400">Priority</span>
                  <Badge className={`${getPriorityColor(app.priority)} border mt-1`}>
                    {app.priority.charAt(0).toUpperCase() + app.priority.slice(1)}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t">
          <div className="flex gap-3">
            <Button onClick={() => onStatusChange(app.id, 'approved')} className="bg-green-600 hover:bg-green-700 text-white">
              Approve
            </Button>
            <Button onClick={() => onStatusChange(app.id, 'rejected')} variant="destructive">
              Reject
            </Button>
            <Button onClick={() => onStatusChange(app.id, 'pending')} variant="outline">
              Mark Pending
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewApplicationDialog;