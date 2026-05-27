import { useState } from 'react';
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { moduleConfig } from './moduleConfig';

function Reports() {
  const [activeTab, setActiveTab] = useState(moduleConfig.mockData.reportTabs[0].key);

  const current = moduleConfig.mockData.reportTabs.find((tab) => tab.key === activeTab);

  return (
    <section className="module-page">
      <div className="module-header">
        <div className="module-header__title">
          <div className="module-header__title-icon">
            <moduleConfig.icon size={20} />
          </div>
          <div>
            <p className="eyebrow">Analytics</p>
            <h3>Inventory reporting across valuation and forecast views</h3>
          </div>
        </div>
      </div>

      <div className="tab-strip">
        {moduleConfig.mockData.reportTabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={`tab-button ${tab.key === activeTab ? 'is-active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="summary-row">
        <div className="summary-stat">
          <p>{current.metricLabel}</p>
          <h4 style={{ fontSize: '1.8rem', margin: '8px 0 0' }}>{current.metricValue}</h4>
        </div>
        {current.summary.map((item) => (
          <div key={item.label} className="summary-stat">
            <p>{item.label}</p>
            <h4 style={{ margin: '8px 0 0' }}>{item.value}</h4>
          </div>
        ))}
      </div>

      <div className="chart-panel">
        <ResponsiveContainer width="100%" height="100%">
          {current.chartType === 'bar' ? (
            <BarChart data={current.data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(122, 92, 62, 0.15)" />
              <XAxis dataKey="name" stroke="#7A5C3E" />
              <YAxis stroke="#7A5C3E" />
              <Tooltip
                contentStyle={{
                  borderRadius: 14,
                  border: '1px solid rgba(122, 92, 62, 0.12)',
                  background: 'rgba(255, 250, 242, 0.96)',
                }}
              />
              <Bar dataKey="value" fill="#A67C52" radius={[8, 8, 0, 0]} />
            </BarChart>
          ) : (
            <LineChart data={current.data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(122, 92, 62, 0.15)" />
              <XAxis dataKey="name" stroke="#7A5C3E" />
              <YAxis stroke="#7A5C3E" />
              <Tooltip
                contentStyle={{
                  borderRadius: 14,
                  border: '1px solid rgba(122, 92, 62, 0.12)',
                  background: 'rgba(255, 250, 242, 0.96)',
                }}
              />
              <Line type="monotone" dataKey="value" stroke="#A67C52" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default Reports;
