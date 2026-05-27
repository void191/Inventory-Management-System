import { ShoppingCart } from 'lucide-react';
import { salesOrders } from './data';

export const moduleConfig = {
  name: 'Sales Orders',
  route: '/sales-orders',
  icon: ShoppingCart,
  mockData: {
    salesOrders,
  },
};
