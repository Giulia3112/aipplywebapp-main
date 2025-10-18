import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { BarChart3, CheckCircle, Clock, XCircle } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, colorClass, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
  >
    <Card>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm font-medium ${colorClass}`}>{title}</p>
            <p className="text-3xl font-bold text-slate-900 dark:text-white">{value}</p>
          </div>
          <Icon className={`w-8 h-8 ${colorClass}`} />
        </div>
      </div>
    </Card>
  </motion.div>
);

const StatsCards = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard title="Total Applications" value={stats.total} icon={BarChart3} colorClass="text-blue-500" delay={0.1} />
      <StatCard title="Approved" value={stats.approved} icon={CheckCircle} colorClass="text-green-500" delay={0.2} />
      <StatCard title="Pending" value={stats.pending} icon={Clock} colorClass="text-yellow-500" delay={0.3} />
      <StatCard title="Rejected" value={stats.rejected} icon={XCircle} colorClass="text-red-500" delay={0.4} />
    </div>
  );
};

export default StatsCards;