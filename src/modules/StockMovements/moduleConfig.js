import { ArrowLeftRight } from 'lucide-react';
import { stockMovements } from './data';

export const moduleConfig = {
  name: 'Stock Movements',
  route: '/stock-movements',
  icon: ArrowLeftRight,
  mockData: {
    stockMovements,
  },
};
