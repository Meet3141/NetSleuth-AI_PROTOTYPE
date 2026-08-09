import { PageHeader } from '../components/common/PageHeader';
import { Hammer } from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
}

export function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <div className="h-full flex flex-col">
      <PageHeader title={title} subtitle="Under Construction" />
      
      <div className="flex-1 flex flex-col items-center justify-center glass-panel mt-4 opacity-70">
        <div className="w-16 h-16 rounded-full bg-cyan-900/30 flex items-center justify-center mb-4 border border-cyan-500/20">
          <Hammer className="text-cyan-400 w-8 h-8" />
        </div>
        <h2 className="text-xl font-medium text-slate-200 mb-2">{title}</h2>
        <p className="text-slate-400 max-w-md text-center">
          Module will be implemented in the next prototype step. The current step focuses on the Application Shell and Dashboard.
        </p>
      </div>
    </div>
  );
}
