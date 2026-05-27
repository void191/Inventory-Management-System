import { LayoutDashboard } from 'lucide-react';
import { criticalAlerts, kpis, shipmentBreakdown, stockTrend } from './data';

export const moduleConfig = {
  name: 'Dashboard',
  route: '/dashboard',
  icon: LayoutDashboard,
  mockData: {
    kpis,
    stockTrend,
    criticalAlerts,
    shipmentBreakdown,
  },
};
