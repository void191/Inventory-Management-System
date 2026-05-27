import { Boxes } from 'lucide-react';
import { products } from './data';

export const moduleConfig = {
  name: 'Products',
  route: '/products',
  icon: Boxes,
  mockData: {
    products,
  },
};
