# Predicting-Health-Disease-Using-AI-For-Patient-Accuarcy- 

A web app that predicts the risk of three diseases (heart disease, liver disease
and diabetes) from a patient's medical report values, using logistic regression.
It then gives the user diet and prevention advice based on the result.

## Features
- Sign up and sign in
- Dashboard with a page for each disease: Heart Disease, Liver Disease, Diabetes
- Enter the values from a doctor's report, and the model predicts the result
  with a probability score
- Diet and prevention suggestions for each patient, generated with Google Gemini
- Prediction history, so users can review earlier results
- Disease information pages explaining each condition

## How it works
1. The model is trained with logistic regression on existing medical datasets.
2. The user enters the values from their doctor's report.
3. The app calculates the prediction and shows the probability and model accuracy.
4. The Gemini service generates personalised diet and prevention advice.

## Tech Stack
- React with TypeScript
- Vite
- Logistic regression for the predictions
- Google Gemini API for diet and prevention advice

## Project Structure
- `App.tsx`, `index.tsx`: app entry and routing
- `components/`: Dashboard, Diabetes, HeartDisease, LiverDisease, History,
  DiseaseInfo, SignIn, SignUp, and shared UI (Button, Card, Input, ResultDisplay, Spinner)
- `services/geminiService.ts`: Gemini API calls for advice
- `services/historyService.ts`: stores prediction history
- `types.ts`: shared TypeScript types

## Run Locally
1. Install Node.js
2. Install the packages: `npm install`
3. Create a `.env.local` file with your key: `GEMINI_API_KEY=your_key` (check)
4. Start the app: `npm run dev`

## Disclaimer
This project is for learning and education only. It is not a medical device and
does not replace advice from a doctor.
