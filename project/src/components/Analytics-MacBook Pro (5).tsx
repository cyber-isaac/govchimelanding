import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, MapPin, TrendingUp, Filter, Lock, Crown, Calendar, Building } from 'lucide-react';

const Analytics: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const modalChartRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isProUser, setIsProUser] = useState(false); // For demo purposes - would come from user context
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('12m');

  const contractCategories = React.useMemo(() => [
    { name: 'Standard Procurement', value: 847, color: '#3b82f6', description: 'Regular competitive contracts with standard terms' },
    { name: 'Set-Aside Awards', value: 312, color: '#10b981', description: 'Small business and socioeconomic set-aside contracts' },
    { name: 'Sole Source', value: 156, color: '#f59e0b', description: 'Single-source procurements with specific justification' },
    { name: 'Emergency/Urgent', value: 89, color: '#ef4444', description: 'Time-sensitive contracts requiring expedited processing' },
    { name: 'R&D/Innovation', value: 234, color: '#8b5cf6', description: 'Research, development, and innovative technology contracts' },
  ], []);

  const totalContracts = contractCategories.reduce((sum, cat) => sum + cat.value, 0);

  // Pro-only analytics data
  const stateData = React.useMemo(() => [
    { state: 'VA', contracts: 245, value: '$12.4B', color: '#3b82f6' },
    { state: 'TX', contracts: 189, value: '$8.7B', color: '#10b981' },
    { state: 'CA', contracts: 156, value: '$7.2B', color: '#f59e0b' },
    { state: 'NY', contracts: 134, value: '$6.1B', color: '#6366f1' },
    { state: 'FL', contracts: 98, value: '$4.3B', color: '#8b5cf6' },
    { state: 'MD', contracts: 87, value: '$4.9B', color: '#06b6d4' },
  ], []);

  const naicsData = React.useMemo(() => [
    { code: '541511', name: 'Custom Computer Programming', contracts: 89, value: '$2.1B', color: '#3b82f6' },
    { code: '541512', name: 'Computer Systems Design', contracts: 67, value: '$1.8B', color: '#10b981' },
    { code: '541330', name: 'Engineering Services', contracts: 54, value: '$3.2B', color: '#f59e0b' },
    { code: '541611', name: 'Management Consulting', contracts: 43, value: '$1.5B', color: '#6366f1' },
    { code: '541519', name: 'Other Computer Related', contracts: 38, value: '$950M', color: '#8b5cf6' },
  ], []);

  const timeSeriesData = React.useMemo(() => [
    { month: 'Jan', value: 245000000, contracts: 45 },
    { month: 'Feb', value: 289000000, contracts: 52 },
    { month: 'Mar', value: 312000000, contracts: 58 },
    { month: 'Apr', value: 278000000, contracts: 49 },
    { month: 'May', value: 345000000, contracts: 61 },
    { month: 'Jun', value: 389000000, contracts: 67 },
    { month: 'Jul', value: 412000000, contracts: 72 },
    { month: 'Aug', value: 367000000, contracts: 63 },
    { month: 'Sep', value: 398000000, contracts: 69 },
    { month: 'Oct', value: 423000000, contracts: 74 },
    { month: 'Nov', value: 445000000, contracts: 78 },
    { month: 'Dec', value: 467000000, contracts: 82 },
  ], []);

  const drawChart = React.useCallback((canvas: HTMLCanvasElement, isModal = false, hovered: string | null = null, selected: string | null = null) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    // Set canvas size for high DPI displays
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    
    // Clear canvas with gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, rect.height);
    gradient.addColorStop(0, 'rgba(30, 41, 59, 0.8)');
    gradient.addColorStop(1, 'rgba(15, 23, 42, 0.9)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);
    
    const padding = isModal ? 60 : 40;
    const chartWidth = rect.width - 2 * padding;
    const chartHeight = rect.height - 2 * padding;
    const barWidth = chartWidth / contractCategories.length;
    const maxValue = Math.max(...contractCategories.map(cat => cat.value));
    
    // Draw grid lines
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.2)';
    ctx.lineWidth = 1;
    const gridLines = 5;
    for (let i = 0; i <= gridLines; i++) {
      const y = padding + (i * chartHeight) / gridLines;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(rect.width - padding, y);
      ctx.stroke();
      
      // Y-axis labels
      const value = Math.round(maxValue - (i * maxValue) / gridLines);
      ctx.fillStyle = '#94a3b8';
      ctx.font = `${isModal ? '12px' : '10px'} Inter`;
      ctx.textAlign = 'right';
      ctx.fillText(value.toString(), padding - 10, y + 4);
    }
    
    // Draw X-axis
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, rect.height - padding);
    ctx.lineTo(rect.width - padding, rect.height - padding);
    ctx.stroke();
    
    // Draw Y-axis
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, rect.height - padding);
    ctx.stroke();

    contractCategories.forEach((category, index) => {
      const barHeight = (category.value / maxValue) * chartHeight;
      const x = padding + index * barWidth;
      const y = rect.height - padding - barHeight;
      const actualBarWidth = barWidth - (isModal ? 20 : 16);
      const barX = x + (isModal ? 10 : 8);
      
      // Determine bar color and effects based on state
      let fillColor = category.color;
      let shadowBlur = isModal ? 8 : 4;
      let shadowColor = category.color + '40';
      
      if (hovered === category.name) {
        fillColor = category.color;
        shadowBlur = isModal ? 12 : 6;
        shadowColor = category.color + '60';
      }
      if (selected === category.name) {
        fillColor = category.color;
        shadowBlur = isModal ? 15 : 8;
        shadowColor = category.color + '80';
      } else if (selected && selected !== category.name) {
        fillColor = category.color + '60';
        shadowBlur = isModal ? 4 : 2;
        shadowColor = category.color + '20';
      }
      
      // Create gradient for bar
      const barGradient = ctx.createLinearGradient(barX, y, barX, y + barHeight);
      barGradient.addColorStop(0, fillColor);
      barGradient.addColorStop(1, category.color + 'CC');
      
      // Draw shadow
      ctx.shadowColor = shadowColor;
      ctx.shadowBlur = shadowBlur;
      ctx.shadowOffsetY = isModal ? 4 : 2;
      
      // Draw rounded rectangle bar
      const radius = isModal ? 8 : 6;
      ctx.fillStyle = barGradient;
      ctx.beginPath();
      ctx.roundRect(barX, y, actualBarWidth, barHeight, [radius, radius, 0, 0]);
      ctx.fill();
      
      // Reset shadow
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetY = 0;
      
      // Draw value label on top of bar with background
      const labelY = y - (isModal ? 15 : 10);
      const labelText = category.value.toString();
      ctx.font = `${isModal ? '14px' : '12px'} Inter`;
      ctx.textAlign = 'center';
      
      // Label background
      const textMetrics = ctx.measureText(labelText);
      const labelPadding = isModal ? 6 : 4;
      const labelBgX = barX + actualBarWidth / 2 - textMetrics.width / 2 - labelPadding;
      const labelBgY = labelY - (isModal ? 16 : 14);
      const labelBgWidth = textMetrics.width + labelPadding * 2;
      const labelBgHeight = isModal ? 20 : 16;
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.beginPath();
      ctx.roundRect(labelBgX, labelBgY, labelBgWidth, labelBgHeight, 4);
      ctx.fill();
      
      // Label text
      ctx.fillStyle = '#e5e7eb';
      ctx.fillText(labelText, barX + actualBarWidth / 2, labelY);
      
      // Draw category label at bottom with rotation
      ctx.fillStyle = '#9ca3af';
      ctx.font = `${isModal ? '12px' : '10px'} Inter`;
      ctx.save();
      ctx.translate(barX + actualBarWidth / 2, rect.height - (isModal ? 15 : 10));
      ctx.rotate(-Math.PI / 6);
      ctx.textAlign = 'right';
      ctx.fillText(category.name, 0, 0);
      ctx.restore();
    });
    
    // Add chart title
    if (isModal) {
      ctx.fillStyle = '#60a5fa';
      ctx.font = 'bold 18px Plus Jakarta Sans, Inter';
      ctx.textAlign = 'center';
      ctx.fillText('Contract Categories Analysis', rect.width / 2, 30);
    }
  }, [contractCategories]);
  
  const requestChartRedraw = React.useCallback((hovered = hoveredCategory, selected = selectedCategory) => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    animationFrameRef.current = requestAnimationFrame(() => {
      if (chartRef.current) {
        drawChart(chartRef.current, false, hovered, selected);
      }
    });
  }, [hoveredCategory, selectedCategory, drawChart]);

  useEffect(() => {
    requestChartRedraw();
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [requestChartRedraw]);
  
  useEffect(() => {
    requestChartRedraw();
  }, [selectedCategory, requestChartRedraw]);
  
  useEffect(() => {
    if (modalChartRef.current && showModal) {
      drawChart(modalChartRef.current, true, hoveredCategory, selectedCategory);
    }
  }, [showModal, hoveredCategory, selectedCategory, drawChart]);

  useEffect(() => {
    const canvas = chartRef.current;
    if (!canvas) return;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      
      const barWidth = (rect.width - 80) / contractCategories.length;
      const categoryIndex = Math.floor((x - 40) / barWidth);
      
      if (categoryIndex >= 0 && categoryIndex < contractCategories.length) {
        const category = contractCategories[categoryIndex];
        const barX = 40 + categoryIndex * barWidth;
        
        if (x >= barX + 8 && x <= barX + barWidth - 8) {
          if (hoveredCategory !== category.name) {
            setHoveredCategory(category.name);
            requestChartRedraw(category.name, selectedCategory);
          }
          canvas.style.cursor = 'pointer';
        } else {
          if (hoveredCategory !== null) {
            setHoveredCategory(null);
            requestChartRedraw(null, selectedCategory);
          }
          canvas.style.cursor = 'default';
        }
      } else {
        if (hoveredCategory !== null) {
          setHoveredCategory(null);
          requestChartRedraw(null, selectedCategory);
        }
        canvas.style.cursor = 'default';
      }
    };

    const handleClick = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      
      const barWidth = (rect.width - 80) / contractCategories.length;
      const categoryIndex = Math.floor((x - 40) / barWidth);
      
      if (categoryIndex >= 0 && categoryIndex < contractCategories.length) {
        const category = contractCategories[categoryIndex];
        const barX = 40 + categoryIndex * barWidth;
        
        if (x >= barX + 8 && x <= barX + barWidth - 8) {
          setSelectedCategory(selectedCategory === category.name ? null : category.name);
        }
      }
    };
    
    const handleDoubleClick = () => {
      setShowModal(true);
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);
    canvas.addEventListener('dblclick', handleDoubleClick);
    canvas.addEventListener('mouseleave', () => {
      if (hoveredCategory !== null) {
        setHoveredCategory(null);
        requestChartRedraw(null, selectedCategory);
      }
      canvas.style.cursor = 'default';
    });

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleClick);
      canvas.removeEventListener('dblclick', handleDoubleClick);
    };
  }, [selectedCategory, contractCategories, hoveredCategory, requestChartRedraw]);

  return (
    <section id="analytics" className="py-16 px-4">
      <div className="max-w-7xl mx-auto">



        {/* Pro Plan Content */}
        */}
          <>


              {/* Contract Awards by State */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="w-6 h-6 text-blue-600" />
                  <h3 className="text-xl font-bold text-black">Contract Awards by State</h3>
                </div>

                <div className="space-y-4">
                  {stateData.map((state, index) => (
                    <div key={state.state} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: state.color }}
                        />
                        <span className="font-semibold text-black">{state.state}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-black">{state.contracts}</div>
                        <div className="text-sm text-gray-600">{state.value}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-600">
                    Interactive map view available in full dashboard
                  </div>
                </div>
              </motion.div>

              {/* Contract Awards by Category/NAICS */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                  <h3 className="text-xl font-bold text-black">Contract Awards by Category</h3>
                </div>

                <div className="space-y-4">
                  {naicsData.map((naics, index) => (
                    <div key={naics.code} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: naics.color }}
                          />
                          <span className="font-semibold text-black">{naics.code}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-black">{naics.contracts}</div>
                          <div className="text-sm text-gray-600">{naics.value}</div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-700 ml-7">{naics.name}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-600">
                    Custom category views and drill-down available
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Contract Value Over Time */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-bold text-black">Contract Value Over Time</h3>
              </div>

              {/* Simple Bar Chart Representation */}
              <div className="h-64 flex items-end justify-between gap-2">
                {timeSeriesData.map((data, index) => {
                  const maxValue = Math.max(...timeSeriesData.map(d => d.value));
                  const height = (data.value / maxValue) * 200;

                  return (
                    <div key={data.month} className="flex flex-col items-center gap-2 flex-1">
                      <div
                        className="bg-blue-600 rounded-t w-full transition-all hover:bg-blue-700"
                        style={{ height: `${height}px` }}
                      />
                      <span className="text-xs font-medium text-gray-600">{data.month}</span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Timeframe: {selectedTimeframe === '12m' ? 'Last 12 Months' : selectedTimeframe === '6m' ? 'Last 6 Months' : 'Last 3 Months'}</span>
                  <span>Interactive chart with zoom and export features</span>
                </div>
              </div>
            </motion.div>

            {/* Additional Pro Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 text-center"
              >
                <Building className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h4 className="text-lg font-bold text-black mb-2">Geographic Breakdown</h4>
                <p className="text-gray-600 text-sm">Interactive maps showing contract distribution by state and region</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 text-center"
              >
                <BarChart3 className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h4 className="text-lg font-bold text-black mb-2">Custom Dashboards</h4>
                <p className="text-gray-600 text-sm">Build personalized views with saved filters and custom report layouts</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 text-center"
              >
                <Calendar className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h4 className="text-lg font-bold text-black mb-2">Time-Series Analytics</h4>
                <p className="text-gray-600 text-sm">Track contract trends over time with advanced date filtering</p>
              </motion.div>
            </div>
          </>
        )}


        {/* Modal for Expanded Chart */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="bg-gray-950 border border-white/10 rounded-2xl max-w-5xl w-full m-4 p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold text-blue-300" style={{ fontFamily: "'Plus Jakarta Sans', Inter, sans-serif" }}>
                  Contract Categories Analysis
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-white transition-colors text-2xl"
                >
                  ×
                </button>
              </div>
              
              <canvas 
                ref={modalChartRef}
                className="w-full h-96 rounded-xl border border-white/10 shadow-2xl mb-6"
                style={{ background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)' }}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {contractCategories.map((category) => (
                  <div 
                    key={category.name} 
                    className="p-4 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
                    onClick={() => setSelectedCategory(selectedCategory === category.name ? null : category.name)}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div 
                        className="w-4 h-4 rounded-full shadow-lg"
                        style={{ backgroundColor: category.color }}
                      ></div>
                      <h4 className="text-white font-semibold">{category.name}</h4>
                    </div>
                    <p className="text-gray-300 text-sm mb-3">{category.description}</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-400">Contracts:</span>
                        <div className="text-white font-semibold">{category.value.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Share:</span>
                        <div className="text-white font-semibold">
                          {((category.value / totalContracts) * 100).toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Interactive Contract Categories Chart */}
          <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
            <h3 className="text-lg font-semibold text-blue-300 mb-4">Contract Categories</h3>
            <canvas 
              ref={chartRef}
              className="w-full h-80 rounded-xl border border-white/10 shadow-2xl"
              style={{ background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)' }}
            />
            <p className="text-xs text-gray-400 mt-3 text-center">
              Click bars for details • Double-click to expand • Hover for preview
            </p>
          </div>

          {/* Category Details */}
          <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
            <h3 className="text-lg font-semibold text-blue-300 mb-4">
              {selectedCategory || hoveredCategory ? 'Category Details' : 'Procurement Overview'}
            </h3>
            
            {(selectedCategory || hoveredCategory) ? (
              <div className="space-y-4">
                {contractCategories
                  .filter(cat => cat.name === (selectedCategory || hoveredCategory))
                  .map(category => (
                    <div key={category.name} className="p-4 rounded-lg border border-white/10 bg-white/5">
                      <div className="flex items-center gap-3 mb-3">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: category.color }}
                        ></div>
                        <h4 className="text-white font-semibold">{category.name}</h4>
                      </div>
                      <p className="text-gray-300 text-sm mb-3">{category.description}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Total Contracts:</span>
                          <div className="text-white font-semibold">{category.value.toLocaleString()}</div>
                        </div>
                        <div>
                          <span className="text-gray-400">Percentage:</span>
                          <div className="text-white font-semibold">
                            {((category.value / totalContracts) * 100).toFixed(1)}%
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="space-y-4">
                {contractCategories.map((category) => (
                  <motion.div 
                    key={category.name} 
                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center justify-between p-3 rounded-lg border border-white/10 bg-white/5 transition-all cursor-pointer"
                       onClick={() => setSelectedCategory(category.name)}>
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: category.color }}
                      ></div>
                      <span className="text-gray-300 text-sm">{category.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-semibold">{category.value.toLocaleString()}</div>
                      <div className="text-xs text-gray-400">
                        {((category.value / totalContracts) * 100).toFixed(1)}%
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
            </div>
          </div>

        {/* Key Metrics */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <motion.div whileHover={{ scale: 1.05, y: -5 }} transition={{ duration: 0.2 }} className="bg-white/5 rounded-xl border border-white/10 p-6 text-center">
            <div className="text-2xl font-bold text-blue-300 mb-2">${totalContracts.toLocaleString()}</div>
            <div className="text-gray-400 text-sm">Total Contracts</div>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05, y: -5 }} transition={{ duration: 0.2 }} className="bg-white/5 rounded-xl border border-white/10 p-6 text-center">
            <div className="text-2xl font-bold text-green-300 mb-2">$2.4B</div>
            <div className="text-gray-400 text-sm">Total Contract Value</div>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05, y: -5 }} transition={{ duration: 0.2 }} className="bg-white/5 rounded-xl border border-white/10 p-6 text-center">
            <div className="text-2xl font-bold text-purple-300 mb-2">89%</div>
            <div className="text-gray-400 text-sm">On-Time Completion</div>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05, y: -5 }} transition={{ duration: 0.2 }} className="bg-white/5 rounded-xl border border-white/10 p-6 text-center">
            <div className="text-2xl font-bold text-teal-300 mb-2">456</div>
            <div className="text-gray-400 text-sm">Unique Vendors</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Analytics;