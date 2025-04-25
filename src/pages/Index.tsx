
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import StatCard from '@/components/dashboard/StatCard';
import TransactionTable from '@/components/dashboard/TransactionTable';
import FraudMetricsChart from '@/components/visualizations/FraudMetricsChart';
import FeatureImportanceChart from '@/components/visualizations/FeatureImportanceChart';
import ModelPerformanceCard from '@/components/visualizations/ModelPerformanceCard';
import ModelExplanationCard from '@/components/dashboard/ModelExplanationCard';
import UploadDatasetCard from '@/components/dashboard/UploadDatasetCard';
import { 
  generateMockTransactions, 
  generateMockMetricsData,
  generateMockFeatureImportance,
  generateModelPerformanceMetrics,
  generateTransactionExplanation
} from '@/services/mockDataService';
import { Activity, AlertTriangle, CreditCard, Shield } from 'lucide-react';

const Index = () => {
  const [transactions, setTransactions] = useState([]);
  const [metrics, setMetrics] = useState([]);
  const [featureImportance, setFeatureImportance] = useState([]);
  const [modelPerformance, setModelPerformance] = useState({ accuracy: 0, precision: 0, recall: 0, f1Score: 0 });
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  
  useEffect(() => {
    // Generate mock data for demonstration
    const mockTransactions = generateMockTransactions(10);
    setTransactions(mockTransactions);
    
    const mockMetrics = generateMockMetricsData();
    setMetrics(mockMetrics);
    
    const mockFeatureImportance = generateMockFeatureImportance();
    setFeatureImportance(mockFeatureImportance);
    
    const mockModelPerformance = generateModelPerformanceMetrics();
    setModelPerformance(mockModelPerformance);
    
    // Select a transaction for explanation
    const fraudulentTransaction = mockTransactions.find(t => t.isFraud);
    if (fraudulentTransaction) {
      const explanation = generateTransactionExplanation(true);
      setSelectedTransaction({ 
        ...fraudulentTransaction,
        explanation 
      });
    } else if (mockTransactions.length > 0) {
      const explanation = generateTransactionExplanation(false);
      setSelectedTransaction({ 
        ...mockTransactions[0],
        explanation 
      });
    }
  }, []);
  
  const handleDatasetUpload = (file: File) => {
    console.log('Dataset uploaded:', file.name);
    // In a real application, we would process the dataset here
    // For now, we'll continue using mock data
  };
  
  // Stats for the top cards
  const totalTransactions = transactions.length;
  const fraudulentTransactions = transactions.filter(t => t.isFraud).length;
  const fraudRate = totalTransactions ? (fraudulentTransactions / totalTransactions * 100).toFixed(1) : '0.0';
  
  // Most recent period's metrics
  const currentMetrics = metrics.length > 0 ? metrics[metrics.length - 1] : null;
  const previousMetrics = metrics.length > 1 ? metrics[metrics.length - 2] : null;
  
  // Calculate trends
  const calculateTrend = (current, previous) => {
    if (!current || !previous) return { value: 0, positive: false };
    const diff = current - previous;
    // Convert value to a number to fix TypeScript errors
    return { value: parseFloat(Math.abs(diff).toFixed(1)), positive: diff >= 0 };
  };
  
  const fraudRateTrend = calculateTrend(
    currentMetrics?.fraudRate, 
    previousMetrics?.fraudRate
  );
  
  const detectionRateTrend = calculateTrend(
    currentMetrics?.detectionRate, 
    previousMetrics?.detectionRate
  );

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Fraud Detection Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor and analyze credit card fraud detection in real-time.
          </p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard 
            title="Total Transactions" 
            value={totalTransactions} 
            description="Last 30 days"
            icon={<CreditCard className="h-4 w-4" />}
          />
          <StatCard 
            title="Fraud Rate" 
            value={`${fraudRate}%`}
            description="Percentage of fraudulent transactions"
            icon={<AlertTriangle className="h-4 w-4" />}
            trend={fraudRateTrend}
            className={fraudRateTrend.positive ? "border-fraud/30" : ""}
          />
          <StatCard 
            title="Detection Rate" 
            value={`${currentMetrics?.detectionRate || '0.0'}%`}
            description="Percentage of fraud cases detected"
            icon={<Shield className="h-4 w-4" />}
            trend={detectionRateTrend}
            className={detectionRateTrend.positive ? "border-legitimate/30" : ""}
          />
          <StatCard 
            title="False Positive Rate" 
            value={`${currentMetrics?.falsePositives || '0.0'}%`}
            description="Legitimate transactions flagged as fraud"
            icon={<Activity className="h-4 w-4" />}
          />
        </div>
        
        <div className="grid gap-4 md:grid-cols-5 lg:grid-cols-6">
          <div className="col-span-full md:col-span-3 lg:col-span-4">
            <FraudMetricsChart data={metrics} />
          </div>
          <div className="col-span-full md:col-span-2 lg:col-span-2">
            <ModelPerformanceCard metrics={modelPerformance} />
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <FeatureImportanceChart data={featureImportance} />
          {selectedTransaction && (
            <ModelExplanationCard 
              transactionId={selectedTransaction.id}
              factors={selectedTransaction.explanation.factors}
              prediction={selectedTransaction.explanation.prediction}
              confidence={selectedTransaction.explanation.confidence}
            />
          )}
        </div>
        
        <div className="grid gap-4 md:grid-cols-3">
          <div className="md:col-span-2">
            <TransactionTable transactions={transactions} />
          </div>
          <div>
            <UploadDatasetCard onDatasetUploaded={handleDatasetUpload} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
