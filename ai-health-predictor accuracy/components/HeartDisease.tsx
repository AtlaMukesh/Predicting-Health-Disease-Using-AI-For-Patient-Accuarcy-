
import React, { useState, useCallback } from 'react';
import { Disease, PredictionResult } from '../types';
import { predictDisease } from '../services/geminiService';
import { savePredictionToHistory } from '../services/historyService';
import Input from './common/Input';
import Button from './common/Button';
import Card from './common/Card';
import Spinner from './common/Spinner';
import ResultDisplay from './common/ResultDisplay';

const HeartDisease: React.FC = () => {
    const [params, setParams] = useState({
        age: '',
        sex: '',
        cp: '',
        trestbps: '',
        chol: '',
        thalach: '',
        exang: '',
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
            const prediction = await predictDisease(params, Disease.HEART);
            setResult(prediction);
            savePredictionToHistory({ disease: Disease.HEART, params, result: prediction });
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
                <h2 className="text-2xl font-bold text-white mb-6">Heart Disease Parameters</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Input label="Age" name="age" type="number" value={params.age} onChange={handleChange} />
                    <Input as="select" label="Sex" name="sex" value={params.sex} onChange={handleChange}>
                        <option value="" disabled>Select gender</option>
                        <option value="1">Male</option>
                        <option value="0">Female</option>
                    </Input>
                    <Input as="select" label="Chest Pain Type" name="cp" value={params.cp} onChange={handleChange}>
                        <option value="" disabled>Select type</option>
                        <option value="0">Typical Angina</option>
                        <option value="1">Atypical Angina</option>
                        <option value="2">Non-anginal Pain</option>
                        <option value="3">Asymptomatic</option>
                    </Input>
                    <Input label="Resting Blood Pressure (mm Hg)" name="trestbps" type="number" value={params.trestbps} onChange={handleChange} />
                    <Input label="Serum Cholestoral (mg/dl)" name="chol" type="number" value={params.chol} onChange={handleChange} />
                    <Input label="Max Heart Rate Achieved" name="thalach" type="number" value={params.thalach} onChange={handleChange} />
                    <Input as="select" label="Exercise Induced Angina" name="exang" value={params.exang} onChange={handleChange}>
                        <option value="" disabled>Select option</option>
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                    </Input>
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

export default HeartDisease;