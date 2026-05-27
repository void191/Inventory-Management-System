import { useState } from 'react';
import { moduleConfig } from './moduleConfig';

function occupancyClass(occupancy) {
  if (occupancy < 65) return 'is-success';
  if (occupancy < 80) return 'is-warning';
  return 'is-danger';
}

function Warehouses() {
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);

  return (
    <section className="module-page">
      <div className="module-header">
        <div className="module-header__title">
          <div className="module-header__title-icon">
            <moduleConfig.icon size={20} />
          </div>
          <div>
            <p className="eyebrow">Storage Network</p>
            <h3>Drill into warehouse occupancy and bins</h3>
          </div>
        </div>
      </div>

      <div className="warehouse-grid">
        {moduleConfig.mockData.warehouses.map((warehouse) => (
          <article
            key={warehouse.id}
            className="warehouse-card"
            onClick={() => setSelectedWarehouse(warehouse)}
          >
            <h4>{warehouse.name}</h4>
            <p>{warehouse.location}</p>
            <div className="stack" style={{ marginTop: 16 }}>
              <div className="list-row">
                <span>Total bins</span>
                <strong>{warehouse.bins}</strong>
              </div>
              <div>
                <div className="inline-meta" style={{ justifyContent: 'space-between', marginBottom: 8 }}>
                  <span>Occupancy</span>
                  <strong>{warehouse.occupancy}%</strong>
                </div>
                <div className="progress-track">
                  <div
                    className={`progress-fill ${occupancyClass(warehouse.occupancy)}`}
                    style={{ width: `${warehouse.occupancy}%` }}
                  />
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {selectedWarehouse && (
        <div className="overlay" role="presentation" onClick={() => setSelectedWarehouse(null)}>
          <div className="modal-card" role="dialog" onClick={(event) => event.stopPropagation()}>
            <div className="module-header" style={{ marginBottom: 18 }}>
              <div>
                <p className="eyebrow">Bin-Level View</p>
                <h3>{selectedWarehouse.name}</h3>
              </div>
            </div>
            <div className="stack">
              {selectedWarehouse.binView.map((bin) => (
                <div key={bin.bin} className="list-row">
                  <div>
                    <strong>{bin.bin}</strong>
                    <p>{bin.item}</p>
                  </div>
                  <span className="badge badge--sand">{bin.qty} units</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Warehouses;
