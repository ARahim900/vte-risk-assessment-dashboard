import React, { useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';
import { MapPin, Users, Activity, AlertTriangle, Target, CheckCircle, Shield, Clock, Info, BarChart3, FileText, Heart, TrendingUp, Award } from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Modern color palette
  const colors = {
    primary: '#6366F1', // Indigo
    secondary: '#8B5CF6', // Purple
    success: '#10B981', // Emerald
    warning: '#F59E0B', // Amber
    danger: '#EF4444', // Red
    info: '#3B82F6', // Blue
    dark: '#1F2937', // Gray-800
    light: '#F9FAFB', // Gray-50
    muted: '#9CA3AF', // Gray-400
    chartColors: ['#6366F1', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B', '#3B82F6', '#EF4444']
  };

  // All data from PDF
  const healthCenterData = [
    { name: 'AL MULTAQA', percentage: 14.1, assessments: 435 },
    { name: 'AL UWAYNAT', percentage: 16.5, assessments: 508 },
    { name: 'TAREEF', percentage: 13.4, assessments: 414 },
    { name: 'FALAJ', percentage: 11.7, assessments: 362 },
    { name: 'WADI HIBI', percentage: 7.8, assessments: 242 },
    { name: 'SOHAR P.C.', percentage: 32.3, assessments: 996 },
    { name: 'WADI AHIN', percentage: 4.2, assessments: 129 }
  ];

  const coverageByCenter = [
    { name: 'AL MULTAQA', coverage: 100 },
    { name: 'AL UWAYNAT', coverage: 100 },
    { name: 'TAREEF', coverage: 99.3 },
    { name: 'FALAJ', coverage: 98.6 },
    { name: 'WADI HIBI', coverage: 94.5 },
    { name: 'SOHAR P.C.', coverage: 87.2 },
    { name: 'WADI AHIN', coverage: 82.7 }
  ];

  const trimesterData = [
    { name: 'First Trimester', value: 1977, percentage: 92.4 },
    { name: 'Second Trimester', value: 126, percentage: 5.9 },
    { name: 'Third Trimester', value: 24, percentage: 1.1 },
    { name: 'Unknown', value: 12, percentage: 0.6 }
  ];

  const riskScoreDistribution = [
    { name: 'AL MULTAQA', score2: 150, score3: 50, score4: 8 },
    { name: 'AL UWAYNAT', score2: 140, score3: 48, score4: 7 },
    { name: 'TAREEF', score2: 110, score3: 35, score4: 5 },
    { name: 'FALAJ', score2: 120, score3: 32, score4: 6 },
    { name: 'WADI HIBI', score2: 70, score3: 18, score4: 3 },
    { name: 'SOHAR P.C.', score2: 390, score3: 115, score4: 20 },
    { name: 'WADI AHIN', score2: 40, score3: 8, score4: 2 }
  ];

  const preExistingRiskFactors = [
    { factor: 'Parity ≥3', count: 824, percentage: 26.7 },
    { factor: 'Age > 35 years', count: 642, percentage: 20.8 },
    { factor: 'Obesity BMI 30-39', count: 249, percentage: 8.1 },
    { factor: 'Medical Comorbidities', count: 122, percentage: 4.0 },
    { factor: 'Obesity BMI ≥40', count: 84, percentage: 2.7 },
    { factor: 'Family History of VTE', count: 18, percentage: 0.6 },
    { factor: 'Gross Varicose Veins', count: 14, percentage: 0.5 },
    { factor: 'Smoking', count: 6, percentage: 0.2 },
    { factor: 'Previous VTE Single Event', count: 4, percentage: 0.1 }
  ];

  const obstetricRiskFactors = [
    { factor: 'Multiple Pregnancy', count: 33, percentage: 1.1 },
    { factor: 'Assisted Reproductive Technology', count: 12, percentage: 0.4 },
    { factor: 'Pre-eclampsia', count: 8, percentage: 0.3 }
  ];

  // Custom tooltip for better data display
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100">
          <p className="font-medium text-gray-900">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Custom label for pie chart
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-sm font-medium"
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modern Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-light text-gray-900">
                VTE Risk Assessment <span className="font-semibold">Dashboard</span>
              </h1>
              <p className="text-gray-500 mt-2">Suhar Wilayat Comprehensive Analysis • 2023</p>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-center">
                <p className="text-2xl font-semibold text-gray-900">3,281</p>
                <p className="text-sm text-gray-500">Total Pregnancies</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold text-gray-900">3,086</p>
                <p className="text-sm text-gray-500">VTE Assessments</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold text-gray-900">7</p>
                <p className="text-sm text-gray-500">Health Centers</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Modern Navigation */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex gap-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-all ${
                activeTab === 'overview'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Overview & Metrics
            </button>
            <button
              onClick={() => setActiveTab('risk')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-all ${
                activeTab === 'risk'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Risk Factors
            </button>
            <button
              onClick={() => setActiveTab('insights')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-all ${
                activeTab === 'insights'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Insights & Analysis
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content - truncated for length */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Content here */}
      </main>

      {/* Modern Footer */}
      <footer className="bg-white border-t border-gray-100 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <p className="font-medium text-gray-900">
              Comprehensive VTE Risk Assessment Analysis for Suhar Wilayat Health Network
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Data Period: January - December 2023 • All 7 Health Centers Included
            </p>
            <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-400">
              {['AL MULTAQA', 'AL UWAYNAT', 'TAREEF', 'FALAJ', 'WADI HIBI', 'SOHAR P.C.', 'WADI AHIN'].map((center, index) => (
                <React.Fragment key={center}>
                  <span className="hover:text-gray-600 transition-colors cursor-pointer">{center}</span>
                  {index < 6 && <span>•</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;