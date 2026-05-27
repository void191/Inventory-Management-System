import { Warehouse } from 'lucide-react';
import { warehouses } from './data';

export const moduleConfig = {
  name: 'Warehouses',
  route: '/warehouses',
  icon: Warehouse,
  mockData: {
    warehouses,
  },
};
