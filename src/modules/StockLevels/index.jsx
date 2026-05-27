import { moduleConfig } from './moduleConfig';

function getHealth(available) {
  if (available >= 700) return { label: 'Healthy', fill: 'is-success', badge: 'badge badge--success' };
  if (available >= 300) return { label: 'Watch', fill: 'is-warning', badge: 'badge badge--warning' };
  return { label: 'Critical', fill: 'is-danger', badge: 'badge badge--danger' };
}

function StockLevels({ eventBus }) {
  return (
    <section className="module-page">
      <div className="module-header">
        <div className="module-header__title">
          <div className="module-header__title-icon">
            <moduleConfig.icon size={20} />
          </div>
          <div>
            <p className="eyebrow">Warehouse Availability</p>
            <h3>Monitor stock health across storage sites</h3>
          </div>
        </div>
      </div>

      <div className="card-grid">
        {moduleConfig.mockData.stockLevels.map((item) => {
          const health = getHealth(item.available);
          return (
            <article
              key={item.warehouse}
              className="card"
              onMouseEnter={() => {
                if (health.label === 'Critical') {
                  eventBus.emit('inventory:critical', {
                    message: `${item.warehouse} is down to ${item.available} available units and needs replenishment.`,
                  });
                }
              }}
            >
              <div className="module-header" style={{ marginBottom: 16 }}>
                <div>
                  <h4>{item.warehouse}</h4>
                  <p>Live balance split</p>
                </div>
                <span className={health.badge}>{health.label}</span>
              </div>
              <div className="stack">
                <div className="list-row">
                  <span>On-hand</span>
                  <strong>{item.onHand}</strong>
                </div>
                <div className="list-row">
                  <span>Reserved</span>
                  <strong>{item.reserved}</strong>
                </div>
                <div className="list-row">
                  <span>Available</span>
                  <strong>{item.available}</strong>
                </div>
              </div>
              <div style={{ marginTop: 18 }}>
                <div className="inline-meta" style={{ justifyContent: 'space-between', marginBottom: 8 }}>
                  <span>Stock health</span>
                  <span>{Math.round((item.available / item.onHand) * 100)}%</span>
                </div>
                <div className="progress-track">
                  <div
                    className={`progress-fill ${health.fill}`}
                    style={{ width: `${Math.round((item.available / item.onHand) * 100)}%` }}
                  />
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default StockLevels;
