import { Handshake } from 'lucide-react';
import { suppliers } from './data';

export const moduleConfig = {
  name: 'Suppliers',
  route: '/suppliers',
  icon: Handshake,
  mockData: {
    suppliers,
  },
};
