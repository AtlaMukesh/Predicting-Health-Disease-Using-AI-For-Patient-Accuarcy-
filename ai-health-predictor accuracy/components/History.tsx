import React, { useState, useEffect, useCallback } from 'react';
import { getHistory, clearHistory } from '../services/historyService';
import { PredictionHistoryItem, Disease } from '../types';
import Card from './common/Card';
import Button from './common/Button';
import ResultDisplay from './common/ResultDisplay';

const History: React.FC = () => {
  const [history, setHistory] = useState<PredictionHistoryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<PredictionHistoryItem | null>(null);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleClearHistory = useCallback(() => {
    clearHistory();
    setHistory([]);
    setSelectedItem(null);
  }, []);

  const getIconForDisease = (disease: Disease) => {
    switch (disease) {
      case Disease.HEART:
        return '❤️';
      case Disease.LIVER:
        return '🧡';
      case Disease.DIABETES:
        return '🩸';
      default:
        return '📋';
    }
  };
  
  const isHighRisk = (item: PredictionHistoryItem) => {
    const prediction = item.result.prediction.toLowerCase();
    return prediction.includes('high risk') || prediction.includes('positive');
  }

  if (selectedItem) {
    return (
      <Card>
        <div className="p-4 flex justify-between items-center border-b border-slate-700 bg-slate-800">
           <h2 className="text-xl font-bold text-white">Prediction Details</h2>
           <Button onClick={() => setSelectedItem(null)} variant="secondary">
             &larr; Back to History
           </Button>
        </div>
        <ResultDisplay result={selectedItem.result} />
        <div className="p-6 md:p-8 border-t border-slate-700 bg-slate-900/50">
            <h4 className="font-semibold text-white mb-3">Parameters Used For This Prediction</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-sm">
                {Object.entries(selectedItem.params).map(([key, value]) => (
                    <div key={key}>
                        <p className="text-slate-400 capitalize">{key.replace(/_/g, ' ')}</p>
                        <p className="text-white font-medium">{value}</p>
                    </div>
                ))}
            </div>
        </div>
      </Card>
    );
  }

  return (
    <Card>
        <div className="p-6 md:p-8 flex flex-col sm:flex-row justify-between items-center">
            <h2 className="text-2xl font-bold text-white mb-4 sm:mb-0">Prediction History</h2>
            {history.length > 0 && (
                <Button onClick={handleClearHistory} variant="secondary">
                    Clear History
                </Button>
            )}
        </div>
        {history.length === 0 ? (
            <div className="p-6 md:p-8 text-center text-slate-400 border-t border-slate-700">
                You have no prediction history yet.
            </div>
        ) : (
            <ul className="border-t border-slate-700 divide-y divide-slate-700">
                {history.map((item) => (
                    <li key={item.id}>
                        <button 
                          onClick={() => setSelectedItem(item)}
                          className="w-full text-left p-6 hover:bg-slate-700/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                          aria-label={`View details for ${item.disease} prediction on ${new Date(item.timestamp).toLocaleDateString()}`}
                        >
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <span className="text-2xl" aria-hidden="true">{getIconForDisease(item.disease)}</span>
                                    <div>
                                        <p className="font-semibold text-white">{item.disease}</p>
                                        <p className="text-sm text-slate-400">
                                            {new Date(item.timestamp).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right flex-shrink-0">
                                    <p className={`font-bold ${isHighRisk(item) ? 'text-red-400' : 'text-green-400'}`}>
                                        {item.result.prediction}
                                    </p>
                                    <p className="text-sm text-slate-400">
                                      { (item.result.probability * 100).toFixed(0) }% Probability
                                    </p>
                                </div>
                            </div>
                        </button>
                    </li>
                ))}
            </ul>
        )}
    </Card>
  );
};

export default History;
