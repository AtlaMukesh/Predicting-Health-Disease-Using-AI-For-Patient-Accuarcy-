import React from 'react';
import Card from './common/Card';

const DiseaseInfo: React.FC = () => {

  const InfoSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="border-t border-slate-700 p-6 md:p-8">
      <h3 className="text-xl font-bold text-blue-400 mb-4">{title}</h3>
      <div className="space-y-3 text-slate-300 leading-relaxed">
        {children}
      </div>
    </div>
  );

  return (
    <Card>
      <div className="p-6 md:p-8">
        <h2 className="text-2xl font-bold text-white mb-2">About Common Health Conditions</h2>
        <p className="text-slate-400">
          This page provides general information about heart disease, liver disease, and diabetes. 
          This is for educational purposes and is not a substitute for professional medical advice. 
          Use the other tabs to enter your current health metrics and track your condition.
        </p>
      </div>

      <InfoSection title="Heart Disease">
        <p>
          Heart disease refers to a range of conditions that affect your heart. Diseases under the heart disease umbrella include blood vessel diseases, such as coronary artery disease; heart rhythm problems (arrhythmias); and heart defects you're born with (congenital heart defects), among others.
        </p>
        <p>
          <strong>Common Symptoms:</strong> Chest pain (angina), shortness of breath, pain in the neck, jaw, or back.
        </p>
        <p>
          <strong>Key Risk Factors:</strong> High blood pressure, high cholesterol, smoking, diabetes, obesity, and a sedentary lifestyle. Regular monitoring of these factors is crucial for management.
        </p>
      </InfoSection>

      <InfoSection title="Liver Disease">
        <p>
          Liver disease is any condition that causes liver inflammation or damage, and may affect liver function. It can be caused by a variety of factors including viruses, alcohol use, and obesity.
        </p>
         <p>
          <strong>Common Symptoms:</strong> Jaundice (yellowing of skin and eyes), abdominal pain and swelling, chronic fatigue, and nausea.
        </p>
        <p>
          <strong>Key Risk Factors:</strong> Heavy alcohol consumption, obesity, type 2 diabetes, and viral hepatitis. Key indicators in blood tests include levels of bilirubin, alkaline phosphatase, and albumin.
        </p>
      </InfoSection>
      
      <InfoSection title="Diabetes">
        <p>
          Diabetes is a chronic (long-lasting) health condition that affects how your body turns food into energy. Your body either doesn’t make enough insulin or can’t effectively use the insulin it does make.
        </p>
        <p>
          <strong>Common Symptoms:</strong> Frequent urination, increased thirst, unexplained weight loss, fatigue, and blurred vision.
        </p>
        <p>
          <strong>Key Risk Factors:</strong> Family history, age, obesity, and physical inactivity. Key metrics for tracking include blood glucose levels and BMI.
        </p>
      </InfoSection>
    </Card>
  );
};

export default DiseaseInfo;
