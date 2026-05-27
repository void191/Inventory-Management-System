export const warehouses = [
  {
    id: 'WH-A',
    name: 'Warehouse A',
    location: 'Baghdad North',
    bins: 118,
    occupancy: 72,
    binView: [
      { bin: 'A-01', item: 'Shelf Brackets', qty: 84 },
      { bin: 'A-09', item: 'Packing Wrap', qty: 41 },
      { bin: 'A-14', item: 'Storage Bins', qty: 22 },
    ],
  },
  {
    id: 'WH-B',
    name: 'Warehouse B',
    location: 'Basra Hub',
    bins: 86,
    occupancy: 58,
    binView: [
      { bin: 'B-03', item: 'Label Holders', qty: 180 },
      { bin: 'B-17', item: 'Drawer Inserts', qty: 16 },
      { bin: 'B-20', item: 'Tag Sets', qty: 64 },
    ],
  },
  {
    id: 'WH-C',
    name: 'Warehouse C',
    location: 'Mosul Inland',
    bins: 64,
    occupancy: 83,
    binView: [
      { bin: 'C-07', item: 'Filter Mesh', qty: 11 },
      { bin: 'C-11', item: 'Seal Rings', qty: 6 },
      { bin: 'C-15', item: 'Panel Clips', qty: 5 },
    ],
  },
];
