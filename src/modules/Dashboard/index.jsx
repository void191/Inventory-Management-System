import { useEffect, useState } from 'react';
import { AlertTriangle, PackageSearch } from 'lucide-react';
import { Line, LineChart, ResponsiveContainer, Tooltip } from 'recharts';
import { moduleConfig } from './moduleConfig';

function Dashboard({ eventBus }) {
  const [bannerMessage, setBannerMessage] = useState(
    `${moduleConfig.mockData.criticalAlerts[0].item} is below safety stock in ${moduleConfig.mockData.criticalAlerts[0].location}.`,
  );

  useEffect(() => {
    const unsubscribe = eventBus.on('inventory:critical', (payload) => {
      if (payload?.message) {
        setBannerMessage(payload.message);
      }
    });

    return unsubscribe;
  }, [eventBus]);

  return (
    <section className="module-page">
      <div className="module-header">
        <div className="module-header__title">
          <div className="module-header__title-icon">
            <moduleConfig.icon size={20} />
          </div>
          <div>
            <p className="eyebrow">Operations Overview</p>
            <h3>Inventory performance at a glance</h3>
          </div>
        </div>
      </div>

      <div className="banner">
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <AlertTriangle color="var(--danger)" />
          <div>
            <strong>Critical stock alert</strong>
            <p>{bannerMessage}</p>
          </div>
        </div>
        <span className="badge badge--danger">
          {moduleConfig.mockData.criticalAlerts.length} urgent items
        </span>
      </div>

      <div className="kpi-grid">
        {moduleConfig.mockData.kpis.map((kpi, index) => (
          <article key={kpi.label} className="metric-card">
            <p>{kpi.label}</p>
            <div className="metric-value">{kpi.value}</div>
            <p className="metric-footnote">{kpi.change}</p>
            <div className="sparkline">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={moduleConfig.mockData.stockTrend.map((point) => ({
                    ...point,
                    value: point.value - index * 8,
                  }))}
                >
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={index % 2 === 0 ? '#A67C52' : '#7A5C3E'}
                    strokeWidth={2.4}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </article>
        ))}
      </div>

      <div className="split-layout">
        <div className="card">
          <div className="module-header" style={{ marginBottom: 12 }}>
            <div>
              <h4>Stock Trend</h4>
              <p>Seven-day movement in indexed stock availability.</p>
            </div>
            <span className="badge badge--sand">Rolling 7 days</span>
          </div>
          <div className="chart-panel">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={moduleConfig.mockData.stockTrend}>
                <Tooltip
                  contentStyle={{
                    borderRadius: 14,
                    border: '1px solid rgba(122, 92, 62, 0.12)',
                    background: 'rgba(255, 250, 242, 0.96)',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#A67C52"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="detail-panel">
          <h4>Critical Low-Stock Queue</h4>
          <div className="stack" style={{ marginTop: 16 }}>
            {moduleConfig.mockData.criticalAlerts.map((alert) => (
              <div key={alert.sku} className="list-row">
                <div>
                  <strong>{alert.item}</strong>
                  <p>
                    {alert.sku} • {alert.location}
                  </p>
                </div>
                <span className="badge badge--danger">{alert.qty} units</span>
              </div>
            ))}
          </div>
          <div className="stack" style={{ marginTop: 18 }}>
            {moduleConfig.mockData.shipmentBreakdown.map((item) => (
              <div key={item.label}>
                <div className="inline-meta" style={{ justifyContent: 'space-between', marginBottom: 8 }}>
                  <strong>{item.label}</strong>
                  <span>{item.value} orders</span>
                </div>
                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ width: `${(item.value / 8) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="list-row" style={{ marginTop: 18 }}>
            <PackageSearch size={18} />
            <p>Shipment staging accuracy is holding at 98.1% today.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
