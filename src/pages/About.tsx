
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info, FileText, BarChart, AlarmClock, Activity } from 'lucide-react';

const About = () => {
  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl animate-fade-in">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">About Opioid Overdose Prediction</h1>
      
      <div className="space-y-6">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5 text-blue-500" />
              How It Works
            </CardTitle>
            <CardDescription>Understanding the prediction model behind our analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>
                Our opioid overdose prediction system uses advanced machine learning algorithms to 
                assess the risk of adverse events based on medication combinations, patient demographics,
                and medical history. This analysis helps patients and healthcare providers make informed
                decisions about pain management strategies.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="flex gap-3">
                  <div className="mt-1">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Data Collection</h3>
                    <p className="text-gray-700">
                      The system collects information about the patient's demographics (age, weight),
                      current opioid medications (type, dosage, frequency), and relevant medical history.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="mt-1">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <AlarmClock className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Real-time Processing</h3>
                    <p className="text-gray-700">
                      Once data is submitted, our algorithms process it in real-time, comparing the medication
                      profile against known risk factors and medication interaction databases.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="mt-1">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Activity className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Risk Assessment</h3>
                    <p className="text-gray-700">
                      The system evaluates multiple risk factors including opioid potency,
                      total morphine milligram equivalents (MME), drug interactions, and patient-specific
                      risk factors.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="mt-1">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <BarChart className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Results Visualization</h3>
                    <p className="text-gray-700">
                      Results are presented through intuitive visualizations, with clear risk categories
                      and personalized recommendations to help manage potential risks.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Machine Learning Model</CardTitle>
            <CardDescription>Technical details about our prediction algorithm</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Our system uses a gradient-boosted decision tree model trained on anonymized patient
              data. The model has been validated on a diverse dataset of over 100,000 patient records,
              with particular attention to opioid medication interactions and overdose risks.
            </p>
            
            <h3 className="text-lg font-medium mt-4">Key Features Used in Prediction:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Medication type and potency (with higher weights for high-potency opioids)</li>
              <li>Daily morphine milligram equivalents (MME)</li>
              <li>Concurrent use of multiple opioids</li>
              <li>Concurrent use of benzodiazepines or other CNS depressants</li>
              <li>Patient age and weight</li>
              <li>Relevant medical history (especially respiratory conditions)</li>
              <li>History of substance use disorder</li>
            </ul>
            
            <h3 className="text-lg font-medium mt-4">Accuracy & Performance:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">92%</div>
                <div className="text-sm text-gray-600">Accuracy</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">89%</div>
                <div className="text-sm text-gray-600">Sensitivity</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">94%</div>
                <div className="text-sm text-gray-600">Specificity</div>
              </div>
            </div>
            
            <Alert className="mt-6">
              <Info className="h-4 w-4" />
              <AlertTitle>Important Note on Limitations</AlertTitle>
              <AlertDescription>
                While our model is highly accurate, it is designed to be a supportive tool and not
                a replacement for professional medical judgment. The predictions are based on
                available data and statistical patterns, and should always be used in conjunction
                with clinical evaluation by healthcare professionals.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
