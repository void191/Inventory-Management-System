import { Layers3 } from 'lucide-react';
import { stockLevels } from './data';

export const moduleConfig = {
  name: 'Stock Levels',
  route: '/stock-levels',
  icon: Layers3,
  mockData: {
    stockLevels,
  },
};
