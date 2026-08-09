import { useState } from 'react';
import { Bot, Send, Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';

export function AIAssistant() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Investigation assistant ready. I can help analyze this case based on the available mock data.' }
  ]);

  const cannedQuestions = [
    "Why was this host flagged?",
    "Show activity after the initial suspicious event.",
    "What evidence supports the exfiltration finding?",
    "Summarize this investigation.",
    "What sessions are related to this domain?",
    "Explain the reconstructed activity sequence."
  ];

  const handleAsk = (q: string) => {
    setMessages(prev => [...prev, { role: 'user', content: q }]);
    
    // Deterministic mock responses
    setTimeout(() => {
      let response = "I don't have enough simulated data to answer that specific question.";
      let sources: string[] = [];

      if (q.includes("evidence supports the exfiltration finding")) {
        response = "The finding is associated with a large outbound transfer from 10.0.2.15 to 203.0.113.25 at 10:10:34. The activity is linked to SESSION-031 and related artifact ART-001 (extracted payload).";
        sources = ['SESSION-031', 'FLOW-001', 'ART-001', 'DET-001'];
      } else if (q.includes("Summarize")) {
        response = "Host 10.0.2.15 exhibited unusual behavior starting with anomalous DNS queries, followed by a suspicious payload download. This escalated into periodic external communication and culminated in a large outbound data transfer, which triggered an exfiltration alert.";
        sources = ['CASE-2026-0017', 'Timeline Engine'];
      } else if (q.includes("activity after the initial")) {
        response = "After the initial DNS query to suspicious-demo.example at 09:01:12, the host made an HTTP request at 09:03:18, followed by a file transfer at 09:05:41.";
        sources = ['Timeline Events: t1, t2, t3'];
      } else if (q.includes("Why was this host flagged")) {
        response = "Host 10.0.2.15 was flagged because it deviated significantly from its 30-day behavioral baseline, specifically in outbound data volume and connection periodicity to unknown external IPs.";
        sources = ['Behavioral Model', 'Statistical Analysis'];
      }

      setMessages(prev => [...prev, { role: 'assistant', content: response, sources }]);
    }, 600);
  };

  return (
    <div className="flex flex-col h-full glass-panel overflow-hidden border-purple-500/20">
      <div className="p-3 border-b border-slate-800 bg-navy-900/50 flex justify-between items-center">
        <div className="flex items-center gap-2 text-purple-400">
          <Bot size={16} />
          <h3 className="text-sm font-bold tracking-wider uppercase">AI Assistant</h3>
        </div>
        <span className="text-[9px] bg-purple-900/30 text-purple-400 border border-purple-800 px-1.5 py-0.5 rounded font-bold tracking-widest uppercase">
          Prototype
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide bg-navy-950/30">
        <div className="text-[10px] text-slate-500 text-center uppercase tracking-widest mb-4 border-b border-slate-800 pb-2">
          Responses are generated from available investigation data.
        </div>
        
        {messages.map((m, i) => (
          <div key={i} className={cn("flex flex-col", m.role === 'user' ? "items-end" : "items-start")}>
            <div className={cn(
              "max-w-[85%] p-3 rounded text-sm leading-relaxed",
              m.role === 'user' 
                ? "bg-cyan-900/30 border border-cyan-800 text-cyan-100 rounded-tr-none" 
                : "bg-navy-800 border border-slate-700 text-slate-300 rounded-tl-none"
            )}>
              {m.role === 'assistant' && i > 0 && <Sparkles size={14} className="text-purple-400 mb-2 inline-block mr-2" />}
              {m.content}
            </div>
            {m.role === 'assistant' && (m as any).sources && (
              <div className="mt-1 flex flex-wrap gap-1 max-w-[85%]">
                <span className="text-[10px] text-slate-500 mr-1 mt-0.5">Sources:</span>
                {(m as any).sources.map((s: string) => (
                  <span key={s} className="text-[9px] font-mono text-cyan-500 bg-cyan-950/30 px-1 rounded border border-cyan-900">{s}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-slate-800 bg-navy-900/30">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {cannedQuestions.map(q => (
            <button 
              key={q} 
              onClick={() => handleAsk(q)}
              className="text-[10px] text-left bg-navy-800 hover:bg-purple-900/30 hover:border-purple-800/50 hover:text-purple-300 border border-slate-700 text-slate-400 rounded px-2 py-1 transition-colors leading-tight"
            >
              {q}
            </button>
          ))}
        </div>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Ask a question about this case..." 
            className="w-full bg-navy-950 border border-slate-700 rounded-full pl-4 pr-10 py-2 text-xs text-slate-200 focus:border-purple-500 focus:outline-none transition-colors"
            readOnly
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-purple-400 p-1">
            <Send size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
