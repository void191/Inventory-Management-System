import { useMemo, useState } from 'react';
import { ArrowUpDown, Plus } from 'lucide-react';
import { moduleConfig } from './moduleConfig';

const blankForm = {
  supplier: '',
  eta: '',
  amount: '',
};

function getStatusClass(status) {
  if (status === 'Delivered') return 'badge badge--success';
  if (status === 'Sent') return 'badge badge--warning';
  return 'badge badge--sand';
}

function PurchaseOrders({ eventBus }) {
  const [orders, setOrders] = useState(moduleConfig.mockData.purchaseOrders);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState(blankForm);
  const [sortBy, setSortBy] = useState({ key: 'eta', direction: 'asc' });

  const orderedRows = useMemo(
    () =>
      [...orders].sort((left, right) => {
        const leftValue = left[sortBy.key];
        const rightValue = right[sortBy.key];
        const comparison = leftValue > rightValue ? 1 : leftValue < rightValue ? -1 : 0;
        return sortBy.direction === 'asc' ? comparison : -comparison;
      }),
    [orders, sortBy],
  );

  const handleCreate = () => {
    const nextOrder = {
      id: `PO-${1000 + orders.length + 1}`,
      supplier: form.supplier,
      eta: form.eta,
      amount: form.amount,
      status: 'Draft',
    };

    setOrders((current) => [nextOrder, ...current]);
    setForm(blankForm);
    setIsModalOpen(false);
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
            <p className="eyebrow">Inbound Supply</p>
            <h3>Manage supplier purchase commitments</h3>
          </div>
        </div>
        <button type="button" className="action-button" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} /> Create Order
        </button>
      </div>

      <div className="table-shell">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                {[
                  ['id', 'Order'],
                  ['supplier', 'Supplier'],
                  ['eta', 'ETA'],
                  ['amount', 'Amount'],
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orderedRows.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.supplier}</td>
                  <td>{order.eta}</td>
                  <td>{order.amount}</td>
                  <td>
                    <span className={getStatusClass(order.status)}>{order.status}</span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="status-action"
                      onClick={() => {
                        setOrders((current) =>
                          current.map((item) =>
                            item.id === order.id ? { ...item, status: 'Delivered' } : item,
                          ),
                        );
                        eventBus.emit('purchase-order:received', order);
                      }}
                      disabled={order.status === 'Delivered'}
                    >
                      Mark received
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="overlay" role="presentation" onClick={() => setIsModalOpen(false)}>
          <div className="modal-card" role="dialog" onClick={(event) => event.stopPropagation()}>
            <div className="module-header" style={{ marginBottom: 20 }}>
              <div>
                <p className="eyebrow">New Purchase Order</p>
                <h3>Create inbound order</h3>
              </div>
            </div>
            <div className="form-grid">
              <label>
                <span className="eyebrow">Supplier</span>
                <input
                  className="surface-input"
                  value={form.supplier}
                  onChange={(event) => setForm((current) => ({ ...current, supplier: event.target.value }))}
                />
              </label>
              <label>
                <span className="eyebrow">ETA</span>
                <input
                  className="surface-input"
                  type="date"
                  value={form.eta}
                  onChange={(event) => setForm((current) => ({ ...current, eta: event.target.value }))}
                />
              </label>
              <label>
                <span className="eyebrow">Amount</span>
                <input
                  className="surface-input"
                  placeholder="$0.00"
                  value={form.amount}
                  onChange={(event) => setForm((current) => ({ ...current, amount: event.target.value }))}
                />
              </label>
            </div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 20 }}>
              <button type="button" className="subtle-button" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button
                type="button"
                className="action-button"
                onClick={handleCreate}
                disabled={!form.supplier || !form.eta || !form.amount}
              >
                Save order
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default PurchaseOrders;
