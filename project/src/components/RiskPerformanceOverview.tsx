import React, { useEffect, useRef } from 'react';
import { Entity } from '../types';

interface RiskPerformanceOverviewProps {
  entity: Entity;
}

const RiskPerformanceOverview: React.FC<RiskPerformanceOverviewProps> = ({ entity }) => {
  const awardsTrendRef = useRef<HTMLCanvasElement>(null);
  const setAsidesRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Awards Trend Chart
    if (awardsTrendRef.current) {
      const ctx = awardsTrendRef.current.getContext('2d');
      if (ctx) {
        // Clear canvas
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        
        // Simple trend line visualization
        const width = ctx.canvas.width;
        const height = ctx.canvas.height;
        const padding = 20;
        
        // Sample data points for 12 months
        const dataPoints = [2, 1, 3, 2, 4, 3, 5, 2, 3, 4, 3, 2];
        const maxValue = Math.max(...dataPoints);
        
        ctx.strokeStyle = '#60a5fa';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        dataPoints.forEach((value, index) => {
          const x = padding + (index * (width - 2 * padding)) / (dataPoints.length - 1);
          const y = height - padding - ((value / maxValue) * (height - 2 * padding));
          
          if (index === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        });
        
        ctx.stroke();
        
        // Add dots
        ctx.fillStyle = '#60a5fa';
        dataPoints.forEach((value, index) => {
          const x = padding + (index * (width - 2 * padding)) / (dataPoints.length - 1);
          const y = height - padding - ((value / maxValue) * (height - 2 * padding));
          
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, 2 * Math.PI);
          ctx.fill();
        });
      }
    }

    // Set-Asides Pie Chart
    if (setAsidesRef.current) {
      const ctx = setAsidesRef.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        
        const centerX = ctx.canvas.width / 2;
        const centerY = ctx.canvas.height / 2;
        const radius = Math.min(centerX, centerY) - 10;
        
        const data = [
          { label: 'SDVOSB', value: 12, color: '#10b981' },
          { label: 'WOSB', value: 7, color: '#3b82f6' },
          { label: 'HUBZone', value: 6, color: '#8b5cf6' },
          { label: '8(a)', value: 3, color: '#f59e0b' },
        ];
        
        const total = data.reduce((sum, item) => sum + item.value, 0);
        let currentAngle = -Math.PI / 2;
        
        data.forEach((item) => {
          const sliceAngle = (item.value / total) * 2 * Math.PI;
          
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
          ctx.closePath();
          ctx.fillStyle = item.color;
          ctx.fill();
          
          currentAngle += sliceAngle;
        });
      }
    }
  }, [entity]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getPerformanceBadges = () => {
    const badges = [];
    
    // Top performer badge
    if (entity.totalContractValue > 2000000) {
      badges.push({
        text: 'Top 5% Awards, Region VI',
        className: 'rounded-md bg-blue-400/10 text-blue-300 px-3 py-1 text-xs border border-blue-400/25'
      });
    }
    
    // Low risk badge
    if (entity.riskScore <= 3) {
      badges.push({
        text: 'Low Volatility',
        className: 'rounded-md bg-emerald-400/10 text-emerald-300 px-3 py-1 text-xs border border-emerald-400/25'
      });
    }
    
    // Set-aside performance
    badges.push({
      text: 'Above Avg. Set-Asides',
      className: 'rounded-md bg-amber-400/10 text-amber-300 px-3 py-1 text-xs border border-amber-400/25'
    });
    
    return badges;
  };

  const calculateAverageContractValue = () => {
    const totalContracts = 28; // This would come from actual data
    return entity.totalContractValue / totalContracts;
  };

  const getPeerAverage = () => {
    return 680000; // This would come from comparative dataset
  };

  return (
    <section className="mt-10 rounded-2xl bg-white/5 border border-white/10 p-6 shadow-2xl max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left Column: Key Stats and Rankings */}
      <div>
        <h3 className="text-lg font-semibold text-blue-300 tracking-tight mb-4 risk-performance-heading">
          Risk & Performance Overview
        </h3>
        <ul className="space-y-3 text-gray-100 text-sm">
          <li className="flex justify-between items-center">
            <span><b>Total Contracts Won:</b></span>
            <span className="text-green-300 font-semibold">28</span>
          </li>
          <li>
            <div><b>Set-Asides Awarded:</b></div>
            <div className="text-xs text-gray-300 mt-1 pl-4">
              SDVOSB (12), WOSB (7), 8(a) (3), HUBZone (6)
            </div>
          </li>
          <li className="flex justify-between items-start">
            <span><b>Average Contract Value:</b></span>
            <div className="text-right">
              <div className="text-green-300 font-semibold">{formatCurrency(calculateAverageContractValue())}</div>
              <div className="text-xs text-gray-400">
                vs. peer avg: {formatCurrency(getPeerAverage())}
              </div>
            </div>
          </li>
          <li className="flex justify-between items-center">
            <span><b>Contract Cancellations:</b></span>
            <div className="text-right">
              <span className="text-gray-100">1</span>
              <span className="text-green-300 text-xs ml-2">Low</span>
            </div>
          </li>
          <li className="flex justify-between items-center">
            <span><b>Modifications:</b></span>
            <div className="text-right">
              <span className="text-gray-100">5</span>
              <span className="text-xs text-gray-400 ml-2">(18% of awards)</span>
            </div>
          </li>
          <li className="flex justify-between items-center">
            <span><b>Performance Score:</b></span>
            <div className="text-right">
              <span className={`font-semibold ${
                entity.riskScore <= 3 ? 'text-green-300' :
                entity.riskScore <= 6 ? 'text-amber-300' : 'text-red-300'
              }`}>
                {10 - entity.riskScore}/10
              </span>
            </div>
          </li>
        </ul>
        
        <div className="mt-6 flex flex-wrap gap-2">
          {getPerformanceBadges().map((badge, index) => (
            <span key={index} className={badge.className}>
              {badge.text}
            </span>
          ))}
        </div>
      </div>

      {/* Right Column: Visualizations */}
      <div className="flex flex-col gap-4">
        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-2">12-Month Awards Trend</h4>
          <canvas 
            ref={awardsTrendRef}
            width="300" 
            height="96"
            className="rounded-lg border border-white/10 bg-black w-full h-24"
          />
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-2">Set-Aside Distribution</h4>
          <div className="flex items-center gap-4">
            <canvas 
              ref={setAsidesRef}
              width="96" 
              height="96"
              className="rounded-lg border border-white/10 bg-black h-24 w-24 flex-shrink-0"
            />
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span className="text-gray-300">SDVOSB (12)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-300">WOSB (7)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-300">HUBZone (6)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                  <span className="text-gray-300">8(a) (3)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-2 p-3 bg-white/5 rounded-lg border border-white/10">
          <h5 className="text-xs font-medium text-blue-300 mb-2">Key Insights</h5>
          <ul className="text-xs text-gray-400 space-y-1">
            <li>• Consistent award performance over 12 months</li>
            <li>• Strong SDVOSB set-aside participation</li>
            <li>• Above-average contract retention rate</li>
            <li>• Low modification frequency indicates good planning</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default RiskPerformanceOverview;