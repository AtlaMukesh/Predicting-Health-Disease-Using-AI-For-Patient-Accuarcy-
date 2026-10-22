
import React, { useState, useCallback } from 'react';
import { Disease, PredictionResult } from '../types';
import { predictDisease } from '../services/geminiService';
import { savePredictionToHistory } from '../services/historyService';
import Input from './common/Input';
import Button from './common/Button';
import Card from './common/Card';
import Spinner from './common/Spinner';
import ResultDisplay from './common/ResultDisplay';

const LiverDisease: React.FC = () => {
    const [params, setParams] = useState({
        Age: '',
        Gender: '',
        Total_Bilirubin: '',
        Alkaline_Phosphotase: '',
        Alamine_Aminotransferase: '',
        Albumin: '',
    });
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<PredictionResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setParams({ ...params, [e.target.name]: e.target.value });
    };

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);
        setError(null);
        try {
            const prediction = await predictDisease(params, Disease.LIVER);
            setResult(prediction);
            savePredictionToHistory({ disease: Disease.LIVER, params, result: prediction });
        } catch (err) {
            setError('An error occurred while fetching the prediction. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [params]);

    return (
        <Card>
            <form onSubmit={handleSubmit} className="p-6 md:p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Liver Disease Parameters</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Input label="Age" name="Age" type="number" value={params.Age} onChange={handleChange} />
                    <Input as="select" label="Gender" name="Gender" value={params.Gender} onChange={handleChange}>
                        <option value="" disabled>Select gender</option>
                        <option>Male</option>
                        <option>Female</option>
                    </Input>
                    <Input label="Total Bilirubin" name="Total_Bilirubin" type="number" step="0.1" value={params.Total_Bilirubin} onChange={handleChange} />
                    <Input label="Alkaline Phosphotase" name="Alkaline_Phosphotase" type="number" value={params.Alkaline_Phosphotase} onChange={handleChange} />
                    <Input label="Alamine Aminotransferase" name="Alamine_Aminotransferase" type="number" value={params.Alamine_Aminotransferase} onChange={handleChange} />
                    <Input label="Albumin" name="Albumin" type="number" step="0.1" value={params.Albumin} onChange={handleChange} />
                </div>
                <div className="mt-8 text-center">
                    <Button type="submit" disabled={loading} className="w-full sm:w-auto">
                        {loading ? <Spinner /> : 'Assess Condition'}
                    </Button>
                </div>
            </form>
            {error && <div className="p-6 md:p-8 border-t border-slate-700 text-center text-red-400">{error}</div>}
            {result && <ResultDisplay result={result} />}
        </Card>
    );
};

export default LiverDisease;