import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/common/PageHeader';
import { StatusBadge } from '../components/common/StatusBadge';
import { SeverityBadge } from '../components/common/SeverityBadge';
import { investigationService } from '../services/investigationService';
import { correlationService } from '../services/correlationService';
import { InvestigationCase, TimelineEvent, AttackChainStep } from '../types';
import { AIAssistant } from '../components/investigation/AIAssistant';
import { ArrowLeft, ArrowRight, BookOpen, Clock, Cpu, FileText, Network, Search, Tag, Activity } from 'lucide-react';
import { cn } from '../lib/utils';

export function InvestigationWorkspace() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [invCase, setInvCase] = useState<InvestigationCase | null>(null);
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
  const [attackChain, setAttackChain] = useState<AttackChainStep[]>([]);
  const [noteText, setNoteText] = useState('');

  useEffect(() => {
    if (id) {
      investigationService.getCaseById(id).then(setInvCase);
      correlationService.getTimeline().then(setTimeline);
      correlationService.getAttackChain().then(setAttackChain);
    }
  }, [id]);

  const handleAddNote = () => {
    if (!noteText.trim() || !invCase) return;
    const newNote = {
      id: `n${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      author: 'Analyst',
      content: noteText
    };
    setInvCase({ ...invCase, notes: [...invCase.notes, newNote] });
    setNoteText('');
  };

  if (!invCase) return <div className="p-6 text-slate-400">Loading workspace...</div>;

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] max-w-[1600px] mx-auto pb-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/investigations')} className="text-slate-500 hover:text-cyan-400 transition-colors p-1 bg-navy-900 rounded">
            <ArrowLeft size={16} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-slate-100">{invCase.title}</h1>
            <div className="flex items-center gap-3 text-sm text-slate-400 mt-1">
              <span className="font-mono text-cyan-400">{invCase.id}</span>
              <span>•</span>
              <span>Created: {invCase.created}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-navy-800 hover:bg-navy-700 border border-slate-700 rounded transition-colors">
            Export Case
          </button>
          <button onClick={() => navigate('/evidence')} className="px-3 py-1.5 text-xs font-medium text-cyan-950 bg-cyan-500 hover:bg-cyan-400 rounded transition-colors shadow-[0_0_10px_rgba(6,182,212,0.3)]">
            Manage Evidence
          </button>
        </div>
      </div>

      {/* 3 Column Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-0">
        
        {/* LEFT: Context */}
        <div className="lg:col-span-3 flex flex-col gap-4 overflow-y-auto pr-1 scrollbar-hide">
          <div className="glass-panel p-5 space-y-5">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Status</span>
              <select className="bg-navy-900 border border-slate-700 text-slate-200 text-xs rounded px-2 py-1 outline-none">
                <option>{invCase.status}</option>
                <option>Open</option>
                <option>Evidence Review</option>
                <option>Resolved</option>
                <option>Closed</option>
              </select>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Severity</span>
              <SeverityBadge severity={invCase.severity} />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Investigator</span>
              <span className="text-sm text-slate-200">{invCase.investigator}</span>
            </div>
            <div>
              <span className="text-sm text-slate-400 block mb-2">Tags</span>
              <div className="flex flex-wrap gap-1">
                {invCase.tags.map(t => (
                  <span key={t} className="flex items-center gap-1 text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                    <Tag size={10} /> {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="glass-panel p-5 flex-1 flex flex-col">
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
              <BookOpen size={16} className="text-cyan-500" /> Investigation Notes
            </h3>
            <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-hide mb-4">
              {invCase.notes.map(n => (
                <div key={n.id} className="bg-navy-900/50 p-3 rounded border border-slate-800">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-medium text-cyan-400">{n.author}</span>
                    <span className="text-[10px] font-mono text-slate-500">{n.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-300">{n.content}</p>
                </div>
              ))}
            </div>
            <div className="mt-auto">
              <textarea 
                value={noteText}
                onChange={e => setNoteText(e.target.value)}
                placeholder="Enter investigator notes..." 
                className="w-full bg-navy-900 border border-slate-700 rounded px-3 py-2 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none mb-2"
                rows={3}
              />
              <button onClick={handleAddNote} className="w-full py-1.5 text-xs font-medium text-slate-300 bg-navy-800 hover:bg-navy-700 border border-slate-700 rounded transition-colors">
                Add Note
              </button>
            </div>
          </div>
        </div>

        {/* CENTER: Timeline & Attack Reconstruction */}
        <div className="lg:col-span-6 flex flex-col gap-4 overflow-y-auto pr-1 scrollbar-hide">
          {/* Summary */}
          <div className="glass-panel p-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center divide-x divide-slate-800">
            <div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Primary Host</div>
              <div className="font-mono text-sm text-cyan-400 hover:underline cursor-pointer">{invCase.primaryHost || 'N/A'}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Findings</div>
              <div className="font-bold text-sm text-slate-200">{invCase.relatedFindingsCount}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Time Range</div>
              <div className="font-mono text-xs text-slate-300">{invCase.timeRange}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Risk Level</div>
              <div className="font-bold text-sm text-red-400">{invCase.risk}</div>
            </div>
          </div>

          {/* Assessment (Fact / Inference / Hypothesis) */}
          <div className="glass-panel p-5">
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">Investigation Assessment</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Observed Facts
                </h4>
                <ul className="list-disc pl-5 text-xs text-slate-300 space-y-1">
                  {invCase.assessment.facts.map((f, i) => <li key={i}>{f}</li>)}
                  {invCase.assessment.facts.length === 0 && <li className="text-slate-500 italic">No facts documented.</li>}
                </ul>
              </div>
              <div>
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Inferences
                </h4>
                <ul className="list-disc pl-5 text-xs text-slate-300 space-y-1">
                  {invCase.assessment.inferences.map((inf, i) => <li key={i}>{inf}</li>)}
                  {invCase.assessment.inferences.length === 0 && <li className="text-slate-500 italic">No inferences documented.</li>}
                </ul>
              </div>
              <div>
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span> Hypotheses
                </h4>
                <ul className="list-disc pl-5 text-xs text-slate-300 space-y-1">
                  {invCase.assessment.hypotheses.map((h, i) => <li key={i}>{h}</li>)}
                  {invCase.assessment.hypotheses.length === 0 && <li className="text-slate-500 italic">No hypotheses documented.</li>}
                </ul>
              </div>
            </div>
          </div>

          {/* Attack Chain */}
          <div className="glass-panel p-5 overflow-hidden">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Network size={16} className="text-cyan-500" /> Reconstructed Activity Sequence
              </h3>
              <span className="text-[9px] bg-slate-800 text-slate-400 border border-slate-700 px-1.5 py-0.5 rounded font-bold tracking-widest uppercase">
                Demo Attack Reconstruction
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-3">
              {attackChain.map((step, idx) => (
                <div key={step.id} className="flex items-center">
                  <button className="text-[10px] font-bold tracking-wider px-2 py-1.5 rounded bg-navy-900 hover:bg-cyan-900/30 text-slate-300 border border-slate-700 hover:border-cyan-500/50 hover:text-cyan-300 transition-colors cursor-pointer text-left">
                    {step.label}
                  </button>
                  {idx < attackChain.length - 1 && <ArrowRight size={14} className="text-slate-600 mx-1" />}
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="glass-panel p-5 flex-1">
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Clock size={16} className="text-cyan-500" /> Event Timeline
            </h3>
            <div className="relative border-l border-slate-700 ml-3 space-y-6 pb-2">
              {timeline.map((event, idx) => (
                <div key={event.id} className="relative pl-6 group">
                  <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-navy-950 border-2 border-cyan-500 group-hover:bg-cyan-400 transition-colors"></div>
                  <div className="flex items-start gap-4">
                    <div className="font-mono text-xs text-cyan-400 mt-0.5 w-16">{event.time}</div>
                    <div className="bg-navy-900/50 border border-slate-800 rounded p-3 flex-1 group-hover:border-cyan-900 transition-colors cursor-pointer">
                      <div className="text-xs font-medium text-slate-200 mb-1">{event.description}</div>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-[10px] uppercase text-slate-500 font-semibold">{event.type}</span>
                        <button className="text-[10px] text-slate-400 hover:text-cyan-400 flex items-center gap-1 ml-auto">
                          <Search size={10} /> View Source
                        </button>
                        <button className="text-[10px] text-slate-400 hover:text-cyan-400 flex items-center gap-1">
                          <FileText size={10} /> Add to Evidence
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Related Entities Simplified */}
          <div className="glass-panel p-5">
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Activity size={16} className="text-cyan-500" /> Correlated Entities
            </h3>
            <div className="grid grid-cols-2 gap-4">
               <div className="bg-navy-900/50 p-4 rounded border border-slate-800 text-center hover:border-cyan-800 cursor-pointer transition-colors">
                  <div className="text-2xl font-bold text-slate-200">{invCase.relatedSessionsCount}</div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">Sessions</div>
               </div>
               <div className="bg-navy-900/50 p-4 rounded border border-slate-800 text-center hover:border-cyan-800 cursor-pointer transition-colors">
                  <div className="text-2xl font-bold text-slate-200">{invCase.relatedArtifactsCount}</div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">Artifacts</div>
               </div>
            </div>
            <div className="mt-4 text-center">
              <button className="text-xs text-cyan-500 hover:text-cyan-400 hover:underline">
                Explore pivoting graphs in Correlation Engine →
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT: AI Assistant */}
        <div className="lg:col-span-3 min-h-0 h-full">
          <AIAssistant />
        </div>
      </div>
    </div>
  );
}
