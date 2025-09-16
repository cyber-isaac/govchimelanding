import React from 'react';
import { Entity } from '../types';

interface EntityProfileProps {
  entity: Entity | null;
  onContractClick: (contractId: string) => void;
}

const EntityProfile: React.FC<EntityProfileProps> = ({ entity, onContractClick }) => {
  if (!entity) {
    return null;
  }

  return (
    <div className="mt-8">
      <aside className="p-6 rounded-xl border border-white/10 bg-black/70 shadow-lg max-w-md mx-auto">
        <h3 className="text-xl tracking-tight mb-2 font-semibold" style={{ fontFamily: "'Plus Jakarta Sans', Inter, sans-serif" }}>
          Entity Overview
        </h3>
        <div className="text-gray-300 text-sm mb-1">Name: {entity.name}</div>
        <div className="text-gray-400 text-xs">
          UEI SAM: {entity.ueiSam} | CAGE: {entity.cageCode}
        </div>
        <div className="text-gray-400 text-xs mt-1">
          Location: {entity.location}
        </div>
        <div className="text-gray-400 text-xs mt-1">
          Industry: {entity.industry}
        </div>
        
        <div className="mt-4">
          <span className="text-blue-300 text-xs">
            Active Awards ({entity.activeContracts.length})
          </span>
          <ul className="list-disc pl-6 mt-1 text-sm text-gray-100">
            {entity.activeContracts.map((contractId) => (
              <li key={contractId}>
                <span
                  className="hover:underline cursor-pointer text-blue-300"
                  onClick={() => onContractClick(contractId)}
                >
                  Contract {contractId}
                </span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400 text-xs">Total Value</span>
              <div className="text-green-300 font-semibold">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  notation: 'compact',
                  maximumFractionDigits: 1,
                }).format(entity.totalContractValue)}
              </div>
            </div>
            <div>
              <span className="text-gray-400 text-xs">Risk Score</span>
              <div className={`font-semibold ${
                entity.riskScore < 3 ? 'text-green-300' :
                entity.riskScore < 7 ? 'text-amber-300' : 'text-red-300'
              }`}>
                {entity.riskScore}/10
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default EntityProfile;