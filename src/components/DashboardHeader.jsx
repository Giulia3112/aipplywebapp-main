import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Download, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DashboardHeader = ({ 
  title, 
  description, 
  onAddApplication, 
  onImport, 
  onExport,
  showImportExport = true,
  addButtonLabel = "Add Application"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
            {title}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">{description}</p>
        </div>
        <div className="flex items-center gap-3">
          {showImportExport && (
            <>
              <Button onClick={onImport} variant="outline" className="hidden sm:flex">
                <Upload className="w-4 h-4 mr-2" />
                Import
              </Button>
              <Button onClick={onExport} variant="outline" className="hidden sm:flex">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </>
          )}
          <Button onClick={onAddApplication}>
            <Plus className="w-4 h-4 mr-2" />
            {addButtonLabel}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardHeader;