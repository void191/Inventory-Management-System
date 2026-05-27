import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import Dropdown from '../../app/components/Dropdown';
import { moduleConfig } from './moduleConfig';

function Suppliers() {
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState('All');

  const regions = ['All', ...new Set(moduleConfig.mockData.suppliers.map((supplier) => supplier.region))];
  const filteredSuppliers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return moduleConfig.mockData.suppliers.filter((supplier) => {
      const matchesQuery =
        !normalizedQuery ||
        [supplier.name, supplier.contact].some((value) => value.toLowerCase().includes(normalizedQuery));
      const matchesRegion = region === 'All' || supplier.region === region;
      return matchesQuery && matchesRegion;
    });
  }, [query, region]);

  return (
    <section className="module-page">
      <div className="module-header">
        <div className="module-header__title">
          <div className="module-header__title-icon">
            <moduleConfig.icon size={20} />
          </div>
          <div>
            <p className="eyebrow">Vendor Directory</p>
            <h3>Discover suppliers by region and performance</h3>
          </div>
        </div>
      </div>

      <div className="toolbar">
        <label>
          <span className="eyebrow">Search</span>
          <div style={{ position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: 12, top: 14, color: 'var(--sand-muted)' }} />
            <input
              className="surface-input"
              style={{ paddingLeft: 38 }}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Supplier or contact"
            />
          </div>
        </label>
        <Dropdown
          label="Region"
          value={region}
          onChange={setRegion}
          options={regions.map((option) => ({ label: option, value: option }))}
        />
      </div>

      <div className="supplier-grid">
        {filteredSuppliers.map((supplier) => (
          <article key={supplier.id} className="supplier-card">
            <h4>{supplier.name}</h4>
            <p>{supplier.contact}</p>
            <div className="stack" style={{ marginTop: 16 }}>
              <div className="list-row">
                <span>Region</span>
                <strong>{supplier.region}</strong>
              </div>
              <div className="list-row">
                <span>Active Contracts</span>
                <strong>{supplier.contracts}</strong>
              </div>
              <div>
                <div className="inline-meta" style={{ justifyContent: 'space-between', marginBottom: 8 }}>
                  <span>Performance Rating</span>
                  <strong>{supplier.rating}%</strong>
                </div>
                <div className="progress-track">
                  <div
                    className={`progress-fill ${
                      supplier.rating >= 85 ? 'is-success' : supplier.rating >= 75 ? 'is-warning' : 'is-danger'
                    }`}
                    style={{ width: `${supplier.rating}%` }}
                  />
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Suppliers;
