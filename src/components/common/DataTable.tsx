import { ReactNode } from 'react';
import { cn } from '../../lib/utils';

export interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (value: any, item: T) => ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T) => string;
  className?: string;
  emptyMessage?: string;
}

export function DataTable<T>({ data, columns, keyExtractor, className, emptyMessage = "No data available" }: DataTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="p-8 text-center text-slate-500 glass-panel">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={cn("glass-panel overflow-x-auto", className)}>
      <table className="w-full text-left text-sm whitespace-nowrap">
        <thead className="bg-navy-900/80 text-slate-400 text-xs uppercase tracking-wider sticky top-0 z-10 border-b border-slate-700">
          <tr>
            {columns.map((col, idx) => (
              <th key={String(col.key) + idx} className={cn("px-4 py-3 font-medium", col.className)}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/50">
          {data.map((item) => (
            <tr key={keyExtractor(item)} className="hover:bg-slate-800/40 transition-colors">
              {columns.map((col, idx) => {
                // Check if key exists in item, otherwise pass undefined
                const rawValue = (col.key in (item as any)) ? (item as any)[col.key] : undefined;
                
                return (
                  <td key={String(col.key) + idx} className={cn("px-4 py-2.5", col.className)}>
                    {col.render ? col.render(rawValue, item) : String(rawValue)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
