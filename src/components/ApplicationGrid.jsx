import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApplicationCard from './ApplicationCard';

const ApplicationGrid = ({ applications, onView, onStatusChange, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
    >
      <AnimatePresence>
        {applications.map((app, index) => (
          <ApplicationCard
            key={app.id}
            app={app}
            index={index}
            onView={onView}
            onStatusChange={onStatusChange}
            onDelete={onDelete}
          />
        ))}
      </AnimatePresence>
      {applications.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 col-span-full"
        >
          <p className="text-slate-500 dark:text-slate-400 text-lg">No applications found matching your criteria</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ApplicationGrid;