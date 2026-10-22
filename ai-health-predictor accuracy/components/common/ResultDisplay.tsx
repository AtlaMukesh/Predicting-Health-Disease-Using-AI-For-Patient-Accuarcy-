import React from 'react';
import { PredictionResult } from '../../types';

interface ResultDisplayProps {
  result: PredictionResult;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  const isHighRisk = result.prediction.toLowerCase().includes('high risk') || result.prediction.toLowerCase().includes('positive');

  const riskColor = isHighRisk ? 'text-red-400' : 'text-green-400';
  const riskBg = isHighRisk ? 'bg-red-500/10' : 'bg-green-500/10';
  const riskBorder = isHighRisk ? 'border-red-500/20' : 'border-green-500/20';

  const recurrenceRiskMap = {
    High: { color: 'text-red-400' },
    Medium: { color: 'text-yellow-400' },
    Low: { color: 'text-green-400' },
  };
  const recurrenceInfo = recurrenceRiskMap[result.recurrenceRisk] || { color: 'text-white' };


  const MetricCard = ({ title, value, colorClass }: { title: string; value: string; colorClass?: string }) => (
    <div className={`p-4 rounded-lg bg-slate-800/50 border border-slate-700`}>
      <h4 className="text-sm font-medium text-slate-400 mb-1">{title}</h4>
      <p className={`text-2xl font-semibold ${colorClass || 'text-white'}`}>{value}</p>
    </div>
  );

  return (
    <div className={`p-6 md:p-8 border-t ${riskBorder} ${riskBg}`}>
      <h3 className="text-xl font-bold text-white mb-6 text-center">Prediction Result</h3>
      <div className="text-center mb-6">
        <p className="text-sm text-slate-400">Risk Assessment</p>
        <p className={`text-4xl font-bold ${riskColor}`}>{result.prediction}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <MetricCard title="Probability" value={`${(result.probability * 100).toFixed(1)}%`} colorClass={riskColor} />
        <MetricCard title="Model Accuracy" value={`${(result.accuracy * 100).toFixed(1)}%`} colorClass="text-blue-400" />
        <MetricCard title="Recurrence Risk" value={result.recurrenceRisk} colorClass={recurrenceInfo.color} />
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="font-semibold text-white mb-2">Explanation</h4>
          <p className="text-slate-300 text-sm leading-relaxed">{result.explanation}</p>
        </div>
        <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
          <h4 className="font-semibold text-white mb-2">Preventive Advice</h4>
          <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">{result.preventiveAdvice}</p>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;