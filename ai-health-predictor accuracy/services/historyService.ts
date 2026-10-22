import { PredictionHistoryItem, Disease } from '../types';

const HISTORY_KEY = 'healthPredictionHistory';

export const getHistory = (): PredictionHistoryItem[] => {
  try {
    const historyJson = localStorage.getItem(HISTORY_KEY);
    return historyJson ? JSON.parse(historyJson) : [];
  } catch (error) {
    console.error("Failed to parse history from localStorage", error);
    return [];
  }
};

export const savePredictionToHistory = (item: { disease: Disease, params: Record<string, string>, result: PredictionHistoryItem['result']}) => {
  try {
    const history = getHistory();
    const newEntry: PredictionHistoryItem = {
      ...item,
      id: new Date().toISOString() + Math.random(), // simple unique id
      timestamp: new Date().toISOString(),
    };
    const updatedHistory = [newEntry, ...history];
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
  } catch (error) {
    console.error("Failed to save prediction to localStorage", error);
  }
};

export const clearHistory = (): void => {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.error("Failed to clear history from localStorage", error);
  }
};
