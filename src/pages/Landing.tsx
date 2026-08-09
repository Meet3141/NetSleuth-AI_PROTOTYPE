import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, Activity, Share2, Search, Cpu, Database, 
  Network, Bell, CheckCircle2, ChevronRight, FileText, ArrowRight, Bot, Target, Clock
} from 'lucide-react';
import { cn } from '../lib/utils';
import { ForensicPipeline } from '../components/landing/ForensicPipeline';

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      setIsVisible(entries[0].isIntersecting);
    }, { threshold: 0.15 });
    
    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, []);

  return (
    <div
      ref={domRef}
      className={cn(
        "transition-all duration-[800ms]",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
        className
      )}
      style={{ 
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)", // Premium springy ease
        transitionDelay: isVisible ? `${delay}ms` : '0ms'
      }}
    >
      {children}
    </div>
  );
}

export function Landing() {
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-navy-950 text-slate-200 selection:bg-cyan-900/50 selection:text-cyan-100 font-sans overflow-x-hidden">
      
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-navy-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)]">
              <Shield size={18} className="text-navy-950" />
            </div>
            <span className="font-bold text-lg tracking-wider text-slate-100 uppercase">NetSleuth AI</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('workflow')} className="text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors uppercase tracking-widest">Platform</button>
            <button onClick={() => scrollToSection('how-it-works')} className="text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors uppercase tracking-widest">How It Works</button>
            <button onClick={() => scrollToSection('capabilities')} className="text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors uppercase tracking-widest">Capabilities</button>
          </div>
          
          <button 
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-xs font-bold text-cyan-950 bg-cyan-500 hover:bg-cyan-400 px-5 py-2.5 rounded transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] uppercase tracking-wider"
          >
            Launch Investigation <ArrowRight size={14} />
          </button>
        </div>
      </nav>

      {/* ===================== HERO SECTION ===================== */}
      <section id="workflow" className="relative py-16 lg:py-24 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-cyan-600/8 rounded-full blur-[120px] pointer-events-none z-0"></div>
        
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start relative z-10">
          
          {/* Left Column: Hero Content */}
          <div className="flex flex-col justify-center space-y-8 pt-4 lg:pt-12">
            <div className="inline-block border border-cyan-900/50 bg-cyan-950/30 px-3 py-1 rounded text-cyan-400 text-xs font-bold uppercase tracking-widest w-max">
              AI-Powered Network & Packet Forensics
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] text-slate-100 tracking-tight">
              From Network Traffic <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">to Forensic Intelligence.</span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed max-w-xl">
              NetSleuth AI transforms captured network traffic into correlated findings, reconstructed activity, investigation context, and traceable forensic evidence.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button 
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2 text-sm font-bold text-cyan-950 bg-cyan-500 hover:bg-cyan-400 px-8 py-4 rounded transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] uppercase tracking-wider"
              >
                Launch Investigation <ArrowRight size={16} />
              </button>
              <button 
                onClick={() => scrollToSection('how-it-works')}
                className="flex items-center gap-2 text-sm font-bold text-slate-300 bg-navy-900 hover:bg-navy-800 border border-slate-700 hover:border-cyan-500/50 px-8 py-4 rounded transition-all uppercase tracking-wider"
              >
                Explore Platform
              </button>
            </div>
          </div>
          
          {/* Right Column: Pipeline */}
          <div className="w-full">
            <ForensicPipeline />
          </div>

        </div>
      </section>

      {/* ===================== CAPABILITY STRIP ===================== */}
      <section className="border-y border-slate-800 bg-navy-900/30">
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-800">
          {[
            { title: 'CAPTURE', desc: 'Acquire and process network traffic and PCAP evidence.' },
            { title: 'ANALYZE', desc: 'Combine signature, behavioral, statistical, threat-intelligence and AI-assisted analysis.' },
            { title: 'CORRELATE', desc: 'Connect findings, hosts, sessions, domains and artifacts.' },
            { title: 'INVESTIGATE', desc: 'Reconstruct activity, preserve evidence and generate reports.' }
          ].map((item, i) => (
            <FadeIn key={i} delay={i * 100} className="p-8 text-center group hover:bg-navy-800/30 transition-colors">
              <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-widest mb-3 group-hover:text-cyan-300">{item.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ===================== HOW IT WORKS ===================== */}
      <section id="how-it-works" className="py-20 lg:py-24 relative">
        <div className="max-w-[1400px] mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-100 mb-4">One Investigation Workflow</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">From raw packets to a fully verified forensic report, all within a single unified platform.</p>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'CAPTURE', desc: 'Ingest PCAP/PCAPNG files or live traffic. Parse layers natively and reconstruct streams automatically.' },
              { step: '02', title: 'PACKET INTELLIGENCE', desc: 'Extract structured protocol metadata (HTTP, DNS, TLS) and carve file artifacts from network flows.' },
              { step: '03', title: 'DETECTION', desc: 'Identify suspicious behavior using multiple analytical signals, threat feeds, and baseline deviations.' },
              { step: '04', title: 'CORRELATION', desc: 'Connect events across hosts, sessions, domains and artifacts to reveal hidden attack patterns.' },
              { step: '05', title: 'INVESTIGATION', desc: 'Reconstruct timelines and understand relationships between events using a dedicated workspace.' },
              { step: '06', title: 'EVIDENCE & REPORT', desc: 'Select, verify and trace supporting evidence. Generate structured, shareable forensic reports.' }
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 100} className="glass-panel p-8 border-slate-800 hover:border-cyan-900/50 transition-colors group relative overflow-hidden rounded-2xl">
                <div className="absolute top-0 right-0 p-4 text-6xl font-black text-slate-800/20 group-hover:text-cyan-900/10 transition-colors pointer-events-none">{item.step}</div>
                <h3 className="text-sm font-bold text-slate-200 uppercase tracking-widest mb-3 mt-4 relative z-10">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed relative z-10">{item.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== CORE DIFFERENTIATOR ===================== */}
      <section className="py-20 lg:py-24 bg-gradient-to-b from-navy-950 to-navy-900 border-y border-slate-800 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <FadeIn>
              <h2 className="text-3xl lg:text-5xl font-bold text-slate-100 mb-6 leading-tight">Detection is only the beginning.</h2>
              <p className="text-lg text-slate-400 leading-relaxed mb-8">
                Traditional network analysis can reveal suspicious activity. NetSleuth AI extends that workflow into investigation—connecting findings to sessions, artifacts, timelines and evidence.
              </p>
              <button 
                onClick={() => scrollToSection('capabilities')}
                className="flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 uppercase tracking-widest"
              >
                View Platform Capabilities <ChevronRight size={16} />
              </button>
            </FadeIn>
            
            <FadeIn delay={200} className="glass-panel p-8 border-slate-800 flex items-center justify-between text-center max-w-2xl mx-auto w-full rounded-3xl">
              {[
                { label: 'DETECT', icon: Target },
                { label: 'CORRELATE', icon: Share2 },
                { label: 'RECONSTRUCT', icon: Clock },
                { label: 'PRESERVE', icon: Database }
              ].map((step, i) => (
                <div key={i} className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-navy-950 border border-slate-700 flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                    <step.icon size={20} className="text-cyan-500" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{step.label}</span>
                </div>
              ))}
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ===================== PLATFORM CAPABILITIES ===================== */}
      <section id="capabilities" className="py-20 lg:py-24 relative">
        <div className="max-w-[1400px] mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-100 mb-4">Platform Capabilities</h2>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Network, title: 'Packet Intelligence', desc: 'Extract structured protocol metadata natively.' },
              { icon: Cpu, title: 'AI-Assisted Analysis', desc: 'Augment investigations with intelligent context.' },
              { icon: Shield, title: 'Threat Intelligence', desc: 'Enrich indicators with external reputation data.' },
              { icon: Bell, title: 'Real-Time Alerting', desc: 'Consolidate and prioritize detection findings.' },
              { icon: Share2, title: 'Correlation Graph', desc: 'Visualize complex entity relationships.' },
              { icon: Search, title: 'Investigation Workspace', desc: 'Reconstruct timelines and build cases.' },
              { icon: Target, title: 'MITRE ATT&CK', desc: 'Map findings to standard threat frameworks.' },
              { icon: Database, title: 'Evidence Management', desc: 'Select, hash, and package digital evidence.' },
              { icon: FileText, title: 'Forensic Reporting', desc: 'Generate structured, professional case reports.' }
            ].map((cap, i) => (
              <FadeIn key={i} delay={i * 50} className="bg-navy-900/30 border border-slate-800 p-6 rounded-2xl flex gap-4 hover:bg-navy-800/30 hover:border-slate-700 transition-colors">
                <div className="shrink-0 mt-1"><cap.icon size={20} className="text-cyan-500" /></div>
                <div>
                  <h4 className="text-sm font-bold text-slate-200 uppercase tracking-widest mb-1">{cap.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{cap.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== INTERACTIVE PREVIEW & AI ===================== */}
      <section className="py-20 lg:py-24 bg-navy-950 border-t border-slate-800">
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Investigation Preview */}
          <FadeIn className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-100 mb-4">Investigation Preview</h2>
              <p className="text-sm text-slate-400 leading-relaxed">Experience a fully reconstructed investigation case showing correlated network data and forensic findings.</p>
            </div>
            
            <div className="glass-panel p-6 border-slate-700 hover:border-cyan-800 transition-colors cursor-default relative overflow-hidden group rounded-3xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-bl-full pointer-events-none group-hover:bg-cyan-500/10 transition-colors"></div>
              
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="text-[10px] text-cyan-500 font-mono mb-1">CASE-2026-0017</div>
                  <h3 className="text-lg font-bold text-slate-200">Potential Data Exfiltration</h3>
                </div>
                <span className="text-[10px] bg-red-950/50 text-red-400 border border-red-900 px-2 py-1 rounded font-bold uppercase tracking-widest">High Risk</span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-navy-950 p-3 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Host</div>
                  <div className="font-mono text-xs text-slate-300">10.0.2.15</div>
                </div>
                <div className="bg-navy-950 p-3 rounded-xl border border-slate-800 text-center">
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Findings</div>
                  <div className="font-bold text-sm text-slate-200">6</div>
                </div>
                <div className="bg-navy-950 p-3 rounded-xl border border-slate-800 text-center">
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Sessions</div>
                  <div className="font-bold text-sm text-slate-200">14</div>
                </div>
                <div className="bg-navy-950 p-3 rounded-xl border border-slate-800 text-center">
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Evidence</div>
                  <div className="font-bold text-sm text-slate-200">12</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between border-t border-slate-800 pt-4">
                <div className="text-xs font-mono text-slate-500 flex items-center gap-2"><Clock size={12}/> 09:01 → 10:12</div>
                <button 
                  onClick={() => navigate('/investigations/CASE-2026-0017')}
                  className="text-xs font-bold text-cyan-400 hover:text-cyan-300 uppercase tracking-widest flex items-center gap-1"
                >
                  Open Investigation <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </FadeIn>
          
          {/* AI Section */}
          <FadeIn delay={200} className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-100 mb-4">AI-Assisted Investigation</h2>
              <p className="text-sm text-slate-400 leading-relaxed">Query your evidence directly. The AI assistant contextualizes network activity and helps accelerate analysis.</p>
            </div>
            
            <div className="glass-panel flex flex-col overflow-hidden border-purple-500/20 rounded-3xl">
              <div className="p-3 border-b border-slate-800 bg-navy-900/50 flex justify-between items-center">
                <div className="flex items-center gap-2 text-purple-400">
                  <Bot size={16} />
                  <h3 className="text-[10px] font-bold tracking-wider uppercase">Prototype AI Assistant</h3>
                </div>
              </div>
              
              <div className="p-6 space-y-6 bg-navy-950/50">
                <div className="flex flex-col items-end">
                  <span className="text-[10px] text-slate-500 mb-1 mr-1 uppercase tracking-widest">Investigator</span>
                  <div className="bg-cyan-900/30 border border-cyan-800 text-cyan-100 p-3 rounded rounded-tr-none text-sm max-w-[85%]">
                    Why was this host flagged?
                  </div>
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-[10px] text-purple-400 mb-1 ml-1 uppercase tracking-widest">NetSleuth AI</span>
                  <div className="bg-navy-800 border border-slate-700 text-slate-300 p-3 rounded rounded-tl-none text-sm max-w-[85%] leading-relaxed">
                    The observed activity includes unusual outbound communication associated with the host and a correlated large outbound transfer. Related sessions and artifacts provide supporting context.
                  </div>
                </div>
              </div>
              
              <div className="p-3 border-t border-slate-800 bg-navy-900/30 text-center">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest flex items-center justify-center gap-2">
                  <CheckCircle2 size={12} className="text-green-500" /> Grounded in available investigation data.
                </span>
              </div>
            </div>
          </FadeIn>
          
        </div>
      </section>

      {/* ===================== FINAL CTA ===================== */}
      <section className="py-20 lg:py-24 border-t border-slate-800 bg-gradient-to-t from-navy-900 to-navy-950">
        <FadeIn className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-100 mb-6 tracking-tight">Turn Network Traffic <br className="hidden sm:block"/>Into Investigable Evidence.</h2>
          <p className="text-lg text-slate-400 mb-10">Explore the NetSleuth AI forensic workflow.</p>
          <button 
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center gap-2 text-sm font-bold text-cyan-950 bg-cyan-500 hover:bg-cyan-400 px-8 py-4 rounded transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] uppercase tracking-wider"
          >
            Launch Investigation <ArrowRight size={16} />
          </button>
        </FadeIn>
      </section>

    </div>
  );
}
