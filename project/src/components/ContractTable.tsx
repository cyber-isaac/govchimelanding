import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Contract } from '../types';

interface ContractTableProps {
  contracts: Contract[];
  onRowClick: (contract: Contract) => void;
  onEntitySelect: (entityId: string) => void;
}

const ContractTable: React.FC<ContractTableProps> = ({ contracts, onRowClick, onEntitySelect }) => {
  const [sortField, setSortField] = useState<keyof Contract>('awardDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSort = (field: keyof Contract) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedContracts = [...contracts].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    return 0;
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs border";
    
    switch (status.toLowerCase()) {
      case 'active':
        return `${baseClasses} bg-emerald-400/10 text-emerald-300 border-emerald-400/20`;
      case 'completed':
        return `${baseClasses} bg-blue-400/10 text-blue-300 border-blue-400/20`;
      case 'pending':
        return `${baseClasses} bg-amber-400/10 text-amber-300 border-amber-400/20`;
      case 'cancelled':
        return `${baseClasses} bg-red-400/10 text-red-300 border-red-400/20`;
      default:
        return `${baseClasses} bg-gray-400/10 text-gray-300 border-gray-400/20`;
    }
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="relative w-full max-w-7xl mx-auto mt-8 px-4"
    >
      <motion.div 
        whileHover={{ scale: 1.005 }}
        transition={{ duration: 0.3 }}
        className="overflow-x-auto bg-white/5 rounded-2xl border border-white/10 shadow-2xl hover:shadow-3xl"
      >
        <table className="min-w-full text-left">
          <thead>
            <tr className="text-xs uppercase tracking-wider text-blue-300/90 bg-gray-950">
              <th 
                className="px-6 py-4 cursor-pointer hover:text-blue-300 transition-all duration-200 hover:scale-105"
                onClick={() => handleSort('awardDate')}
              >
                Award Date {sortField === 'awardDate' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="px-6 py-4 cursor-pointer hover:text-blue-300 transition-all duration-200 hover:scale-105"
                onClick={() => handleSort('contractNumber')}
              >
                Contract # {sortField === 'contractNumber' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="px-6 py-4 cursor-pointer hover:text-blue-300 transition-all duration-200 hover:scale-105"
                onClick={() => handleSort('amount')}
              >
                Amount {sortField === 'amount' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="px-6 py-4 cursor-pointer hover:text-blue-300 transition-all duration-200 hover:scale-105"
                onClick={() => handleSort('awardee')}
              >
                Awardee {sortField === 'awardee' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th className="px-6 py-4">UEI SAM</th>
              <th className="px-6 py-4">CAGE Code</th>
              <th 
                className="px-6 py-4 cursor-pointer hover:text-blue-300 transition-all duration-200 hover:scale-105"
                onClick={() => handleSort('status')}
              >
                Status {sortField === 'status' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedContracts.map((contract) => (
              <motion.tr
                whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.05)', scale: 1.005 }}
                whileTap={{ scale: 0.998 }}
                transition={{ duration: 0.2 }}
                key={contract.id}
                className="border-b border-white/10 transition-all duration-200 cursor-pointer hover:shadow-lg"
                onClick={() => onRowClick(contract)}
              >
                <td className="px-6 py-4 text-gray-100">
                  {new Date(contract.awardDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <span className="apple-link cursor-pointer text-blue-300 transition-all duration-200 hover:scale-105">
                    {contract.contractNumber}
                  </span>
                </td>
                <td className="px-6 py-4 text-green-300 font-semibold">
                  {formatAmount(contract.amount)}
                </td>
                <td 
                  className="px-6 py-4 text-gray-100 hover:text-blue-300 transition-all duration-200 cursor-pointer hover:scale-105"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEntitySelect(contract.entityId);
                  }}
                >
                  {contract.awardee}
                </td>
                <td className="px-6 py-4">
                  <span
                    className="cursor-pointer hover:text-blue-300 transition-all duration-200 hover:scale-105"
                    title="Click to copy"
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(contract.ueiSam);
                    }}
                  >
                    {contract.ueiSam}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className="cursor-pointer hover:text-blue-300 transition-all duration-200 hover:scale-105"
                    title="Click to copy"
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(contract.cageCode);
                    }}
                  >
                    {contract.cageCode}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={getStatusBadge(contract.status)}>
                    {contract.status}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </motion.section>
  );
};

export default ContractTable;