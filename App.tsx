import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Hub } from './pages/Hub';
import { FarmCalc } from './pages/FarmCalc';
import { WhalePlanner } from './pages/WhalePlanner';
import { EfficiencyCalc } from './pages/EfficiencyCalc';
import { BurnPlanner } from './pages/BurnPlanner';
import { EventPass } from './pages/EventPass';
import { Ranking } from './pages/Ranking';
import { RoomOrganizer } from './pages/RoomOrganizer';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Hub />} />
          <Route path="/farm" element={<FarmCalc />} />
          <Route path="/whale" element={<WhalePlanner />} />
          <Route path="/efficiency" element={<EfficiencyCalc />} />
          <Route path="/burn" element={<BurnPlanner />} />
          <Route path="/event" element={<EventPass />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/organizer" element={<RoomOrganizer />} />
          <Route path="/room-organizer" element={<RoomOrganizer />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;