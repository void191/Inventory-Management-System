export const kpis = [
  { label: 'Total Stock Value', value: '$482,400', change: '+8.2% vs last month' },
  { label: 'Low-Stock Alerts', value: '18', change: '5 critical across 3 warehouses' },
  { label: 'Pending Orders', value: '27', change: '12 supplier, 15 customer orders' },
  { label: "Today's Shipments", value: '14', change: '91% ready before noon cut-off' },
];

export const stockTrend = [
  { name: 'Mon', value: 348 },
  { name: 'Tue', value: 362 },
  { name: 'Wed', value: 355 },
  { name: 'Thu', value: 374 },
  { name: 'Fri', value: 392 },
  { name: 'Sat', value: 388 },
  { name: 'Sun', value: 405 },
];

export const criticalAlerts = [
  { sku: 'SKU-1034', item: 'Ceramic Seal Rings', qty: 4, location: 'Warehouse A' },
  { sku: 'SKU-2051', item: 'Cedar Panel Clips', qty: 2, location: 'Warehouse B' },
  { sku: 'SKU-3019', item: 'Dust Filter Mesh', qty: 5, location: 'Warehouse C' },
];

export const shipmentBreakdown = [
  { label: 'Packed', value: 8 },
  { label: 'Picking', value: 4 },
  { label: 'Held', value: 2 },
];
