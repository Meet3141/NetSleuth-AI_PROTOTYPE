import { UploadCloud } from 'lucide-react';
import { cn } from '../../lib/utils';

interface FileUploaderProps {
  onFileSelect: (file: File | null) => void;
  disabled?: boolean;
}

export function FileUploader({ onFileSelect, disabled = false }: FileUploaderProps) {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (disabled) return;
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div 
      className={cn(
        "border-2 border-dashed rounded-lg p-12 flex flex-col items-center justify-center transition-colors",
        disabled 
          ? "border-slate-800 bg-navy-900/20 opacity-50 cursor-not-allowed" 
          : "border-slate-700 hover:border-cyan-500/50 hover:bg-navy-900/50 cursor-pointer bg-navy-900/30"
      )}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={() => !disabled && document.getElementById('file-upload')?.click()}
    >
      <input 
        id="file-upload" 
        type="file" 
        className="hidden" 
        accept=".pcap,.pcapng" 
        onChange={handleChange}
        disabled={disabled}
      />
      <div className="w-16 h-16 rounded-full bg-cyan-950/50 flex items-center justify-center mb-4 border border-cyan-900">
        <UploadCloud className="w-8 h-8 text-cyan-500" />
      </div>
      <h3 className="text-lg font-medium text-slate-200 mb-2">Select PCAP or PCAPNG File</h3>
      <p className="text-slate-400 text-sm text-center max-w-sm">
        Drag and drop your network capture file here, or click to browse your computer.
      </p>
      <div className="mt-6 flex gap-4 text-xs font-mono text-slate-500">
        <span>MAX: 500MB</span>
        <span>FORMATS: .pcap, .pcapng</span>
      </div>
    </div>
  );
}
