import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { Dashboard } from './pages/Dashboard';
import { PcapInput } from './pages/PcapInput';
import { PacketIntelligence } from './pages/PacketIntelligence';
import { PlaceholderPage } from './pages/PlaceholderPage';

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Traffic & Intelligence */}
          <Route path="/traffic" element={<PlaceholderPage title="Traffic" />} />
          <Route path="/input" element={<PcapInput />} />
          <Route path="/packet-intelligence" element={<PacketIntelligence />} />
          
          {/* Detection */}
          <Route path="/detections" element={<PlaceholderPage title="Detections" />} />
          <Route path="/detections/:id" element={<PlaceholderPage title="Detection Details" />} />
          <Route path="/correlation" element={<PlaceholderPage title="Correlation" />} />
          
          {/* Investigation */}
          <Route path="/investigations" element={<PlaceholderPage title="Investigations" />} />
          <Route path="/investigations/:id" element={<PlaceholderPage title="Investigation Details" />} />
          <Route path="/evidence" element={<PlaceholderPage title="Evidence" />} />
          <Route path="/mitre" element={<PlaceholderPage title="MITRE ATT&CK" />} />
          <Route path="/reports" element={<PlaceholderPage title="Reports" />} />
          
          {/* System */}
          <Route path="/settings" element={<PlaceholderPage title="Settings" />} />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
