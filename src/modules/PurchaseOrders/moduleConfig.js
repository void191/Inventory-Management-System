import { ClipboardList } from 'lucide-react';
import { purchaseOrders } from './data';

export const moduleConfig = {
  name: 'Purchase Orders',
  route: '/purchase-orders',
  icon: ClipboardList,
  mockData: {
    purchaseOrders,
  },
};
