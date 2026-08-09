import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { Dashboard } from './pages/Dashboard';
import { PcapInput } from './pages/PcapInput';
import { PacketIntelligence } from './pages/PacketIntelligence';
import { Detections } from './pages/Detections';
import { FindingDetail } from './pages/FindingDetail';
import { Alerts } from './pages/Alerts';
import { ThreatIntelligence } from './pages/ThreatIntelligence';
import { Correlation } from './pages/Correlation';
import { Investigations } from './pages/Investigations';
import { InvestigationWorkspace } from './pages/InvestigationWorkspace';
import { Evidence } from './pages/Evidence';
import { Mitre } from './pages/Mitre';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';
import { PlaceholderPage } from './pages/PlaceholderPage';
import { Landing } from './pages/Landing';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Landing Page */}
        <Route path="/" element={<Landing />} />
        
        {/* App Workspace Wrapped in Layout */}
        <Route path="/*" element={
          <AppLayout>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              
              {/* Traffic & Intelligence */}
              <Route path="/traffic" element={<PlaceholderPage title="Traffic" />} />
              <Route path="/input" element={<PcapInput />} />
              <Route path="/packet-intelligence" element={<PacketIntelligence />} />
              
              {/* Detection */}
              <Route path="/detections" element={<Detections />} />
              <Route path="/detections/:id" element={<FindingDetail />} />
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/threat-intelligence" element={<ThreatIntelligence />} />
              <Route path="/correlation" element={<Correlation />} />
              
              {/* Investigation */}
              <Route path="/investigations" element={<Investigations />} />
              <Route path="/investigations/:id" element={<InvestigationWorkspace />} />
              <Route path="/evidence" element={<Evidence />} />
              <Route path="/mitre" element={<Mitre />} />
              <Route path="/reports" element={<Reports />} />
              
              {/* System */}
              <Route path="/settings" element={<Settings />} />
              
              {/* Fallback */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </AppLayout>
        } />
      </Routes>
    </Router>
  );
}

export default App;
