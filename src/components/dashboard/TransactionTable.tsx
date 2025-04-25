
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export interface Transaction {
  id: string;
  amount: number;
  date: string;
  merchant: string;
  userId: string;
  probability: number;
  isFraud: boolean;
}

interface TransactionTableProps {
  transactions: Transaction[];
}

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Transaction ID</TableHead>
              <TableHead>User ID</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Merchant</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Fraud Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">{transaction.id.substring(0, 8)}...</TableCell>
                <TableCell>{transaction.userId}</TableCell>
                <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                <TableCell>{transaction.merchant}</TableCell>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn(
                      "bg-opacity-10 border-0",
                      transaction.isFraud ? "bg-fraud text-fraud-dark" : "bg-legitimate text-legitimate-dark"
                    )}
                  >
                    {transaction.isFraud ? "Suspicious" : "Legitimate"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end">
                    <div
                      className={cn(
                        "h-2 w-16 rounded-full overflow-hidden bg-gray-200 mr-2",
                      )}
                    >
                      <div
                        className={cn(
                          "h-full",
                          transaction.probability > 0.7 ? "bg-fraud" : 
                          transaction.probability > 0.4 ? "bg-amber-500" : 
                          "bg-legitimate"
                        )}
                        style={{ width: `${transaction.probability * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm">{Math.round(transaction.probability * 100)}%</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TransactionTable;
