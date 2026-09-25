import { Outlet } from 'react-router-dom';

import Header from './Header';
import Sidebar from './Sidebar';

function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <div className="mx-auto flex max-w-7xl">
        <Sidebar />
        <main className="min-w-0 flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
export default AppLayout;
