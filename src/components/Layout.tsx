import type { ReactNode } from 'react';

export const Layout = ({ children }: { children: ReactNode }) => (
  <div className="layout">
    <header>
      <h1>🛒 My Shop Check24</h1>
    </header>
    <main>{children}</main>
  </div>
);