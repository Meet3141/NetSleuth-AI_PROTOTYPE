import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/common/PageHeader';
import { FileUploader } from '../components/common/FileUploader';
import { ProcessingTerminal } from '../components/common/ProcessingTerminal';
import { WorkflowSteps } from '../components/common/WorkflowSteps';
import { pcapService } from '../services/pcapService';
import { ProcessingStep, PcapFileInfo } from '../types';
import { FileSearch, Play } from 'lucide-react';
import { cn } from '../lib/utils';

export function PcapInput() {
  const navigate = useNavigate();
  const [fileInfo, setFileInfo] = useState<PcapFileInfo | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [steps, setSteps] = useState<ProcessingStep[]>([]);
  
  // Initialize steps
  useEffect(() => {
    setSteps(pcapService.getInitialSteps());
  }, []);

  const handleFileSelect = (selectedFile: File | null) => {
    if (!selectedFile) return;
    
    // Simulate parsing file info
    setFileInfo({
      name: selectedFile.name,
      size: (selectedFile.size / (1024 * 1024)).toFixed(2) + ' MB',
      type: selectedFile.name.endsWith('.pcapng') ? 'PCAPNG' : 'PCAP',
      packets: Math.floor(Math.random() * 50000) + 10000,
      duration: '00:15:32'
    });
  };

  const startAnalysis = async () => {
    setIsProcessing(true);
    
    // Simulate the pipeline processing progressively
    const pipelineSteps = [...steps];
    
    for (let i = 0; i < pipelineSteps.length; i++) {
      // Mark as active
      pipelineSteps[i].status = 'active';
      setSteps([...pipelineSteps]);
      
      // Artificial delay for visual effect
      await new Promise(r => setTimeout(r, 800 + Math.random() * 1000));
      
      // Mark as completed with simulated logs
      pipelineSteps[i].status = 'completed';
      pipelineSteps[i].log = `Processed ${Math.floor(Math.random() * 5000) + 1000} artifacts in ${Math.floor(Math.random() * 200)}ms`;
      setSteps([...pipelineSteps]);
    }

    // Processing complete, navigate to results
    setTimeout(() => {
      navigate('/packet-intelligence');
    }, 1500);
  };

  return (
    <div className="space-y-6 pb-6 max-w-5xl mx-auto h-[calc(100vh-6rem)] flex flex-col">
      <PageHeader 
        title="PCAP & Evidence Input" 
        subtitle="Upload capture files for automated forensic analysis and intelligence extraction."
      />

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 min-h-0">
        <div className="flex flex-col gap-6">
          <FileUploader onFileSelect={handleFileSelect} disabled={isProcessing} />
          
          {fileInfo && (
            <div className="glass-panel p-6 animate-in fade-in slide-in-from-bottom-4">
              <div className="flex items-center gap-3 mb-4">
                <FileSearch className="text-cyan-500" />
                <h3 className="text-lg font-medium text-slate-200">File Information</h3>
              </div>
              
              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-500">Filename</span>
                  <span className="text-slate-300 font-mono">{fileInfo.name}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-500">Size</span>
                  <span className="text-slate-300">{fileInfo.size}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-500">Format</span>
                  <span className="text-cyan-400 font-medium">{fileInfo.type}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-500">Est. Packets</span>
                  <span className="text-slate-300">~{fileInfo.packets.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={startAnalysis}
                disabled={isProcessing}
                className={cn(
                  "w-full py-3 rounded font-medium flex items-center justify-center gap-2 transition-all",
                  isProcessing 
                    ? "bg-navy-800 text-slate-500 cursor-not-allowed" 
                    : "bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                )}
              >
                {isProcessing ? 'Processing...' : 'Start Analysis'}
                {!isProcessing && <Play size={16} />}
              </button>
            </div>
          )}
        </div>

        <div className="h-full">
          <ProcessingTerminal steps={steps} />
        </div>
      </div>
      
      <div className="mt-auto pt-4 flex justify-center">
        <WorkflowSteps />
      </div>
    </div>
  );
}
