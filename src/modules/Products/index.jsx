import { useMemo, useState } from 'react';
import { ArrowUpDown, Search } from 'lucide-react';
import Dropdown from '../../app/components/Dropdown';
import { moduleConfig } from './moduleConfig';

function getStockBadge(product) {
  if (product.stock <= product.threshold) return 'badge badge--danger';
  if (product.stock <= product.threshold * 1.5) return 'badge badge--warning';
  return 'badge badge--success';
}

function Products({ eventBus }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState({ key: 'name', direction: 'asc' });
  const [selectedSku, setSelectedSku] = useState(moduleConfig.mockData.products[0].sku);

  const categories = ['All', ...new Set(moduleConfig.mockData.products.map((product) => product.category))];

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return moduleConfig.mockData.products
      .filter((product) => {
        const matchesQuery =
          !normalizedQuery ||
          [product.sku, product.name, product.supplier].some((value) =>
            value.toLowerCase().includes(normalizedQuery),
          );
        const matchesCategory = category === 'All' || product.category === category;
        return matchesQuery && matchesCategory;
      })
      .sort((left, right) => {
        const leftValue = left[sortBy.key];
        const rightValue = right[sortBy.key];
        const comparison = leftValue > rightValue ? 1 : leftValue < rightValue ? -1 : 0;
        return sortBy.direction === 'asc' ? comparison : -comparison;
      });
  }, [category, query, sortBy]);

  const selectedProduct =
    filteredProducts.find((product) => product.sku === selectedSku) ?? filteredProducts[0] ?? null;

  const handleSort = (key) => {
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
            <p className="eyebrow">Catalog</p>
            <h3>Search and inspect product master records</h3>
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
              placeholder="SKU, name, supplier"
            />
          </div>
        </label>
        <Dropdown
          label="Category"
          value={category}
          onChange={setCategory}
          options={categories.map((option) => ({ label: option, value: option }))}
        />
      </div>

      <div className="split-layout">
        <div className="table-shell">
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  {[
                    ['sku', 'SKU'],
                    ['name', 'Name'],
                    ['category', 'Category'],
                    ['price', 'Price'],
                    ['supplier', 'Supplier'],
                    ['stock', 'Stock'],
                  ].map(([key, label]) => (
                    <th key={key}>
                      <button className="table-sort" type="button" onClick={() => handleSort(key)}>
                        {label}
                        <span
                          className={`sort-arrow ${sortBy.key === key ? 'is-active' : ''} ${
                            sortBy.direction === 'desc' && sortBy.key === key ? 'is-desc' : ''
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
                {filteredProducts.map((product) => (
                  <tr
                    key={product.sku}
                    className="clickable-row"
                    onClick={() => {
                      setSelectedSku(product.sku);
                      eventBus.emit('product:selected', product);
                    }}
                  >
                    <td>{product.sku}</td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>${product.price.toFixed(2)}</td>
                    <td>{product.supplier}</td>
                    <td>
                      <span className={getStockBadge(product)}>{product.stock} units</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {selectedProduct && (
          <aside className="detail-panel">
            <h4>{selectedProduct.name}</h4>
            <div className="inline-meta" style={{ marginBottom: 18 }}>
              <span>{selectedProduct.sku}</span>
              <span>{selectedProduct.category}</span>
            </div>
            <div className="stack">
              <div className="list-row">
                <span>Supplier</span>
                <strong>{selectedProduct.supplier}</strong>
              </div>
              <div className="list-row">
                <span>Unit Price</span>
                <strong>${selectedProduct.price.toFixed(2)}</strong>
              </div>
              <div className="list-row">
                <span>Current Stock</span>
                <strong>{selectedProduct.stock}</strong>
              </div>
              <div className="list-row">
                <span>Reorder Threshold</span>
                <strong>{selectedProduct.threshold}</strong>
              </div>
            </div>
            <div style={{ marginTop: 18 }}>
              <p style={{ marginBottom: 8 }}>Stock confidence</p>
              <div className="progress-track">
                <div
                  className={`progress-fill ${
                    selectedProduct.stock <= selectedProduct.threshold
                      ? 'is-danger'
                      : selectedProduct.stock <= selectedProduct.threshold * 1.5
                        ? 'is-warning'
                        : 'is-success'
                  }`}
                  style={{ width: `${Math.min((selectedProduct.stock / 200) * 100, 100)}%` }}
                />
              </div>
            </div>
          </aside>
        )}
      </div>
    </section>
  );
}

export default Products;
