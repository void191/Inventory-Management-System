import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { Navigate, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import eventBus from '../core/eventBus';
import { modules } from '../modules';

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();

  const currentModule = useMemo(
    () => modules.find((module) => module.route === location.pathname) ?? modules[0],
    [location.pathname],
  );

  useEffect(() => {
    eventBus.emit('navigation:changed', {
      route: location.pathname,
      moduleName: currentModule.name,
    });
  }, [currentModule.name, location.pathname]);

  return (
    <div className="app-shell">
      <aside className={`sidebar ${sidebarCollapsed ? 'is-collapsed' : ''}`}>
        <div className="sidebar__brand">
          <div className="sidebar__brand-mark" aria-hidden="true">
            <svg viewBox="0 0 68 56" className="brand-logo" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="14" width="26" height="26" rx="8" transform="rotate(-10 10 14)" fill="#A67C52" />
              <rect x="28" y="12" width="26" height="26" rx="8" transform="rotate(10 28 12)" fill="#D6C3A3" />
            </svg>
          </div>
          <div className="sidebar__brand-text">
            <h1>Grainhouse</h1>
          </div>
        </div>

        <button
          type="button"
          className={`sidebar__toggle ${sidebarCollapsed ? 'is-collapsed' : ''}`}
          onClick={() => setSidebarCollapsed((value) => !value)}
          aria-label="Toggle navigation"
        >
          <ChevronLeft size={18} />
        </button>

        <nav className="sidebar__nav">
          {modules.map((module) => {
            const Icon = module.icon;

            return (
              <NavLink
                key={module.route}
                to={module.route}
                className={({ isActive }) => `sidebar__item ${isActive ? 'is-active' : ''}`}
              >
                <Icon size={20} />
                <span className="sidebar__label">{module.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>

      <div className="content-shell">
        <main key={location.pathname} className="page-frame route-fade">
          <Routes>
            <Route path="/" element={<Navigate to={modules[0].route} replace />} />
            {modules.map((module) => {
              const ModuleComponent = lazy(module.loadComponent);

              return (
                <Route
                  key={module.route}
                  path={module.route}
                  element={
                    <Suspense fallback={<div className="loading-state">Loading module...</div>}>
                      <ModuleComponent eventBus={eventBus} moduleConfig={module} />
                    </Suspense>
                  }
                />
              );
            })}
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
