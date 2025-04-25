
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ModelPerformanceMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
}

interface ModelPerformanceCardProps {
  metrics: ModelPerformanceMetrics;
}

const ModelPerformanceCard: React.FC<ModelPerformanceCardProps> = ({ metrics }) => {
  const performanceMetrics = [
    { name: 'Accuracy', value: metrics.accuracy * 100, description: 'Overall correctness of predictions' },
    { name: 'Precision', value: metrics.precision * 100, description: 'When predicted fraud, how often correct' },
    { name: 'Recall', value: metrics.recall * 100, description: 'Portion of actual fraud detected' },
    { name: 'F1 Score', value: metrics.f1Score * 100, description: 'Harmonic mean of precision and recall' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Model Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {performanceMetrics.map((metric) => (
            <div key={metric.name} className="bg-muted rounded-lg p-3">
              <div className="text-sm font-medium text-muted-foreground">{metric.name}</div>
              <div className="text-xl font-bold mt-1">{metric.value.toFixed(1)}%</div>
              <div className="text-xs text-muted-foreground mt-1">{metric.description}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ModelPerformanceCard;
