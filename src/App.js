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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Modern Alert Box */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-2xl text-white">
              <div className="flex items-start gap-4">
                <div className="bg-white/20 p-3 rounded-xl">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">Comprehensive Analysis: All 7 Health Centers</h3>
                  <p className="text-white/90">
                    Complete VTE risk assessment data from Sohar P.C. and all regional health centers for 2023, 
                    covering 3,281 pregnancy registrations.
                  </p>
                </div>
              </div>
            </div>

            {/* Modern Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-50 rounded-xl">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                    Total
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900">3,281</h3>
                <p className="text-sm text-gray-500 mt-1">Total Registrations</p>
                <p className="text-xs text-gray-400 mt-2">Across 7 health centers</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-emerald-50 rounded-xl">
                    <Activity className="w-6 h-6 text-emerald-600" />
                  </div>
                  <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                    94.1%
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900">3,086</h3>
                <p className="text-sm text-gray-500 mt-1">VTE Assessments</p>
                <p className="text-xs text-gray-400 mt-2">Coverage of all pregnancies</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-red-50 rounded-xl">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                  <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full">
                    High Risk
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900">373</h3>
                <p className="text-sm text-gray-500 mt-1">Score ≥3 Cases</p>
                <p className="text-xs text-gray-400 mt-2">Requiring specialist care</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-amber-50 rounded-xl">
                    <Target className="w-6 h-6 text-amber-600" />
                  </div>
                  <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                    78.8%
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900">294</h3>
                <p className="text-sm text-gray-500 mt-1">Referrals/Prescriptions</p>
                <p className="text-xs text-gray-400 mt-2">Of high-risk patients</p>
              </div>
            </div>

            {/* Modern Progress Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900">Assessment Coverage</h4>
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                </div>
                <div className="mb-4">
                  <div className="flex items-end justify-between mb-2">
                    <span className="text-4xl font-bold text-gray-900">94.1%</span>
                    <span className="text-sm text-emerald-600 font-medium">Excellent</span>
                  </div>
                  <p className="text-sm text-gray-500">Coverage across all registered pregnancies</p>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full transition-all duration-500"
                    style={{ width: '94.1%' }}
                  />
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900">Treatment Rate</h4>
                  <Shield className="w-5 h-5 text-blue-500" />
                </div>
                <div className="mb-4">
                  <div className="flex items-end justify-between mb-2">
                    <span className="text-4xl font-bold text-gray-900">78.8%</span>
                    <span className="text-sm text-blue-600 font-medium">Good</span>
                  </div>
                  <p className="text-sm text-gray-500">High-risk patients receiving care</p>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-500"
                    style={{ width: '78.8%' }}
                  />
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900">Care Gap</h4>
                  <Clock className="w-5 h-5 text-amber-500" />
                </div>
                <div className="mb-4">
                  <div className="flex items-end justify-between mb-2">
                    <span className="text-4xl font-bold text-gray-900">79</span>
                    <span className="text-sm text-amber-600 font-medium">Priority</span>
                  </div>
                  <p className="text-sm text-gray-500">Patients requiring follow-up</p>
                </div>
                <div className="p-3 bg-amber-50 rounded-lg flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span className="text-sm font-medium text-amber-700">Immediate intervention needed</span>
                </div>
              </div>
            </div>

            {/* VTE Assessment Contribution Chart */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">VTE Assessment Contribution by Health Center</h3>
                  <p className="text-sm text-gray-500 mt-1">Percentage of total 3,086 VTE assessments performed</p>
                </div>
                <BarChart3 className="w-5 h-5 text-gray-400" />
              </div>
              
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={healthCenterData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45} 
                    textAnchor="end" 
                    height={100}
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    axisLine={{ stroke: '#e5e7eb' }}
                  />
                  <YAxis 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    axisLine={{ stroke: '#e5e7eb' }}
                    label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft', style: { fill: '#6b7280' } }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="percentage" radius={[8, 8, 0, 0]}>
                    <LabelList 
                      dataKey="percentage" 
                      position="top" 
                      formatter={(value) => `${value}%`}
                      style={{ fill: '#374151', fontSize: 12 }}
                    />
                    {healthCenterData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.name === 'SOHAR P.C.' ? colors.primary : colors.info} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span className="font-medium">Total: 3,086 assessments</span> • 
                  <span>Sohar P.C. leads with 996 assessments (32.3%)</span>
                </p>
              </div>
            </div>

            {/* Assessment Coverage by Center */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Assessment Coverage by Center</h3>
                  <p className="text-sm text-gray-500 mt-1">Percentage of pregnant women assessed at each center</p>
                </div>
                <Activity className="w-5 h-5 text-emerald-500" />
              </div>
              
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={coverageByCenter} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45} 
                    textAnchor="end" 
                    height={100}
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    axisLine={{ stroke: '#e5e7eb' }}
                  />
                  <YAxis 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    axisLine={{ stroke: '#e5e7eb' }}
                    domain={[0, 110]}
                    label={{ value: 'Coverage (%)', angle: -90, position: 'insideLeft', style: { fill: '#6b7280' } }}
                  />
                  <Tooltip content={<CustomTooltip />} formatter={(value) => `${value}%`} />
                  <Bar dataKey="coverage" radius={[8, 8, 0, 0]}>
                    <LabelList 
                      dataKey="coverage" 
                      position="top" 
                      formatter={(value) => `${value}%`}
                      style={{ fill: '#374151', fontSize: 12 }}
                    />
                    {coverageByCenter.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.coverage === 100 ? colors.success : entry.coverage < 90 ? colors.warning : '#86EFAC'} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pregnancy Registration by Trimester */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Pregnancy Registration by Trimester</h3>
                  <p className="text-sm text-gray-500 mt-1">Distribution of 2,139 total registrations</p>
                </div>
                <Heart className="w-5 h-5 text-pink-500" />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="relative flex items-center justify-center">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={trimesterData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {trimesterData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={colors.chartColors[index]} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">2,139</div>
                      <div className="text-sm text-gray-500">Total</div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {trimesterData.map((item, index) => (
                    <div key={item.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: colors.chartColors[index] }} />
                        <div>
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-500">{item.value} women</p>
                        </div>
                      </div>
                      <div className="text-2xl font-bold" style={{ color: colors.chartColors[index] }}>
                        {item.percentage}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-purple-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-purple-900">Key Clinical Insights</h4>
                    <ul className="mt-2 space-y-1 text-sm text-purple-700">
                      <li>• Excellent Early Booking: 92.4% of women register in their first trimester</li>
                      <li>• Minimal Late Registrations: Only 1.1% register in third trimester</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* VTE Risk Score Distribution */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">VTE Risk Score Distribution by Health Center</h3>
                  <p className="text-sm text-gray-500 mt-1">Number of patients by risk score category</p>
                </div>
                <Shield className="w-5 h-5 text-purple-500" />
              </div>
              
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={riskScoreDistribution} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45} 
                    textAnchor="end" 
                    height={100}
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    axisLine={{ stroke: '#e5e7eb' }}
                  />
                  <YAxis 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    axisLine={{ stroke: '#e5e7eb' }}
                    label={{ value: 'Number of Patients', angle: -90, position: 'insideLeft', style: { fill: '#6b7280' } }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    wrapperStyle={{ paddingTop: '20px' }}
                    iconType="rect"
                  />
                  <Bar dataKey="score2" stackId="a" fill={colors.warning} name="Score ≥2" />
                  <Bar dataKey="score3" stackId="a" fill={colors.danger} name="Score ≥3" />
                  <Bar dataKey="score4" stackId="a" fill={colors.secondary} name="Score ≥4" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Sohar P.C. Performance Spotlight */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-xl border border-orange-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-orange-100 rounded-xl">
                  <Target className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Sohar P.C. Performance Spotlight</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/80 backdrop-blur p-5 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <h4 className="font-semibold text-gray-800">Coverage & Scale</h4>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• 1,142 total registrations (35% of all)</li>
                    <li>• 996 VTE assessments (87.2% rate)</li>
                    <li>• Largest health center in analysis</li>
                  </ul>
                </div>

                <div className="bg-white/80 backdrop-blur p-5 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                    <h4 className="font-semibold text-gray-800">Risk Profile</h4>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• 124 high-risk patients (Score ≥3)</li>
                    <li>• 28% have parity ≥3</li>
                    <li>• 26% are age >35 years</li>
                  </ul>
                </div>

                <div className="bg-white/80 backdrop-blur p-5 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-5 h-5 text-red-600" />
                    <h4 className="font-semibold text-gray-800">Treatment Gap</h4>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• 108 prescribed thromboprophylaxis</li>
                    <li>• 16 high-risk not treated (13%)</li>
                    <li>• Room for improvement in follow-up</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Risk Factors Tab */}
        {activeTab === 'risk' && (
          <div className="space-y-8">
            {/* Risk Factor Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-6 rounded-xl text-white">
                <div className="flex items-center justify-between mb-4">
                  <Shield className="w-8 h-8 opacity-50" />
                  <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded-full">
                    Pre-existing
                  </span>
                </div>
                <div className="text-5xl font-bold mb-2">9</div>
                <p className="text-sm opacity-90">Risk Factors</p>
                <p className="text-xs opacity-75 mt-2">Most common: Parity ≥3</p>
              </div>

              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-6 rounded-xl text-white">
                <div className="flex items-center justify-between mb-4">
                  <FileText className="w-8 h-8 opacity-50" />
                  <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded-full">
                    Obstetric
                  </span>
                </div>
                <div className="text-5xl font-bold mb-2">3</div>
                <p className="text-sm opacity-90">Risk Factors</p>
                <p className="text-xs opacity-75 mt-2">Current pregnancy related</p>
              </div>

              <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-6 rounded-xl text-white">
                <div className="flex items-center justify-between mb-4">
                  <Activity className="w-8 h-8 opacity-50" />
                  <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded-full">
                    Transient
                  </span>
                </div>
                <div className="text-5xl font-bold mb-2">1</div>
                <p className="text-sm opacity-90">Risk Factor</p>
                <p className="text-xs opacity-75 mt-2">Temporary conditions</p>
              </div>
            </div>

            {/* Obesity Impact Analysis */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Obesity Impact Analysis</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-700">Obesity Distribution</h4>
                  
                  <div className="space-y-3">
                    <div className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border border-orange-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">BMI 30-39 kg/m²</p>
                          <p className="text-sm text-gray-500 mt-1">Moderate obesity</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-orange-600">249</p>
                          <p className="text-sm text-gray-500">8.1%</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg border border-red-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">BMI ≥40 kg/m²</p>
                          <p className="text-sm text-gray-500 mt-1">Severe obesity</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-red-600">84</p>
                          <p className="text-sm text-gray-500">2.7%</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-5 bg-gray-900 text-white rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-lg font-medium">Total Obesity Impact</p>
                          <p className="text-sm opacity-75 mt-1">Combined prevalence</p>
                        </div>
                        <div className="text-right">
                          <p className="text-3xl font-bold">333</p>
                          <p className="text-sm opacity-75">10.8%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-4">Center-Specific Insights</h4>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-1.5"></div>
                      <div>
                        <span className="font-medium text-gray-900">Sohar P.C.:</span>
                        <span className="text-gray-600 ml-1">132 obese patients (13.3% of screened population)</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-1.5"></div>
                      <div>
                        <span className="font-medium text-gray-900">Regional Average:</span>
                        <span className="text-gray-600 ml-1">10.8% across all centers</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-1.5"></div>
                      <div>
                        <span className="font-medium text-gray-900">Clinical Impact:</span>
                        <span className="text-gray-600 ml-1">Obesity is the 3rd most common VTE risk factor</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-1.5"></div>
                      <div>
                        <span className="font-medium text-gray-900">Prevention Focus:</span>
                        <span className="text-gray-600 ml-1">Weight management programs may reduce future VTE risk</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Pre-existing Risk Factors */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Pre-existing Risk Factors</h3>
              
              <div className="overflow-x-auto mb-6">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Risk Factor</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-700">Count</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-700">Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {preExistingRiskFactors.map((factor, index) => (
                      <tr key={factor.factor} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4">{factor.factor}</td>
                        <td className="py-3 px-4 text-center font-semibold">{factor.count}</td>
                        <td className="py-3 px-4 text-center">{factor.percentage}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <ResponsiveContainer width="100%" height={350}>
                <BarChart 
                  data={preExistingRiskFactors} 
                  layout="horizontal"
                  margin={{ top: 20, right: 30, left: 120, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis 
                    type="number" 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    axisLine={{ stroke: '#e5e7eb' }}
                    label={{ value: 'Number of Patients', position: 'insideBottom', offset: -10, style: { fill: '#6b7280' } }}
                  />
                  <YAxis 
                    dataKey="factor" 
                    type="category" 
                    width={110}
                    tick={{ fill: '#6b7280', fontSize: 11 }}
                    axisLine={{ stroke: '#e5e7eb' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="count" fill={colors.primary} radius={[0, 4, 4, 0]}>
                    <LabelList 
                      dataKey="count" 
                      position="right" 
                      style={{ fill: '#374151', fontSize: 11 }}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Obstetric Risk Factors */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Obstetric Risk Factors</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {obstetricRiskFactors.map((factor, index) => (
                  <div key={factor.factor} className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg border border-emerald-200">
                    <h4 className="font-medium text-gray-900 mb-2">{factor.factor}</h4>
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-2xl font-bold text-emerald-600">{factor.count}</p>
                        <p className="text-sm text-gray-500">patients</p>
                      </div>
                      <span className="text-lg font-semibold text-emerald-700">{factor.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>

              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={obstetricRiskFactors} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis 
                    dataKey="factor" 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    axisLine={{ stroke: '#e5e7eb' }}
                  />
                  <YAxis 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    axisLine={{ stroke: '#e5e7eb' }}
                    label={{ value: 'Number of Patients', angle: -90, position: 'insideLeft', style: { fill: '#6b7280' } }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="count" fill={colors.success} radius={[8, 8, 0, 0]}>
                    <LabelList 
                      dataKey="count" 
                      position="top" 
                      style={{ fill: '#374151', fontSize: 12 }}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* New Onset/Transient Risk Factors */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">New Onset/Transient Risk Factors</h3>
              
              <div className="p-5 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg border border-amber-200 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Hyperemesis Gravidarum</h4>
                    <p className="text-sm text-gray-500 mt-1">Severe nausea and vomiting during pregnancy</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-amber-600">15</p>
                    <p className="text-sm text-gray-500">0.5%</p>
                  </div>
                </div>
              </div>

              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={[{ factor: 'Hyperemesis Gravidarum', count: 15 }]} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis 
                    dataKey="factor" 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    axisLine={{ stroke: '#e5e7eb' }}
                  />
                  <YAxis 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    axisLine={{ stroke: '#e5e7eb' }}
                    domain={[0, 20]}
                    label={{ value: 'Number of Patients', angle: -90, position: 'insideLeft', style: { fill: '#6b7280' } }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="count" fill={colors.warning} radius={[8, 8, 0, 0]}>
                    <LabelList 
                      dataKey="count" 
                      position="top" 
                      style={{ fill: '#374151', fontSize: 12 }}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Top 5 Risk Factors Impact Summary */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl text-white">
              <div className="flex items-center gap-3 mb-6">
                <BarChart3 className="w-6 h-6" />
                <h3 className="text-xl font-semibold">Top 5 Risk Factors Impact Summary</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="bg-white/10 backdrop-blur p-6 rounded-lg text-center hover:bg-white/15 transition-colors">
                  <div className="text-4xl font-bold mb-2">824</div>
                  <div className="text-sm font-medium mb-1 opacity-90">Parity ≥3</div>
                  <div className="text-2xl font-bold text-blue-300">26.7%</div>
                </div>
                <div className="bg-white/10 backdrop-blur p-6 rounded-lg text-center hover:bg-white/15 transition-colors">
                  <div className="text-4xl font-bold mb-2">642</div>
                  <div className="text-sm font-medium mb-1 opacity-90">Age > 35 years</div>
                  <div className="text-2xl font-bold text-purple-300">20.8%</div>
                </div>
                <div className="bg-white/10 backdrop-blur p-6 rounded-lg text-center hover:bg-white/15 transition-colors">
                  <div className="text-4xl font-bold mb-2">249</div>
                  <div className="text-sm font-medium mb-1 opacity-90">Obesity BMI 30-39</div>
                  <div className="text-2xl font-bold text-cyan-300">8.1%</div>
                </div>
                <div className="bg-white/10 backdrop-blur p-6 rounded-lg text-center hover:bg-white/15 transition-colors">
                  <div className="text-4xl font-bold mb-2">122</div>
                  <div className="text-sm font-medium mb-1 opacity-90">Medical Comorbidities</div>
                  <div className="text-2xl font-bold text-emerald-300">4%</div>
                </div>
                <div className="bg-white/10 backdrop-blur p-6 rounded-lg text-center hover:bg-white/15 transition-colors">
                  <div className="text-4xl font-bold mb-2">84</div>
                  <div className="text-sm font-medium mb-1 opacity-90">Obesity BMI ≥40</div>
                  <div className="text-2xl font-bold text-orange-300">2.7%</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Insights & Analysis Tab */}
        {activeTab === 'insights' && (
          <div className="space-y-8">
            {/* Comprehensive Performance Analysis */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Comprehensive Performance Analysis</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-700 mb-4">Assessment Coverage Insights</h4>
                  
                  <div className="space-y-3">
                    <div className="p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg border border-emerald-200 flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
                      <div>
                        <h5 className="font-semibold text-emerald-900">Strong Overall Performance</h5>
                        <p className="text-emerald-700 text-sm mt-1">94.1% VTE assessment coverage across 3,281 pregnancies</p>
                      </div>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 flex items-start gap-3">
                      <Award className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <h5 className="font-semibold text-blue-900">Top Performers</h5>
                        <p className="text-blue-700 text-sm mt-1">AL MULTAQA and AL UWAYNAT maintain 100% assessment rates</p>
                      </div>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200 flex items-start gap-3">
                      <Clock className="w-5 h-5 text-amber-600 mt-0.5" />
                      <div>
                        <h5 className="font-semibold text-amber-900">Improvement Opportunities</h5>
                        <p className="text-amber-700 text-sm mt-1">Sohar P.C. (87.2%) and Wadi Ahin (82.7%) need support</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-4">High-Risk Management</h4>
                  
                  <div className="space-y-3">
                    <div className="p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg border border-red-200 flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                      <div>
                        <h5 className="font-semibold text-red-900">Scale of High-Risk Cases</h5>
                        <p className="text-red-700 text-sm mt-1">373 women with VTE score ≥3 requiring specialist intervention</p>
                      </div>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-200 flex items-start gap-3">
                      <TrendingUp className="w-5 h-5 text-purple-600 mt-0.5" />
                      <div>
                        <h5 className="font-semibold text-purple-900">Treatment Progress</h5>
                        <p className="text-purple-700 text-sm mt-1">78.8% referral/prescription rate (improved from previous analysis)</p>
                      </div>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border border-orange-200 flex items-start gap-3">
                      <Target className="w-5 h-5 text-orange-600 mt-0.5" />
                      <div>
                        <h5 className="font-semibold text-orange-900">Remaining Gap</h5>
                        <p className="text-orange-700 text-sm mt-1">79 high-risk patients still need follow-up care</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sohar P.C. - Detailed Analysis */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Sohar P.C. - Detailed Analysis & Recommendations</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <h4 className="font-semibold text-gray-800">Service Scale</h4>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">›</span>
                      <span>35% of all Suhar Wilayat pregnancies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">›</span>
                      <span>Largest single health facility</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">›</span>
                      <span>1,142 total ANC registrations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">›</span>
                      <span>Critical regional healthcare hub</span>
                    </li>
                  </ul>
                </div>

                <div className="p-5 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                    <h4 className="font-semibold text-gray-800">Performance Gaps</h4>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 mt-0.5">›</span>
                      <span>Assessment rate: 87.2% (vs 94.1% average)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 mt-0.5">›</span>
                      <span>146 unassessed pregnancies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 mt-0.5">›</span>
                      <span>16 high-risk patients untreated</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 mt-0.5">›</span>
                      <span>Requires targeted intervention</span>
                    </li>
                  </ul>
                </div>

                <div className="p-5 bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="w-5 h-5 text-emerald-600" />
                    <h4 className="font-semibold text-gray-800">Quality Indicators</h4>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-0.5">›</span>
                      <span>High-risk identification: 124 cases</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-0.5">›</span>
                      <span>Treatment initiation: 108 patients</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-0.5">›</span>
                      <span>87% treatment rate for high-risk</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-0.5">›</span>
                      <span>Good clinical decision-making</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Strategic Recommendations */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Strategic Recommendations for 2024</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-4">Priority Actions</h4>
                  
                  <div className="space-y-3">
                    <div className="p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg flex items-start gap-3">
                      <span className="text-pink-600 text-xl mt-0.5">›</span>
                      <div>
                        <span className="font-semibold text-gray-800">Close Treatment Gaps:</span>
                        <p className="text-gray-600 text-sm mt-1">Implement systematic follow-up for 79 high-risk patients without thromboprophylaxis</p>
                      </div>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg flex items-start gap-3">
                      <span className="text-yellow-600 text-xl mt-0.5">›</span>
                      <div>
                        <span className="font-semibold text-gray-800">Support Sohar P.C.:</span>
                        <p className="text-gray-600 text-sm mt-1">Provide training and resources to improve 87.2% assessment rate</p>
                      </div>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg flex items-start gap-3">
                      <span className="text-blue-600 text-xl mt-0.5">›</span>
                      <div>
                        <span className="font-semibold text-gray-800">Standardize Protocols:</span>
                        <p className="text-gray-600 text-sm mt-1">Share best practices from 100% performing centers</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-4">Long-term Strategies</h4>
                  
                  <div className="space-y-3">
                    <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg flex items-start gap-3">
                      <span className="text-green-600 text-xl mt-0.5">›</span>
                      <div>
                        <span className="font-semibold text-gray-800">Prevention Programs:</span>
                        <p className="text-gray-600 text-sm mt-1">Address obesity (10.8% prevalence) and advanced maternal age (20.8%)</p>
                      </div>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg flex items-start gap-3">
                      <span className="text-purple-600 text-xl mt-0.5">›</span>
                      <div>
                        <span className="font-semibold text-gray-800">Quality Monitoring:</span>
                        <p className="text-gray-600 text-sm mt-1">Establish regular audits of VTE assessment completion and treatment outcomes</p>
                      </div>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg flex items-start gap-3">
                      <span className="text-cyan-600 text-xl mt-0.5">›</span>
                      <div>
                        <span className="font-semibold text-gray-800">Data Integration:</span>
                        <p className="text-gray-600 text-sm mt-1">Develop unified tracking system across all 7 health centers</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2023 Program Achievements */}
            <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8 rounded-2xl text-white">
              <h3 className="text-2xl font-light text-center mb-8">
                2023 Program <span className="font-semibold">Achievements</span>
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/10 backdrop-blur p-6 rounded-xl text-center hover:bg-white/20 transition-colors">
                  <div className="text-4xl font-bold mb-2">3,281</div>
                  <div className="text-sm opacity-90">Total Pregnancies</div>
                  <div className="text-xs opacity-75 mt-1">Registered</div>
                </div>
                <div className="bg-white/10 backdrop-blur p-6 rounded-xl text-center hover:bg-white/20 transition-colors">
                  <div className="text-4xl font-bold mb-2">94.1%</div>
                  <div className="text-sm opacity-90">VTE Assessment</div>
                  <div className="text-xs opacity-75 mt-1">Coverage</div>
                </div>
                <div className="bg-white/10 backdrop-blur p-6 rounded-xl text-center hover:bg-white/20 transition-colors">
                  <div className="text-4xl font-bold mb-2">373</div>
                  <div className="text-sm opacity-90">High-Risk Cases</div>
                  <div className="text-xs opacity-75 mt-1">Identified</div>
                </div>
                <div className="bg-white/10 backdrop-blur p-6 rounded-xl text-center hover:bg-white/20 transition-colors">
                  <div className="text-4xl font-bold mb-2">78.8%</div>
                  <div className="text-sm opacity-90">Treatment Initiation</div>
                  <div className="text-xs opacity-75 mt-1">Rate</div>
                </div>
              </div>
            </div>
          </div>
        )}
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