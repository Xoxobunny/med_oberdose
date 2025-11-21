
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, AlertCircle, TrendingUp, TrendingDown } from "lucide-react";

interface ResultsSectionProps {
  results: any;
  patientData: any;
}

export const ResultsSection = ({ results, patientData }: ResultsSectionProps) => {
  // 1. Format the prediction result as a percentage
  const riskProbability = results.risk_probability[0][1]; // Probability of high risk
  const riskPercentage = (riskProbability * 100);
  
  let riskCategory = "Low";
  let riskColor = "bg-green-500";
  
  if (riskProbability > 0.6) {
    riskCategory = "High";
    riskColor = "bg-red-500";
  } else if (riskProbability > 0.3) {
    riskCategory = "Moderate";
    riskColor = "bg-yellow-500";
  }

  // 2. Create a more meaningful graph from risk factors
  const activeRiskFactors = [
    { name: 'Chronic Pain', active: patientData.has_chronic_pain },
    { name: 'Mental Health Dx', active: patientData.has_mental_health_dx },
    { name: 'Substance Abuse Hx', active: patientData.history_of_substance_abuse },
    { name: 'Liver Disease', active: patientData.liver_disease },
    { name: 'Kidney Disease', active: patientData.kidney_disease },
    { name: 'Respiratory Disease', active: patientData.respiratory_disease },
    { name: 'Concurrent Benzos', active: patientData.concurrent_benzos },
    { name: 'Concurrent Relaxants', active: patientData.concurrent_muscle_relaxants },
    { name: 'Concurrent Sleep Meds', active: patientData.concurrent_sleep_meds },
    { name: 'Concurrent Antidepressants', active: patientData.concurrent_antidepressants },
    { name: 'Tobacco Use', active: patientData.tobacco_use },
    { name: 'Previous Overdose', active: patientData.previous_overdose },
    { name: 'High MME (>50)', active: patientData.daily_mme > 50 }
  ].filter(factor => factor.active)
   .map(factor => ({ name: factor.name, value: 1 }));

  // Pie chart data remains the same
  const pieChartData = [
    { name: "Low Risk", value: 100 - riskPercentage },
    { name: "High Risk", value: riskPercentage },
  ];
  
  const PIE_COLORS = ["#4CAF50", "#F44336"];
  
  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="shadow-lg border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Opioid Overdose Risk Analysis</span>
            <Badge className={`${riskColor} text-white text-lg px-4 py-2`}>{riskCategory} Risk</Badge>
          </CardTitle>
          <CardDescription>
            This analysis is based on the patient's provided information and medication details.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column: Risk Score and MME */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-800">Overall Risk Assessment</h3>
              
              <div>
                <div className="flex justify-between mb-1 text-gray-700">
                  <span className="font-medium">Calculated Overdose Risk</span>
                  <span className="font-bold text-lg">{riskPercentage.toFixed(2)}%</span>
                </div>
                <Progress value={riskPercentage} className="h-3" />
              </div>

              <div>
                <div className="flex justify-between mb-1 text-gray-700">
                  <span className="font-medium">Daily MME (Morphine Milligram Equivalent)</span>
                  <span className="font-bold text-lg">{patientData.daily_mme.toFixed(2)}</span>
                </div>
                <div className={`text-sm flex items-center ${patientData.daily_mme > 50 ? 'text-red-600' : 'text-green-600'}`}>
                    {patientData.daily_mme > 50 ? <TrendingUp className="h-4 w-4 mr-1"/> : <TrendingDown className="h-4 w-4 mr-1"/>}
                    {patientData.daily_mme > 90 ? "High MME. CDC recommends caution." : (patientData.daily_mme > 50 ? "Moderate MME. Increased overdose risk." : "Low MME per CDC guidelines.")}
                </div>
              </div>
              
              <Alert variant={riskCategory === "High" ? "destructive" : "default"}>
                {riskCategory === "High" ? <AlertCircle className="h-4 w-4" /> : <Info className="h-4 w-4" />}
                <AlertTitle>Risk Interpretation</AlertTitle>
                <AlertDescription>
                  {riskCategory === "Low" && "Current medication regimen appears to have manageable risk. Continue as directed and monitor for any side effects."}
                  {riskCategory === "Moderate" && "Some potential for adverse effects. Follow dosing schedule carefully and be aware of warning signs of overdose."}
                  {riskCategory === "High" && "Significant risk of adverse effects or overdose. Consult healthcare provider immediately about safer pain management options."}
                </AlertDescription>
              </Alert>
            </div>
            
            {/* Right Column: Pie Chart */}
            <div className="flex flex-col items-center justify-center h-80">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Risk Contribution</h3>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={110}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${Number(value).toFixed(2)}%`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Bottom Section: Contributing Factors */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Contributing Risk Factors</h3>
            {activeRiskFactors.length > 0 ? (
              <div className="h-64 mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={activeRiskFactors}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" hide={true} domain={[0, 1]} />
                    <YAxis dataKey="name" type="category" width={150} tick={{ fontSize: 12 }} />
                    <Tooltip
                        cursor={{fill: 'rgba(230, 230, 230, 0.5)'}}
                        formatter={(value) => [value === 1 ? 'Present' : 'Absent', "Status"]}
                    />
                    <Bar dataKey="value" fill="#FFC658" barSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
                <div className="text-center text-gray-500 p-4 bg-gray-50 rounded-lg">
                    No major risk factors identified apart from baseline medication.
                </div>
            )}
          </div>
          
        </CardContent>
      </Card>
    </div>
  );
};
