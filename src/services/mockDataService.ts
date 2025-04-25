
import { Transaction } from '@/components/dashboard/TransactionTable';

// Generate random transaction data for demonstration
export const generateMockTransactions = (count: number): Transaction[] => {
  const merchants = [
    'Amazon', 'Walmart', 'Target', 'Best Buy', 'Apple Store', 
    'Netflix', 'Uber', 'DoorDash', 'Steam', 'eBay'
  ];
  
  const transactions: Transaction[] = [];
  
  for (let i = 0; i < count; i++) {
    // Generate random values
    const amount = Math.random() * 500 + 10; // Between $10 and $510
    const isFraud = Math.random() > 0.85; // 15% chance of fraud
    const probability = isFraud 
      ? 0.7 + Math.random() * 0.3 // 0.7-1.0 for fraudulent
      : Math.random() * 0.3; // 0.0-0.3 for legitimate
    
    // Random date within the last 30 days
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    
    transactions.push({
      id: `txn-${Math.random().toString(36).substring(2, 10)}`,
      amount: parseFloat(amount.toFixed(2)),
      date: date.toLocaleDateString(),
      merchant: merchants[Math.floor(Math.random() * merchants.length)],
      userId: `user-${Math.floor(Math.random() * 1000)}`,
      probability,
      isFraud
    });
  }
  
  return transactions;
};

export const generateMockMetricsData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonth = new Date().getMonth();
  
  const data = [];
  
  // Generate data for the last 6 months
  for (let i = 5; i >= 0; i--) {
    const monthIndex = (currentMonth - i + 12) % 12;
    
    // Slight improvements over time for detection rate
    const detectionRate = 85 + Math.random() * 10 + i * 0.5;
    
    // Fraud rate gradually decreases
    const fraudRate = Math.max(3 - i * 0.3, 1) + Math.random() * 0.5;
    
    // False positives decrease over time
    const falsePositives = Math.max(5 - i * 0.5, 2) + Math.random() * 0.7;
    
    data.push({
      name: months[monthIndex],
      fraudRate: parseFloat(fraudRate.toFixed(1)),
      detectionRate: parseFloat(detectionRate.toFixed(1)),
      falsePositives: parseFloat(falsePositives.toFixed(1))
    });
  }
  
  return data;
};

export const generateMockFeatureImportance = () => {
  return [
    { name: 'Transaction Amount', importance: 85 + Math.random() * 10 },
    { name: 'Time of Day', importance: 75 + Math.random() * 15 },
    { name: 'User History', importance: 70 + Math.random() * 15 },
    { name: 'Distance from Home', importance: 65 + Math.random() * 15 },
    { name: 'Transaction Frequency', importance: 60 + Math.random() * 10 },
    { name: 'Merchant Category', importance: 55 + Math.random() * 10 },
    { name: 'Device Used', importance: 45 + Math.random() * 15 },
    { name: 'IP Location', importance: 40 + Math.random() * 10 },
    { name: 'Browser Type', importance: 30 + Math.random() * 10 },
    { name: 'Purchase Category', importance: 25 + Math.random() * 15 }
  ];
};

export const generateModelPerformanceMetrics = () => {
  return {
    accuracy: 0.92 + Math.random() * 0.05,
    precision: 0.88 + Math.random() * 0.07,
    recall: 0.85 + Math.random() * 0.08,
    f1Score: 0.87 + Math.random() * 0.06
  };
};

export const generateTransactionExplanation = (isFraud: boolean) => {
  if (isFraud) {
    return {
      factors: [
        {
          name: 'Transaction Amount',
          value: '$1,250.00',
          impact: 'high' as const,
          direction: 'negative' as const
        },
        {
          name: 'Time of Transaction',
          value: '3:12 AM',
          impact: 'high' as const,
          direction: 'negative' as const
        },
        {
          name: 'Distance from Home',
          value: '1,200 miles',
          impact: 'medium' as const,
          direction: 'negative' as const
        },
        {
          name: 'User Transaction History',
          value: 'Unusual pattern',
          impact: 'medium' as const,
          direction: 'negative' as const
        },
        {
          name: 'Device Used',
          value: 'First time on this device',
          impact: 'low' as const,
          direction: 'negative' as const
        }
      ],
      prediction: 'fraud' as const,
      confidence: 0.87 + Math.random() * 0.12
    };
  } else {
    return {
      factors: [
        {
          name: 'User Transaction History',
          value: 'Consistent with past behavior',
          impact: 'high' as const,
          direction: 'positive' as const
        },
        {
          name: 'Transaction Amount',
          value: '$68.50',
          impact: 'medium' as const,
          direction: 'positive' as const
        },
        {
          name: 'Merchant Category',
          value: 'Frequently visited',
          impact: 'medium' as const,
          direction: 'positive' as const
        },
        {
          name: 'Time of Transaction',
          value: '2:30 PM',
          impact: 'low' as const,
          direction: 'positive' as const
        },
        {
          name: 'Device Used',
          value: 'Recognized device',
          impact: 'low' as const,
          direction: 'positive' as const
        }
      ],
      prediction: 'legitimate' as const,
      confidence: 0.91 + Math.random() * 0.08
    };
  }
};
