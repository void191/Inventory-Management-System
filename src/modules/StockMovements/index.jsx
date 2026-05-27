import { useMemo, useState } from 'react';
import { ArrowUpDown } from 'lucide-react';
import Dropdown from '../../app/components/Dropdown';
import { moduleConfig } from './moduleConfig';

function badgeClass(type) {
  if (type === 'Receipt') return 'badge badge--success';
  if (type === 'Issue') return 'badge badge--warning';
  if (type === 'Adjustment') return 'badge badge--danger';
  return 'badge badge--sand';
}

function StockMovements() {
  const [typeFilter, setTypeFilter] = useState('All');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [sortBy, setSortBy] = useState({ key: 'date', direction: 'desc' });

  const types = ['All', ...new Set(moduleConfig.mockData.stockMovements.map((movement) => movement.type))];
  const rows = useMemo(() => {
    return moduleConfig.mockData.stockMovements
      .filter((movement) => {
        const matchesType = typeFilter === 'All' || movement.type === typeFilter;
        const matchesFrom = !dateFrom || movement.date >= dateFrom;
        const matchesTo = !dateTo || movement.date <= dateTo;
        return matchesType && matchesFrom && matchesTo;
      })
      .sort((left, right) => {
        const leftValue = left[sortBy.key];
        const rightValue = right[sortBy.key];
        const comparison = leftValue > rightValue ? 1 : leftValue < rightValue ? -1 : 0;
        return sortBy.direction === 'asc' ? comparison : -comparison;
      });
  }, [dateFrom, dateTo, sortBy, typeFilter]);

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
            <p className="eyebrow">Audit Trail</p>
            <h3>Review all stock receipts, issues, and adjustments</h3>
          </div>
        </div>
      </div>

      <div className="filter-row">
        <Dropdown
          label="Movement Type"
          value={typeFilter}
          onChange={setTypeFilter}
          options={types.map((type) => ({ label: type, value: type }))}
        />
        <label>
          <span className="eyebrow">From</span>
          <input className="surface-input" type="date" value={dateFrom} onChange={(event) => setDateFrom(event.target.value)} />
        </label>
        <label>
          <span className="eyebrow">To</span>
          <input className="surface-input" type="date" value={dateTo} onChange={(event) => setDateTo(event.target.value)} />
        </label>
      </div>

      <div className="table-shell">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                {[
                  ['date', 'Date'],
                  ['type', 'Type'],
                  ['sku', 'SKU'],
                  ['qty', 'Quantity'],
                  ['warehouse', 'Warehouse'],
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
              {rows.map((movement) => (
                <tr key={movement.id}>
                  <td>{movement.date}</td>
                  <td>
                    <span className={badgeClass(movement.type)}>{movement.type}</span>
                  </td>
                  <td>{movement.sku}</td>
                  <td>{movement.qty}</td>
                  <td>{movement.warehouse}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default StockMovements;
