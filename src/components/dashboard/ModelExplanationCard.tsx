
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExplanationFactor {
  name: string;
  value: string;
  impact: 'high' | 'medium' | 'low';
  direction: 'positive' | 'negative';
}

interface ModelExplanationCardProps {
  transactionId: string;
  factors: ExplanationFactor[];
  prediction: 'fraud' | 'legitimate';
  confidence: number;
}

const ModelExplanationCard: React.FC<ModelExplanationCardProps> = ({
  transactionId,
  factors,
  prediction,
  confidence,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Model Explanation</span>
          <div 
            className={cn(
              "px-3 py-1 rounded-full text-sm flex items-center",
              prediction === 'fraud' 
                ? "bg-fraud-light text-fraud-dark" 
                : "bg-legitimate-light text-legitimate-dark"
            )}
          >
            {prediction === 'fraud' ? (
              <AlertTriangle className="h-4 w-4 mr-1" />
            ) : (
              <Check className="h-4 w-4 mr-1" />
            )}
            {prediction === 'fraud' ? 'Likely Fraud' : 'Legitimate'} ({Math.round(confidence * 100)}%)
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground mb-2">
            Transaction ID: <span className="font-mono">{transactionId}</span>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-2">Key Factors</h4>
            <div className="space-y-2">
              {factors.map((factor, index) => (
                <div key={index} className="flex items-center justify-between text-sm p-2 bg-muted rounded-md">
                  <div>
                    <span className="font-medium">{factor.name}:</span> {factor.value}
                  </div>
                  <div className="flex items-center">
                    <div
                      className={cn(
                        "h-2 rounded-full mr-2",
                        factor.direction === 'positive' ? "bg-legitimate" : "bg-fraud",
                        factor.impact === 'high' ? "w-16" : factor.impact === 'medium' ? "w-10" : "w-5"
                      )}
                    ></div>
                    <span
                      className={cn(
                        "text-xs font-medium",
                        factor.direction === 'positive' ? "text-legitimate-dark" : "text-fraud-dark"
                      )}
                    >
                      {factor.direction === 'positive' ? '+' : '-'}
                      {factor.impact === 'high' ? 'High' : factor.impact === 'medium' ? 'Med' : 'Low'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModelExplanationCard;
