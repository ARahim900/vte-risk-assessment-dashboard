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
              {entry.name.includes('percentage') || entry.name.includes('coverage') ? '%' : ''}
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
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-indigo-100 text-sm font-medium">Total Pregnancies</p>
                    <p className="text-2xl font-bold">3,281</p>
                  </div>
                  <Users className="h-8 w-8 text-indigo-200" />
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-emerald-100 text-sm font-medium">VTE Assessments</p>
                    <p className="text-2xl font-bold">3,086</p>
                    <p className="text-emerald-100 text-xs">94.1% Coverage</p>
                  </div>
                  <Shield className="h-8 w-8 text-emerald-200" />
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-amber-100 text-sm font-medium">High Risk Cases</p>
                    <p className="text-2xl font-bold">373</p>
                    <p className="text-amber-100 text-xs">12.1% of Assessed</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-amber-200" />
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm font-medium">Referrals/Prescriptions</p>
                    <p className="text-2xl font-bold">294</p>
                    <p className="text-blue-100 text-xs">78.8% Treatment Rate</p>
                  </div>
                  <Heart className="h-8 w-8 text-blue-200" />
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Health Center Contributions */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Health Center Contributions</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={healthCenterData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fontSize: 12 }}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis 
                      label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft' }}
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="percentage" fill={colors.primary} radius={[4, 4, 0, 0]}>
                      <LabelList dataKey="percentage" position="top" fontSize={12} formatter={(value) => `${value}%`} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Assessment Coverage */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Assessment Coverage by Center</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={coverageByCenter}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fontSize: 12 }}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis 
                      label={{ value: 'Coverage (%)', angle: -90, position: 'insideLeft' }}
                      tick={{ fontSize: 12 }}
                      domain={[75, 100]}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="coverage" fill={colors.success} radius={[4, 4, 0, 0]}>
                      <LabelList dataKey="coverage" position="top" fontSize={12} formatter={(value) => `${value}%`} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Pregnancy Registration by Trimester */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Pregnancy Registration by Trimester</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={trimesterData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {trimesterData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors.chartColors[index % colors.chartColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* VTE Risk Score Distribution */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">VTE Risk Score Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={riskScoreDistribution}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fontSize: 12 }}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis 
                      label={{ value: 'Number of Cases', angle: -90, position: 'insideLeft' }}
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="score2" stackId="a" fill={colors.info} name="Score 2" />
                    <Bar dataKey="score3" stackId="a" fill={colors.warning} name="Score 3" />
                    <Bar dataKey="score4" stackId="a" fill={colors.danger} name="Score 4+" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'risk' && (
          <div className="space-y-8">
            {/* Pre-existing Risk Factors */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Pre-existing Risk Factors</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Risk Factor</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-900">Count</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-900">Percentage</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-900">Visual</th>
                    </tr>
                  </thead>
                  <tbody>
                    {preExistingRiskFactors.map((factor, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-gray-900">{factor.factor}</td>
                        <td className="py-3 px-4 text-right font-medium">{factor.count}</td>
                        <td className="py-3 px-4 text-right">{factor.percentage}%</td>
                        <td className="py-3 px-4 text-right">
                          <div className="w-16 bg-gray-200 rounded-full h-2 ml-auto">
                            <div 
                              className="bg-indigo-500 h-2 rounded-full" 
                              style={{ width: `${(factor.percentage / 30) * 100}%` }}
                            ></div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Obstetric Risk Factors */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Obstetric Risk Factors</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {obstetricRiskFactors.map((factor, index) => (
                  <div key={index} className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-6 text-white">
                    <h4 className="font-medium text-purple-100 text-sm mb-2">{factor.factor}</h4>
                    <p className="text-2xl font-bold">{factor.count}</p>
                    <p className="text-purple-100 text-sm">{factor.percentage}% of assessments</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Risk Factor Chart */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Risk Factors Distribution</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={preExistingRiskFactors.slice(0, 6)} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    type="number" 
                    label={{ value: 'Number of Cases', position: 'insideBottom', offset: -5 }}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    type="category" 
                    dataKey="factor" 
                    width={150}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="count" fill={colors.secondary} radius={[0, 4, 4, 0]}>
                    <LabelList dataKey="count" position="right" fontSize={12} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="space-y-8">
            {/* Performance Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm font-medium">Assessment Coverage</p>
                    <p className="text-3xl font-bold">94.1%</p>
                    <p className="text-green-100 text-xs">Excellent Performance</p>
                  </div>
                  <Award className="h-8 w-8 text-green-200" />
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm font-medium">High Risk Detection</p>
                    <p className="text-3xl font-bold">12.1%</p>
                    <p className="text-blue-100 text-xs">373 Cases Identified</p>
                  </div>
                  <Target className="h-8 w-8 text-blue-200" />
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-6 text-white">
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
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Key Insights & Recommendations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900">High Assessment Coverage</h4>
                      <p className="text-sm text-gray-600">94.1% coverage rate demonstrates excellent program implementation across all health centers.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900">Early Registration Success</h4>
                      <p className="text-sm text-gray-600">92.4% of pregnancies registered in first trimester, enabling timely risk assessment.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900">Treatment Gap</h4>
                      <p className="text-sm text-gray-600">21.2% of high-risk cases not receiving treatment/referral. Review protocols needed.</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Target className="h-5 w-5 text-purple-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900">Risk Factor Patterns</h4>
                      <p className="text-sm text-gray-600">Parity ≥3 and age >35 are predominant risk factors, requiring focused interventions.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <BarChart3 className="h-5 w-5 text-indigo-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900">Center Performance Variation</h4>
                      <p className="text-sm text-gray-600">Coverage ranges from 82.7% to 100%. Support needed for lower-performing centers.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Heart className="h-5 w-5 text-red-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900">Clinical Impact</h4>
                      <p className="text-sm text-gray-600">Strong detection of modifiable risk factors enables preventive interventions.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Strategic Recommendations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">Immediate Actions</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Investigate treatment gaps in high-risk cases</li>
                    <li>• Standardize protocols across all centers</li>
                    <li>• Enhance support for underperforming centers</li>
                    <li>• Review referral pathways and follow-up</li>
                  </ul>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-medium text-green-900 mb-2">Long-term Strategies</h4>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• Develop risk factor reduction programs</li>
                    <li>• Implement quality improvement initiatives</li>
                    <li>• Enhance staff training on VTE prevention</li>
                    <li>• Establish regular monitoring systems</li>
                  </ul>
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