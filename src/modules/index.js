import { moduleConfig as dashboardConfig } from './Dashboard/moduleConfig';
import { moduleConfig as productsConfig } from './Products/moduleConfig';
import { moduleConfig as stockLevelsConfig } from './StockLevels/moduleConfig';
import { moduleConfig as purchaseOrdersConfig } from './PurchaseOrders/moduleConfig';
import { moduleConfig as salesOrdersConfig } from './SalesOrders/moduleConfig';
import { moduleConfig as warehousesConfig } from './Warehouses/moduleConfig';
import { moduleConfig as suppliersConfig } from './Suppliers/moduleConfig';
import { moduleConfig as stockMovementsConfig } from './StockMovements/moduleConfig';
import { moduleConfig as reportsConfig } from './Reports/moduleConfig';

export const modules = [
  { ...dashboardConfig, loadComponent: () => import('./Dashboard') },
  { ...productsConfig, loadComponent: () => import('./Products') },
  { ...stockLevelsConfig, loadComponent: () => import('./StockLevels') },
  { ...purchaseOrdersConfig, loadComponent: () => import('./PurchaseOrders') },
  { ...salesOrdersConfig, loadComponent: () => import('./SalesOrders') },
  { ...warehousesConfig, loadComponent: () => import('./Warehouses') },
  { ...suppliersConfig, loadComponent: () => import('./Suppliers') },
  { ...stockMovementsConfig, loadComponent: () => import('./StockMovements') },
  { ...reportsConfig, loadComponent: () => import('./Reports') },
];
