import { GoogleGenAI, Type } from '@google/genai';
import { Disease, PredictionResult } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        prediction: {
            type: Type.STRING,
            description: "The risk prediction, e.g., 'High Risk', 'Low Risk', 'Positive', 'Negative'."
        },
        probability: {
            type: Type.NUMBER,
            description: "The probability of having the disease (a value between 0.0 and 1.0)."
        },
        accuracy: {
            type: Type.NUMBER,
            description: "A simulated accuracy score for the prediction (a value between 0.0 and 1.0)."
        },
        explanation: {
            type: Type.STRING,
            description: "A brief explanation for the prediction, mentioning influential factors."
        },
        recurrenceRisk: {
            type: Type.STRING,
            description: "The estimated risk of disease recurrence or development in the future. Must be one of: 'Low', 'Medium', or 'High'."
        },
        preventiveAdvice: {
            type: Type.STRING,
            description: "A few actionable preventive tips or advice based on the user's data and prediction. Format with newlines for readability."
        }
    },
    required: ["prediction", "probability", "accuracy", "explanation", "recurrenceRisk", "preventiveAdvice"]
};

export const predictDisease = async (params: Record<string, string>, disease: Disease): Promise<PredictionResult> => {
    const formattedParams = Object.entries(params)
        .map(([key, value]) => `- ${key}: ${value}`)
        .join('\n');

    const prompt = `
        You are an expert medical data analyst. Your task is to analyze the current health parameters of a patient who has an existing diagnosis of ${disease}. Based on their latest data, you will provide an assessment of their current condition.

        Based on the following patient data for ${disease}:
        ${formattedParams}

        1. Analyze these parameters as if you were applying a pre-trained logistic regression model for a patient already diagnosed with this condition.
        2. Assess the patient's current risk status. For heart and liver disease, use "High Risk" or "Low Risk". For diabetes, use "Positive" or "Negative" to indicate if the current readings are in a dangerous range.
        3. Estimate the probability of the current parameters indicating a risk event (a value between 0.0 and 1.0).
        4. Provide a simulated accuracy score for this assessment (a value between 0.85 and 0.98 to simulate a well-trained model).
        5. Based on the provided data, estimate the chance of the disease recurring or developing complications in the near future. Categorize this risk as 'Low', 'Medium', or 'High'. This is the recurrenceRisk.
        6. Provide a brief, clear explanation for your assessment, mentioning the most influential factors from the data provided.
        7. Provide 2-3 actionable preventive tips based on the user's current data and assessment. This should be practical advice formatted with newlines for readability.

        You MUST return your response ONLY in JSON format, conforming to the provided schema. Do not include any extra text, markdown, or explanations outside of the JSON structure.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: responseSchema,
                temperature: 0.2
            }
        });

        const text = response.text.trim();
        const parsedResult = JSON.parse(text);

        // Basic validation
        if (typeof parsedResult.prediction !== 'string' ||
            typeof parsedResult.probability !== 'number' ||
            typeof parsedResult.accuracy !== 'number' ||
            typeof parsedResult.explanation !== 'string' ||
            !['Low', 'Medium', 'High'].includes(parsedResult.recurrenceRisk) ||
            typeof parsedResult.preventiveAdvice !== 'string'
            ) {
            throw new Error('Invalid JSON structure in API response');
        }

        return parsedResult as PredictionResult;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to get prediction from the AI model.");
    }
};