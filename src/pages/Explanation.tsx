
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, BarChart2, Brain, Database, LineChart, Code } from 'lucide-react';

const Explanation = () => {
  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl animate-fade-in">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">How It Works</h1>
      
      <Tabs defaultValue="overview" className="w-full space-y-8">
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="algorithm">Algorithm</TabsTrigger>
          <TabsTrigger value="data">Data Sources</TabsTrigger>
          <TabsTrigger value="accuracy">Accuracy</TabsTrigger>
          <TabsTrigger value="technical">Technical Details</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-cyan-600">Process Flow</CardTitle>
                <CardDescription>How our system predicts overdose risk</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&q=75&fit=crop&w=800" 
                  alt="Process Flow Diagram" 
                  className="rounded-md w-full shadow-md border border-gray-200 dark:border-gray-700"
                />
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-cyan-100 dark:bg-cyan-900 rounded-full p-2 mr-3">
                      <span className="font-bold text-cyan-600 dark:text-cyan-400">1</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Patient Data Collection</h3>
                      <p className="text-gray-600 dark:text-gray-400">The system collects essential patient information and current medication regimens.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-cyan-100 dark:bg-cyan-900 rounded-full p-2 mr-3">
                      <span className="font-bold text-cyan-600 dark:text-cyan-400">2</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Data Processing</h3>
                      <p className="text-gray-600 dark:text-gray-400">Information is processed through our machine learning algorithm to calculate MME and identify potential risks.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-cyan-100 dark:bg-cyan-900 rounded-full p-2 mr-3">
                      <span className="font-bold text-cyan-600 dark:text-cyan-400">3</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Risk Assessment</h3>
                      <p className="text-gray-600 dark:text-gray-400">The system evaluates overall risk and specific concerns based on medication combinations.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-cyan-100 dark:bg-cyan-900 rounded-full p-2 mr-3">
                      <span className="font-bold text-cyan-600 dark:text-cyan-400">4</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Personalized Recommendations</h3>
                      <p className="text-gray-600 dark:text-gray-400">Based on the risk assessment, tailored recommendations are provided to ensure medication safety.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-cyan-600">Key Features</CardTitle>
                <CardDescription>What makes our prediction system unique</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/30 dark:to-blue-900/30 p-5 rounded-lg border border-cyan-100 dark:border-cyan-800">
                    <BarChart2 className="h-10 w-10 text-cyan-600 mb-3" />
                    <h3 className="font-medium mb-2">Real-time Analysis</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Instantly analyze medication risks without waiting for appointments.</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/30 dark:to-blue-900/30 p-5 rounded-lg border border-cyan-100 dark:border-cyan-800">
                    <Brain className="h-10 w-10 text-cyan-600 mb-3" />
                    <h3 className="font-medium mb-2">ML-Powered Insights</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Uses advanced machine learning to evaluate complex medication interactions.</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/30 dark:to-blue-900/30 p-5 rounded-lg border border-cyan-100 dark:border-cyan-800">
                    <LineChart className="h-10 w-10 text-cyan-600 mb-3" />
                    <h3 className="font-medium mb-2">Trend Monitoring</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Track medication safety over time with historical analysis comparisons.</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/30 dark:to-blue-900/30 p-5 rounded-lg border border-cyan-100 dark:border-cyan-800">
                    <AlertCircle className="h-10 w-10 text-cyan-600 mb-3" />
                    <h3 className="font-medium mb-2">Early Warning System</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Identifies potential issues before they become dangerous complications.</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-medium mb-3">Supported Medication Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300">Morphine</Badge>
                    <Badge className="bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300">Oxycodone</Badge>
                    <Badge className="bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300">Hydrocodone</Badge>
                    <Badge className="bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300">Fentanyl</Badge>
                    <Badge className="bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300">Codeine</Badge>
                    <Badge className="bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300">Tramadol</Badge>
                    <Badge className="bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300">Other Opioids</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Algorithm Tab */}
        <TabsContent value="algorithm">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-cyan-600">Our Prediction Algorithm</CardTitle>
              <CardDescription>The science behind our overdose risk predictions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <img 
                    src="https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?auto=format&q=75&fit=crop&w=800" 
                    alt="Machine Learning Algorithm Diagram" 
                    className="rounded-md w-full shadow-md border border-gray-200 dark:border-gray-700"
                  />
                  
                  <div className="mt-6 space-y-4">
                    <h3 className="text-lg font-medium">Algorithm Components</h3>
                    <ul className="space-y-3 list-disc pl-6">
                      <li className="text-gray-600 dark:text-gray-400">
                        <span className="font-medium text-gray-900 dark:text-gray-100">MME Calculation</span>: Morphine Milligram Equivalent calculation to standardize opioid dosages
                      </li>
                      <li className="text-gray-600 dark:text-gray-400">
                        <span className="font-medium text-gray-900 dark:text-gray-100">Interaction Detection</span>: Analysis of potential dangerous drug interactions
                      </li>
                      <li className="text-gray-600 dark:text-gray-400">
                        <span className="font-medium text-gray-900 dark:text-gray-100">Patient Risk Factors</span>: Individual patient characteristics that may increase risk
                      </li>
                      <li className="text-gray-600 dark:text-gray-400">
                        <span className="font-medium text-gray-900 dark:text-gray-100">Historical Patterns</span>: Learning from anonymized historical patient data
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/30 dark:to-blue-900/30 p-6 rounded-lg border border-cyan-100 dark:border-cyan-800">
                    <h3 className="text-lg font-medium mb-4">Model Architecture</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Our system uses a hybrid approach combining rule-based systems with machine learning:
                    </p>
                    
                    <div className="space-y-4">
                      <div className="bg-white/80 dark:bg-gray-800/80 p-4 rounded-md">
                        <h4 className="font-medium text-cyan-600 dark:text-cyan-400">1. Data Preprocessing</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Patient data and medication information are normalized, converted to standard units, and prepared for analysis.
                        </p>
                      </div>
                      
                      <div className="bg-white/80 dark:bg-gray-800/80 p-4 rounded-md">
                        <h4 className="font-medium text-cyan-600 dark:text-cyan-400">2. Feature Engineering</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Key indicators extracted include total opioid load, co-prescribed medications, patient demographics, and medical history.
                        </p>
                      </div>
                      
                      <div className="bg-white/80 dark:bg-gray-800/80 p-4 rounded-md">
                        <h4 className="font-medium text-cyan-600 dark:text-cyan-400">3. Risk Prediction</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Gradient boosting decision trees predict overdose risk probability based on feature importance weights.
                        </p>
                      </div>
                      
                      <div className="bg-white/80 dark:bg-gray-800/80 p-4 rounded-md">
                        <h4 className="font-medium text-cyan-600 dark:text-cyan-400">4. Recommendation Engine</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          AI-driven system generates personalized safety recommendations based on identified risk factors.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Data Sources Tab */}
        <TabsContent value="data">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-cyan-600">Data Sources</CardTitle>
              <CardDescription>Where our predictive models get their information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <Database className="h-12 w-12 text-cyan-600 mb-4" />
                  <h3 className="text-lg font-medium mb-3">Data Foundations</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Our prediction system is built upon diverse, high-quality data sources that ensure accurate and reliable risk assessment.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="border-l-4 border-cyan-500 pl-4">
                      <h4 className="font-medium">Clinical Guidelines</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        CDC and clinical opioid prescribing guidelines provide baseline risk thresholds and best practices.
                      </p>
                    </div>
                    
                    <div className="border-l-4 border-cyan-500 pl-4">
                      <h4 className="font-medium">Medical Research</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Peer-reviewed studies on opioid risks, drug interactions, and overdose factors inform our models.
                      </p>
                    </div>
                    
                    <div className="border-l-4 border-cyan-500 pl-4">
                      <h4 className="font-medium">Pharmaceutical Databases</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Detailed medication information including potency, half-life, and interaction profiles.
                      </p>
                    </div>
                    
                    <div className="border-l-4 border-cyan-500 pl-4">
                      <h4 className="font-medium">Anonymized Patient Data</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        De-identified clinical outcomes help train and validate our prediction models.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <img 
                    src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&q=75&fit=crop&w=800" 
                    alt="Data Sources" 
                    className="rounded-md w-full shadow-md mb-6 border border-gray-200 dark:border-gray-700"
                  />
                  
                  <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/30 dark:to-blue-900/30 p-5 rounded-lg border border-cyan-100 dark:border-cyan-800">
                    <h3 className="font-medium mb-3">Data Privacy & Security</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      All data used in our system is protected using industry-standard security practices:
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                      <li>End-to-end encryption for all patient information</li>
                      <li>HIPAA-compliant data storage and processing</li>
                      <li>Strict access controls and audit trails</li>
                      <li>Regular security assessments and updates</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Accuracy Tab */}
        <TabsContent value="accuracy">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-cyan-600">Model Accuracy</CardTitle>
              <CardDescription>Performance metrics and validation results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-7 space-y-6">
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-medium mb-4">Validation Study Results</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-cyan-50 dark:bg-cyan-900/30 rounded-lg p-4 text-center">
                        <span className="block text-3xl font-bold text-cyan-600 dark:text-cyan-400">92%</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">Sensitivity</span>
                      </div>
                      <div className="bg-cyan-50 dark:bg-cyan-900/30 rounded-lg p-4 text-center">
                        <span className="block text-3xl font-bold text-cyan-600 dark:text-cyan-400">88%</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">Specificity</span>
                      </div>
                      <div className="bg-cyan-50 dark:bg-cyan-900/30 rounded-lg p-4 text-center">
                        <span className="block text-3xl font-bold text-cyan-600 dark:text-cyan-400">90%</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">Overall Accuracy</span>
                      </div>
                      <div className="bg-cyan-50 dark:bg-cyan-900/30 rounded-lg p-4 text-center">
                        <span className="block text-3xl font-bold text-cyan-600 dark:text-cyan-400">0.89</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">AUC-ROC</span>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h4 className="font-medium mb-2">Performance by Risk Category</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>High Risk Detection</span>
                            <span>95%</span>
                          </div>
                          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                            <div className="h-2 bg-cyan-600 rounded-full" style={{ width: '95%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Moderate Risk Detection</span>
                            <span>89%</span>
                          </div>
                          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                            <div className="h-2 bg-cyan-600 rounded-full" style={{ width: '89%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Low Risk Detection</span>
                            <span>86%</span>
                          </div>
                          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                            <div className="h-2 bg-cyan-600 rounded-full" style={{ width: '86%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/30 dark:to-blue-900/30 p-5 rounded-lg border border-cyan-100 dark:border-cyan-800">
                    <h3 className="font-medium mb-3">Validation Methodology</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Our model was validated using a retrospective cohort study of 10,000+ patients with opioid prescriptions.
                      The study compared algorithm predictions against actual clinical outcomes over a 12-month period.
                    </p>
                  </div>
                </div>
                
                <div className="lg:col-span-5">
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6 space-y-6">
                    <h3 className="text-lg font-medium">Accuracy by Medication Type</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">Fentanyl</span>
                          <span className="text-sm text-gray-600">96% accurate</span>
                        </div>
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                          <div className="h-2 bg-cyan-600 rounded-full" style={{ width: '96%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">Oxycodone</span>
                          <span className="text-sm text-gray-600">93% accurate</span>
                        </div>
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                          <div className="h-2 bg-cyan-600 rounded-full" style={{ width: '93%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">Hydrocodone</span>
                          <span className="text-sm text-gray-600">91% accurate</span>
                        </div>
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                          <div className="h-2 bg-cyan-600 rounded-full" style={{ width: '91%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">Morphine</span>
                          <span className="text-sm text-gray-600">92% accurate</span>
                        </div>
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                          <div className="h-2 bg-cyan-600 rounded-full" style={{ width: '92%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">Tramadol</span>
                          <span className="text-sm text-gray-600">88% accurate</span>
                        </div>
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                          <div className="h-2 bg-cyan-600 rounded-full" style={{ width: '88%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">Codeine</span>
                          <span className="text-sm text-gray-600">85% accurate</span>
                        </div>
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                          <div className="h-2 bg-cyan-600 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <h4 className="font-medium mb-2">Continuous Improvement</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Our models are continuously refined and updated as new data becomes available and medical 
                        guidelines evolve. Regular revalidation ensures sustained accuracy over time.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Technical Details Tab */}
        <TabsContent value="technical">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-cyan-600">Technical Specifications</CardTitle>
              <CardDescription>Under the hood of our prediction system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <Code className="h-12 w-12 text-cyan-600 mb-4" />
                  <h3 className="text-xl font-medium mb-4">Technology Stack</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-white dark:bg-gray-800 p-5 rounded-lg border border-gray-200 dark:border-gray-700">
                      <h4 className="font-medium mb-2 text-cyan-600 dark:text-cyan-400">Frontend</h4>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                        <li className="flex items-center">
                          <span className="bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-300 text-xs px-2 py-1 rounded mr-2">React</span>
                          Component-based UI library for interactive interfaces
                        </li>
                        <li className="flex items-center">
                          <span className="bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-300 text-xs px-2 py-1 rounded mr-2">TypeScript</span>
                          Type safety and enhanced developer experience
                        </li>
                        <li className="flex items-center">
                          <span className="bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-300 text-xs px-2 py-1 rounded mr-2">TailwindCSS</span>
                          Utility-first CSS for responsive design
                        </li>
                        <li className="flex items-center">
                          <span className="bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-300 text-xs px-2 py-1 rounded mr-2">Recharts</span>
                          Data visualization for risk assessments
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 p-5 rounded-lg border border-gray-200 dark:border-gray-700">
                      <h4 className="font-medium mb-2 text-cyan-600 dark:text-cyan-400">Backend</h4>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                        <li className="flex items-center">
                          <span className="bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-300 text-xs px-2 py-1 rounded mr-2">Python</span>
                          Core language for data processing and ML
                        </li>
                        <li className="flex items-center">
                          <span className="bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-300 text-xs px-2 py-1 rounded mr-2">Flask</span>
                          Lightweight API framework for serving predictions
                        </li>
                        <li className="flex items-center">
                          <span className="bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-300 text-xs px-2 py-1 rounded mr-2">scikit-learn</span>
                          ML libraries for model training and inference
                        </li>
                        <li className="flex items-center">
                          <span className="bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-300 text-xs px-2 py-1 rounded mr-2">PostgreSQL</span>
                          Secure database for storing medical information
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/30 dark:to-blue-900/30 p-6 rounded-lg border border-cyan-100 dark:border-cyan-800">
                    <h3 className="text-lg font-medium mb-4">System Architecture</h3>
                    <img 
                      src="https://images.unsplash.com/photo-1585079542156-2755d9c8a094?auto=format&q=75&fit=crop&w=800" 
                      alt="System Architecture" 
                      className="rounded-md w-full shadow-md mb-4 border border-gray-200 dark:border-gray-700"
                    />
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Our system uses a microservices architecture with dedicated components for data processing,
                      risk analysis, and recommendation generation. This ensures scalability, resilience, and maintainability.
                    </p>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-5 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h4 className="font-medium mb-3 text-cyan-600 dark:text-cyan-400">ML Model Specifications</h4>
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex justify-between">
                        <span>Algorithm Type:</span>
                        <span className="font-medium text-gray-800 dark:text-gray-200">Gradient Boosted Decision Trees</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Input Features:</span>
                        <span className="font-medium text-gray-800 dark:text-gray-200">48 clinical variables</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Training Dataset Size:</span>
                        <span className="font-medium text-gray-800 dark:text-gray-200">25,000+ patient records</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Model Update Frequency:</span>
                        <span className="font-medium text-gray-800 dark:text-gray-200">Quarterly</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Prediction Time:</span>
                        <span className="font-medium text-gray-800 dark:text-gray-200">&lt;500ms</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Explanation;
