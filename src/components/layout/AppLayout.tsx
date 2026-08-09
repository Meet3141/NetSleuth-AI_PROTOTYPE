import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { TopHeader } from './TopHeader';

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-navy-950 text-slate-300 font-sans overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64 overflow-hidden">
        <TopHeader />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-navy-950/50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
