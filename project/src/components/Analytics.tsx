import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const Analytics: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const modalChartRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const contractCategories = React.useMemo(() => [
    { name: 'Standard Procurement', value: 847, color: '#3b82f6', description: 'Regular competitive contracts with standard terms' },
    { name: 'Set-Aside Awards', value: 312, color: '#10b981', description: 'Small business and socioeconomic set-aside contracts' },
    { name: 'Sole Source', value: 156, color: '#f59e0b', description: 'Single-source procurements with specific justification' },
    { name: 'Emergency/Urgent', value: 89, color: '#ef4444', description: 'Time-sensitive contracts requiring expedited processing' },
    { name: 'R&D/Innovation', value: 234, color: '#8b5cf6', description: 'Research, development, and innovative technology contracts' },
  ], []);

  const totalContracts = contractCategories.reduce((sum, cat) => sum + cat.value, 0);

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