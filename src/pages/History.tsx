import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { toast } from '@/hooks/use-toast';

interface Analysis {
  id: string;
  email: string;
  input_data: {
    currentMedications: any[];
    age: string;
    gender: string;
  };
  result: {
    overallRisk: number;
    totalMME: number;
  };
  pinned: boolean;
  summary: string;
  created_at: { seconds: number };
}

const History = () => {
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<Analysis | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnalyses = async () => {
      const userJson = localStorage.getItem('user');
      if (!userJson) {
        navigate('/login');
        return;
      }

      try {
        setIsLoading(true);
        const user = JSON.parse(userJson);
        const response = await axios.get(
          `http://localhost:8000/analysis/${encodeURIComponent(user.email)}`
        );

        if (response.data?.analyses) {
          setAnalyses(response.data.analyses.filter(a =>
            a && a.input_data && a.result && a.created_at
          ));
        } else {
          setAnalyses([]);
        }
      } catch (error: any) {
        console.error('Fetch error:', error);
        toast({
          title: 'Error',
          description: error.response?.data?.detail || 'Failed to fetch analysis history',
          variant: 'destructive',
        });
        setAnalyses([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalyses();
  }, [navigate]);

  const getRiskCategory = (risk: number) => {
    if (risk > 0.6) return 'High';
    if (risk > 0.3) return 'Moderate';
    return 'Low';
  };

  const getRiskColor = (risk: number) => {
    if (risk > 0.6) return 'bg-red-500';
    if (risk > 0.3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const chartData = selectedEntry ? [
    { name: "Safe", value: 100 - Math.round(selectedEntry.result.overallRisk * 100) },
    { name: "Risk", value: Math.round(selectedEntry.result.overallRisk * 100) },
  ] : [];

  const COLORS = ["#4CAF50", "#FF5252"];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-medical-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl animate-fade-in">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">Analysis History</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Previous Analyses</CardTitle>
              <CardDescription>View your previous medication risk assessments</CardDescription>
            </CardHeader>
            <CardContent>
              {analyses.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Medications</TableHead>
                      <TableHead>Risk</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {analyses.map((analysis) => (
                      <TableRow key={analysis.id}>
                        <TableCell>
                          {new Date(analysis.created_at.seconds * 1000).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {analysis.input_data.currentMedications.map((med: any) => (
                            <Badge
                              key={`${analysis.id}-${med.name}`}
                              variant="outline"
                              className="mr-1 mb-1"
                            >
                              {med.name}
                            </Badge>
                          ))}
                        </TableCell>
                        <TableCell>
                          <Badge className={getRiskColor(analysis.result.overallRisk)}>
                            {getRiskCategory(analysis.result.overallRisk)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedEntry(analysis)}
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  No analysis history available.
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          {selectedEntry ? (
            <Card className="shadow-md h-full">
              <CardHeader>
                <CardTitle>Analysis Details</CardTitle>
                <CardDescription>
                  {new Date(selectedEntry.created_at.seconds * 1000).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Risk Assessment</h3>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={chartData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Medications</h3>
                  <div className="space-y-2">
                    {selectedEntry.input_data.currentMedications.map((med: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                        <div>
                          <span className="font-medium">{med.name}</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                            ({med.dose} {med.unit})
                          </span>
                        </div>
                        <Badge className={getRiskColor(med.potencyLevel || 0)}>
                          MME: {med.mme?.toFixed(1) || 0}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Total MME</h3>
                  <Badge variant="outline" className="text-lg">
                    {selectedEntry.result.totalMME.toFixed(1)}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="shadow-md h-full">
              <CardContent className="flex items-center justify-center h-full">
                <p className="text-gray-500 dark:text-gray-400">Select an analysis to view details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
