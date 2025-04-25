
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

interface FraudMetric {
  name: string;
  fraudRate: number;
  detectionRate: number;
  falsePositives: number;
}

interface FraudMetricsChartProps {
  data: FraudMetric[];
}

const FraudMetricsChart: React.FC<FraudMetricsChartProps> = ({ data }) => {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Fraud Metrics Over Time</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="fraudRate" 
              stroke="#f44336" 
              name="Fraud Rate (%)" 
              activeDot={{ r: 8 }} 
            />
            <Line 
              type="monotone" 
              dataKey="detectionRate" 
              stroke="#2196f3" 
              name="Detection Rate (%)" 
            />
            <Line 
              type="monotone" 
              dataKey="falsePositives" 
              stroke="#ff9800" 
              name="False Positives (%)" 
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default FraudMetricsChart;
