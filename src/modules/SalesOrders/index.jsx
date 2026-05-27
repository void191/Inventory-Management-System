import { useMemo, useState } from 'react';
import { ArrowUpDown } from 'lucide-react';
import Dropdown from '../../app/components/Dropdown';
import { moduleConfig } from './moduleConfig';

function statusClass(status) {
  if (status === 'Shipped') return 'badge badge--success';
  if (status === 'Return Initiated') return 'badge badge--danger';
  if (status === 'Ready to Ship') return 'badge badge--warning';
  return 'badge badge--sand';
}

function SalesOrders({ eventBus }) {
  const [orders, setOrders] = useState(moduleConfig.mockData.salesOrders);
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedId, setSelectedId] = useState(moduleConfig.mockData.salesOrders[0].id);
  const [sortBy, setSortBy] = useState({ key: 'dueDate', direction: 'asc' });

  const statuses = ['All', ...new Set(moduleConfig.mockData.salesOrders.map((order) => order.status))];
  const filteredOrders = useMemo(
    () =>
      orders
        .filter((order) => statusFilter === 'All' || order.status === statusFilter)
        .sort((left, right) => {
          const leftValue = left[sortBy.key];
          const rightValue = right[sortBy.key];
          const comparison = leftValue > rightValue ? 1 : leftValue < rightValue ? -1 : 0;
          return sortBy.direction === 'asc' ? comparison : -comparison;
        }),
    [orders, sortBy, statusFilter],
  );

  const selectedOrder = filteredOrders.find((order) => order.id === selectedId) ?? filteredOrders[0] ?? null;

  const patchOrder = (id, nextStatus) => {
    setOrders((current) => current.map((order) => (order.id === id ? { ...order, status: nextStatus } : order)));
    eventBus.emit('sales-order:updated', { id, status: nextStatus });
  };

  const updateSort = (key) => {
    setSortBy((current) =>
      current.key === key
        ? { key, direction: current.direction === 'asc' ? 'desc' : 'asc' }
        : { key, direction: 'asc' },
    );
  };

  return (
    <section className="module-page">
      <div className="module-header">
        <div className="module-header__title">
          <div className="module-header__title-icon">
            <moduleConfig.icon size={20} />
          </div>
          <div>
            <p className="eyebrow">Outbound Orders</p>
            <h3>Track fulfillment and customer returns</h3>
          </div>
        </div>
      </div>

      <div className="filter-row">
        <Dropdown
          label="Fulfillment Status"
          value={statusFilter}
          onChange={setStatusFilter}
          options={statuses.map((status) => ({ label: status, value: status }))}
        />
      </div>

      <div className="split-layout">
        <div className="table-shell">
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  {[
                    ['id', 'Order'],
                    ['customer', 'Customer'],
                    ['dueDate', 'Due Date'],
                    ['total', 'Total'],
                    ['status', 'Status'],
                  ].map(([key, label]) => (
                    <th key={key}>
                      <button type="button" className="table-sort" onClick={() => updateSort(key)}>
                        {label}
                        <span
                          className={`sort-arrow ${sortBy.key === key ? 'is-active' : ''} ${
                            sortBy.key === key && sortBy.direction === 'desc' ? 'is-desc' : ''
                          }`}
                        >
                          <ArrowUpDown size={14} />
                        </span>
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="clickable-row" onClick={() => setSelectedId(order.id)}>
                    <td>{order.id}</td>
                    <td>{order.customer}</td>
                    <td>{order.dueDate}</td>
                    <td>{order.total}</td>
                    <td>
                      <span className={statusClass(order.status)}>{order.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {selectedOrder && (
          <aside className="detail-panel">
            <h4>{selectedOrder.id}</h4>
            <p style={{ marginBottom: 14 }}>{selectedOrder.customer}</p>
            <div className="stack">
              <div className="list-row">
                <span>Destination</span>
                <strong>{selectedOrder.destination}</strong>
              </div>
              <div className="list-row">
                <span>Due Date</span>
                <strong>{selectedOrder.dueDate}</strong>
              </div>
              <div className="list-row">
                <span>Order Lines</span>
                <strong>{selectedOrder.lines}</strong>
              </div>
              <div className="list-row">
                <span>Value</span>
                <strong>{selectedOrder.total}</strong>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 18 }}>
              <button
                type="button"
                className="action-button"
                onClick={() => patchOrder(selectedOrder.id, 'Shipped')}
              >
                Mark shipped
              </button>
              <button
                type="button"
                className="subtle-button"
                onClick={() => patchOrder(selectedOrder.id, 'Return Initiated')}
              >
                Return initiated
              </button>
            </div>
          </aside>
        )}
      </div>
    </section>
  );
}

export default SalesOrders;
