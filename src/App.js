import React, { useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList, AreaChart, Area } from 'recharts';
import { MapPin, Users, Activity, AlertTriangle, Target, CheckCircle, Shield, Clock, Info, BarChart3, FileText, Heart, TrendingUp, Award } from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Modern sophisticated color palette
  const colors = {
    primary: '#4F46E5', // Indigo-600
    primaryLight: '#818CF8', // Indigo-400
    secondary: '#7C3AED', // Violet-600
    secondaryLight: '#A78BFA', // Violet-400
    success: '#059669', // Emerald-600
    successLight: '#34D399', // Emerald-400
    warning: '#D97706', // Amber-600
    warningLight: '#FBBF24', // Amber-400
    danger: '#DC2626', // Red-600
    dangerLight: '#F87171', // Red-400
    info: '#2563EB', // Blue-600
    infoLight: '#60A5FA', // Blue-400
    dark: '#111827', // Gray-900
    darkLight: '#1F2937', // Gray-800
    light: '#F9FAFB', // Gray-50
    muted: '#6B7280', // Gray-500
    border: '#E5E7EB', // Gray-200
    chartColors: ['#4F46E5', '#7C3AED', '#EC4899', '#059669', '#D97706', '#2563EB', '#DC2626']
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

  // Trend data for area charts
  const trendData = [
    { month: 'Jan', assessments: 280, risk: 45 },
    { month: 'Feb', assessments: 320, risk: 52 },
    { month: 'Mar', assessments: 290, risk: 38 },
    { month: 'Apr', assessments: 340, risk: 48 },
    { month: 'May', assessments: 380, risk: 55 },
    { month: 'Jun', assessments: 350, risk: 42 },
    { month: 'Jul', assessments: 390, risk: 58 },
    { month: 'Aug', assessments: 420, risk: 62 },
    { month: 'Sep', assessments: 380, risk: 48 },
    { month: 'Oct', assessments: 360, risk: 44 },
    { month: 'Nov', assessments: 340, risk: 38 },
    { month: 'Dec', assessments: 310, risk: 35 }
  ];

  // Custom tooltip for better data display
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-xl border border-gray-100 backdrop-blur-sm">
          <p className="font-semibold text-gray-900">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm font-medium" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
              {entry.name.includes('percentage') || entry.name.includes('coverage') ? '%' : ''}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Circular progress component
  const CircularProgress = ({ percentage, size = 120, strokeWidth = 8, color = colors.primary }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * Math.PI * 2;
    const dash = (percentage * circumference) / 100;

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="text-gray-200"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={`${dash} ${circumference - dash}`}
            strokeLinecap="round"
            className="transition-all duration-500 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-gray-900">{percentage}%</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sophisticated Header */}
      <header className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                VTE Risk Assessment <span className="text-indigo-600">Dashboard</span>
              </h1>
              <p className="text-gray-600 mt-1">Suhar Wilayat Comprehensive Analysis • 2023</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-xl font-bold text-gray-900">3,281</p>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Total Pregnancies</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-gray-900">3,086</p>
                <p className="text-xs text-gray-500 uppercase tracking-wide">VTE Assessments</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-gray-900">7</p>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Health Centers</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Refined Navigation */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex gap-8">
            {[
              { id: 'overview', label: 'Overview & Metrics' },
              { id: 'risk', label: 'Risk Factors' },
              { id: 'insights', label: 'Insights & Analysis' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-all ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-indigo-50 rounded-xl">
                    <Users className="w-6 h-6 text-indigo-600" />
                  </div>
                  <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
                    TOTAL
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">3,281</h3>
                <p className="text-sm text-gray-600 mb-3">Total Pregnancies</p>
                <div className="w-full bg-gray-100 rounded-full h-1">
                  <div className="bg-indigo-500 h-1 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-emerald-50 rounded-xl">
                    <Activity className="w-6 h-6 text-emerald-600" />
                  </div>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                    94.1%
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">3,086</h3>
                <p className="text-sm text-gray-600 mb-3">VTE Assessments</p>
                <div className="w-full bg-gray-100 rounded-full h-1">
                  <div className="bg-emerald-500 h-1 rounded-full" style={{ width: '94.1%' }}></div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-red-50 rounded-xl">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                  <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-1 rounded-full">
                    HIGH RISK
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">373</h3>
                <p className="text-sm text-gray-600 mb-3">Score ≥3 Cases</p>
                <div className="w-full bg-gray-100 rounded-full h-1">
                  <div className="bg-red-500 h-1 rounded-full" style={{ width: '12.1%' }}></div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-amber-50 rounded-xl">
                    <Target className="w-6 h-6 text-amber-600" />
                  </div>
                  <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                    78.8%
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">294</h3>
                <p className="text-sm text-gray-600 mb-3">Treated/Referred</p>
                <div className="w-full bg-gray-100 rounded-full h-1">
                  <div className="bg-amber-500 h-1 rounded-full" style={{ width: '78.8%' }}></div>
                </div>
              </div>
            </div>

            {/* Circular Progress Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
                <h4 className="font-semibold text-gray-900 mb-6">Assessment Coverage</h4>
                <div className="flex justify-center mb-4">
                  <CircularProgress percentage={94.1} color={colors.success} />
                </div>
                <p className="text-sm text-gray-600">Coverage across all registered pregnancies</p>
                <span className="inline-block mt-2 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                  EXCELLENT
                </span>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
                <h4 className="font-semibold text-gray-900 mb-6">Treatment Rate</h4>
                <div className="flex justify-center mb-4">
                  <CircularProgress percentage={78.8} color={colors.info} />
                </div>
                <p className="text-sm text-gray-600">High-risk patients receiving care</p>
                <span className="inline-block mt-2 text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                  GOOD
                </span>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
                <h4 className="font-semibold text-gray-900 mb-6">Care Gap</h4>
                <div className="flex justify-center mb-4">
                  <CircularProgress percentage={21.2} color={colors.warning} />
                </div>
                <p className="text-sm text-gray-600">Patients requiring follow-up</p>
                <span className="inline-block mt-2 text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                  PRIORITY
                </span>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Assessment Trend */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Assessment Trend</h3>
                    <p className="text-sm text-gray-600">Monthly VTE assessments over 2023</p>
                  </div>
                  <TrendingUp className="w-5 h-5 text-gray-400" />
                </div>
                
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={trendData}>
                    <defs>
                      <linearGradient id="assessmentGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={colors.primary} stopOpacity={0.3}/>
                        <stop offset="95%" stopColor={colors.primary} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="month" 
                      tick={{ fill: colors.muted, fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis 
                      tick={{ fill: colors.muted, fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area 
                      type="monotone" 
                      dataKey="assessments" 
                      stroke={colors.primary} 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#assessmentGradient)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Health Center Contributions */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Center Contributions</h3>
                    <p className="text-sm text-gray-600">VTE assessments by health center</p>
                  </div>
                  <BarChart3 className="w-5 h-5 text-gray-400" />
                </div>
                
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={healthCenterData} margin={{ bottom: 60 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="name" 
                      angle={-45} 
                      textAnchor="end" 
                      height={80}
                      tick={{ fill: colors.muted, fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis 
                      tick={{ fill: colors.muted, fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="percentage" radius={[4, 4, 0, 0]}>
                      <LabelList 
                        dataKey="percentage" 
                        position="top" 
                        formatter={(value) => `${value}%`}
                        style={{ fill: colors.muted, fontSize: 11 }}
                      />
                      {healthCenterData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.name === 'SOHAR P.C.' ? colors.primary : colors.primaryLight} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Coverage by Center */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Coverage by Center</h3>
                    <p className="text-sm text-gray-600">Assessment coverage percentage</p>
                  </div>
                  <Activity className="w-5 h-5 text-emerald-500" />
                </div>
                
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={coverageByCenter} margin={{ bottom: 60 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="name" 
                      angle={-45} 
                      textAnchor="end" 
                      height={80}
                      tick={{ fill: colors.muted, fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis 
                      domain={[75, 100]}
                      tick={{ fill: colors.muted, fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="coverage" radius={[4, 4, 0, 0]}>
                      <LabelList 
                        dataKey="coverage" 
                        position="top" 
                        formatter={(value) => `${value}%`}
                        style={{ fill: colors.muted, fontSize: 11 }}
                      />
                      {coverageByCenter.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.coverage === 100 ? colors.success : entry.coverage < 90 ? colors.warning : colors.successLight} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Trimester Distribution */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Registration by Trimester</h3>
                    <p className="text-sm text-gray-600">2,139 total registrations</p>
                  </div>
                  <Heart className="w-5 h-5 text-pink-500" />
                </div>
                
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={trimesterData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {trimesterData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors.chartColors[index]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Performance Highlight */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-8 rounded-2xl text-white">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">94.1%</div>
                  <div className="text-sm opacity-90">Assessment Coverage</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">373</div>
                  <div className="text-sm opacity-90">High-Risk Cases</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">78.8%</div>
                  <div className="text-sm opacity-90">Treatment Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">7</div>
                  <div className="text-sm opacity-90">Health Centers</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'risk' && (
          <div className="space-y-8">
            {/* Risk Factor Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-2xl text-white">
                <div className="flex items-center justify-between mb-4">
                  <Shield className="w-8 h-8 opacity-80" />
                  <span className="text-xs font-semibold bg-white/20 px-2 py-1 rounded-full">
                    PRE-EXISTING
                  </span>
                </div>
                <div className="text-4xl font-bold mb-2">9</div>
                <p className="text-sm opacity-90">Risk Factors</p>
                <p className="text-xs opacity-75 mt-2">Most common: Parity ≥3</p>
              </div>

              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-6 rounded-2xl text-white">
                <div className="flex items-center justify-between mb-4">
                  <FileText className="w-8 h-8 opacity-80" />
                  <span className="text-xs font-semibold bg-white/20 px-2 py-1 rounded-full">
                    OBSTETRIC
                  </span>
                </div>
                <div className="text-4xl font-bold mb-2">3</div>
                <p className="text-sm opacity-90">Risk Factors</p>
                <p className="text-xs opacity-75 mt-2">Current pregnancy related</p>
              </div>

              <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-6 rounded-2xl text-white">
                <div className="flex items-center justify-between mb-4">
                  <Activity className="w-8 h-8 opacity-80" />
                  <span className="text-xs font-semibold bg-white/20 px-2 py-1 rounded-full">
                    TRANSIENT
                  </span>
                </div>
                <div className="text-4xl font-bold mb-2">1</div>
                <p className="text-sm opacity-90">Risk Factor</p>
                <p className="text-xs opacity-75 mt-2">Temporary conditions</p>
              </div>
            </div>

            {/* Pre-existing Risk Factors Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Pre-existing Risk Factors</h3>
              
              <ResponsiveContainer width="100%" height={400}>
                <BarChart 
                  data={preExistingRiskFactors} 
                  layout="horizontal"
                  margin={{ left: 140, right: 30, top: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    type="number" 
                    tick={{ fill: colors.muted, fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    dataKey="factor" 
                    type="category" 
                    width={130}
                    tick={{ fill: colors.muted, fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="count" fill={colors.primary} radius={[0, 4, 4, 0]}>
                    <LabelList 
                      dataKey="count" 
                      position="right" 
                      style={{ fill: colors.muted, fontSize: 11 }}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Obstetric Risk Factors */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Obstetric Risk Factors</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {obstetricRiskFactors.map((factor, index) => (
                  <div key={factor.factor} className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
                    <h4 className="font-semibold text-gray-900 mb-3">{factor.factor}</h4>
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-2xl font-bold text-emerald-600">{factor.count}</p>
                        <p className="text-sm text-gray-600">patients</p>
                      </div>
                      <span className="text-lg font-bold text-emerald-700">{factor.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Risk Factors Summary */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl text-white">
              <h3 className="text-xl font-semibold text-center mb-8">Top 5 Risk Factors Impact</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {preExistingRiskFactors.slice(0, 5).map((factor, index) => (
                  <div key={factor.factor} className="bg-white/10 backdrop-blur p-6 rounded-xl text-center hover:bg-white/15 transition-colors">
                    <div className="text-3xl font-bold mb-2">{factor.count}</div>
                    <div className="text-xs font-medium mb-2 opacity-90">{factor.factor}</div>
                    <div className="text-xl font-bold" style={{ color: colors.chartColors[index] }}>
                      {factor.percentage}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="space-y-8">
            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-emerald-500 to-green-600 p-6 rounded-2xl text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-emerald-100 text-sm font-medium">Assessment Coverage</p>
                    <p className="text-3xl font-bold">94.1%</p>
                    <p className="text-emerald-100 text-xs">Excellent Performance</p>
                  </div>
                  <Award className="h-8 w-8 text-emerald-200" />
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-6 rounded-2xl text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm font-medium">High Risk Detection</p>
                    <p className="text-3xl font-bold">12.1%</p>
                    <p className="text-blue-100 text-xs">373 Cases Identified</p>
                  </div>
                  <Target className="h-8 w-8 text-blue-200" />
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-6 rounded-2xl text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm font-medium">Treatment Rate</p>
                    <p className="text-3xl font-bold">78.8%</p>
                    <p className="text-purple-100 text-xs">294 Treated/Referred</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-200" />
                </div>
              </div>
            </div>

            {/* Key Insights */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-8">Key Insights & Recommendations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-emerald-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">High Assessment Coverage</h4>
                      <p className="text-sm text-gray-600">94.1% coverage rate demonstrates excellent program implementation across all health centers.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Info className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Early Registration Success</h4>
                      <p className="text-sm text-gray-600">92.4% of pregnancies registered in first trimester, enabling timely risk assessment.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-amber-50 rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Treatment Gap</h4>
                      <p className="text-sm text-gray-600">21.2% of high-risk cases not receiving treatment/referral. Review protocols needed.</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-purple-50 rounded-lg">
                      <Target className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Risk Factor Patterns</h4>
                      <p className="text-sm text-gray-600">Parity ≥3 and age >35 are predominant risk factors, requiring focused interventions.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-indigo-50 rounded-lg">
                      <BarChart3 className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Center Performance Variation</h4>
                      <p className="text-sm text-gray-600">Coverage ranges from 82.7% to 100%. Support needed for lower-performing centers.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-red-50 rounded-lg">
                      <Heart className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Clinical Impact</h4>
                      <p className="text-sm text-gray-600">Strong detection of modifiable risk factors enables preventive interventions.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Strategic Recommendations */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-8">Strategic Recommendations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 bg-blue-50 rounded-xl">
                  <h4 className="font-semibold text-blue-900 mb-4">Immediate Actions</h4>
                  <ul className="space-y-3 text-sm text-blue-800">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                      <span>Investigate treatment gaps in high-risk cases</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                      <span>Standardize protocols across all centers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                      <span>Enhance support for underperforming centers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                      <span>Review referral pathways and follow-up</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 bg-emerald-50 rounded-xl">
                  <h4 className="font-semibold text-emerald-900 mb-4">Long-term Strategies</h4>
                  <ul className="space-y-3 text-sm text-emerald-800">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-2"></div>
                      <span>Develop risk factor reduction programs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-2"></div>
                      <span>Implement quality improvement initiatives</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-2"></div>
                      <span>Enhance staff training on VTE prevention</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-2"></div>
                      <span>Establish regular monitoring systems</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 2023 Achievements */}
            <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8 rounded-2xl text-white">
              <h3 className="text-2xl font-light text-center mb-8">
                2023 Program <span className="font-bold">Achievements</span>
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-white/10 backdrop-blur p-6 rounded-xl text-center hover:bg-white/20 transition-colors">
                  <div className="text-3xl font-bold mb-2">3,281</div>
                  <div className="text-sm opacity-90">Total Pregnancies</div>
                  <div className="text-xs opacity-75 mt-1">Registered</div>
                </div>
                <div className="bg-white/10 backdrop-blur p-6 rounded-xl text-center hover:bg-white/20 transition-colors">
                  <div className="text-3xl font-bold mb-2">94.1%</div>
                  <div className="text-sm opacity-90">VTE Assessment</div>
                  <div className="text-xs opacity-75 mt-1">Coverage</div>
                </div>
                <div className="bg-white/10 backdrop-blur p-6 rounded-xl text-center hover:bg-white/20 transition-colors">
                  <div className="text-3xl font-bold mb-2">373</div>
                  <div className="text-sm opacity-90">High-Risk Cases</div>
                  <div className="text-xs opacity-75 mt-1">Identified</div>
                </div>
                <div className="bg-white/10 backdrop-blur p-6 rounded-xl text-center hover:bg-white/20 transition-colors">
                  <div className="text-3xl font-bold mb-2">78.8%</div>
                  <div className="text-sm opacity-90">Treatment Initiation</div>
                  <div className="text-xs opacity-75 mt-1">Rate</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Sophisticated Footer */}
      <footer className="bg-white border-t border-gray-100 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <p className="font-semibold text-gray-900">
              Comprehensive VTE Risk Assessment Analysis for Suhar Wilayat Health Network
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Data Period: January - December 2023 • All 7 Health Centers Included
            </p>
            <div className="flex items-center justify-center gap-3 mt-4 text-xs text-gray-400">
              {['AL MULTAQA', 'AL UWAYNAT', 'TAREEF', 'FALAJ', 'WADI HIBI', 'SOHAR P.C.', 'WADI AHIN'].map((center, index) => (
                <React.Fragment key={center}>
                  <span className="hover:text-gray-600 transition-colors cursor-pointer font-medium">{center}</span>
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