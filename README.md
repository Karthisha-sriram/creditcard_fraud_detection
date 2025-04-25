
# Credit Card Fraud Detection

A real-time fraud detection system with interactive visualizations and model explanations for credit card transactions.

## Objective

This project implements a sophisticated fraud detection dashboard that helps financial institutions monitor and analyze credit card transactions in real-time. It provides visual insights into fraud patterns, model performance metrics, and detailed transaction analysis to help identify and prevent fraudulent activities.

## Installation

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn package manager

### Setup Instructions

1. Clone the repository
```bash
git clone [your-repository-url]
cd credit-card-fraud-detection
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

## Project Structure

```
src/
├── components/
│   ├── dashboard/        # Dashboard-specific components
│   ├── layout/          # Layout components
│   ├── ui/              # Reusable UI components
│   └── visualizations/  # Charts and data visualization components
├── hooks/               # Custom React hooks
├── lib/                # Utility functions
├── pages/              # Page components
└── services/           # Data and API services
```

## Features

- 📊 Real-time transaction monitoring
- 🔍 Advanced fraud detection analytics
- 📈 Interactive data visualizations
- 🎯 Model performance metrics
- 💡 Transaction explanation system
- 📱 Responsive design for all devices
- 🔄 Mock data generation for testing
- 📤 Dataset upload functionality

## Usage

### Dashboard Navigation

The dashboard provides several key sections:

1. **Transaction Overview**: View recent transactions and their fraud probability scores
2. **Fraud Metrics**: Monitor fraud rates and detection performance over time
3. **Model Performance**: Track accuracy, precision, recall, and F1 scores
4. **Feature Importance**: Analyze which transaction attributes contribute most to fraud detection
5. **Transaction Analysis**: Get detailed explanations for flagged transactions

### Data Upload

Users can upload their own transaction datasets through the upload interface for analysis.

## Code Quality

- Built with TypeScript for type safety
- Follows React best practices and hooks patterns
- Implements responsive design using Tailwind CSS
- Uses shadcn/ui components for consistent UI
- Includes proper error handling and loading states
- Maintains clean code structure with separation of concerns



## License

This project is licensed under the MIT License.

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Recharts
- React Query
- React Router DOM

## Future Enhancements

- Integration with real-time transaction data
- Advanced anomaly detection algorithms
- User authentication and role-based access
- Custom alert configurations
- Export functionality for reports
- API integration with backend services




