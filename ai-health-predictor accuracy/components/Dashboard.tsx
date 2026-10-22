
import React, { useState } from 'react';
import { Disease } from '../types';
import HeartDisease from './HeartDisease';
import LiverDisease from './LiverDisease';
import Diabetes from './Diabetes';
import History from './History';
import DiseaseInfo from './DiseaseInfo';
import Button from './common/Button';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [activeDisease, setActiveDisease] = useState<Disease>(Disease.INFO);

  const renderActiveComponent = () => {
    switch (activeDisease) {
      case Disease.INFO:
        return <DiseaseInfo />;
      case Disease.HEART:
        return <HeartDisease />;
      case Disease.LIVER:
        return <LiverDisease />;
      case Disease.DIABETES:
        return <Diabetes />;
      case Disease.HISTORY:
        return <History />;
      default:
        return <DiseaseInfo />;
    }
  };

  const NavButton = ({ disease }: { disease: Disease }) => (
    <button
      onClick={() => setActiveDisease(disease)}
      className={`px-4 py-2 rounded-lg transition-colors text-sm md:text-base font-medium ${
        activeDisease === disease
          ? 'bg-blue-600 text-white shadow-lg'
          : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
      }`}
    >
      {disease}
    </button>
  );

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <header className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-0">Patient Health Tracker</h1>
        <Button onClick={onLogout} variant="secondary">Logout</Button>
      </header>

      <nav className="mb-8 flex flex-wrap justify-center gap-3">
        <NavButton disease={Disease.INFO} />
        <NavButton disease={Disease.HEART} />
        <NavButton disease={Disease.LIVER} />
        <NavButton disease={Disease.DIABETES} />
        <NavButton disease={Disease.HISTORY} />
      </nav>

      <main>
        {renderActiveComponent()}
      </main>
    </div>
  );
};

export default Dashboard;