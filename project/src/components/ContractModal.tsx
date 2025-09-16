import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Contract } from '../types';

interface ContractModalProps {
  contract: Contract | null;
  onClose: () => void;
}

const ContractModal: React.FC<ContractModalProps> = ({ contract, onClose }) => {

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "inline-flex items-center rounded px-2 py-1 text-xs border";
    
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
    <AnimatePresence>
      {contract && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="bg-gray-950 border border-white/10 rounded-2xl max-w-lg w-full m-4 p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
        <h4 className="mb-4 text-xl font-semibold text-blue-300">Contract Details</h4>
        
        <div className="space-y-3 mb-6 text-gray-100 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Awardee:</span>
            <span className="font-medium">{contract.awardee}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-400">Contract #:</span>
            <span className="font-mono">{contract.contractNumber}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Status:</span>
            <span className={getStatusBadge(contract.status)}>
              {contract.status}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-400">Award Date:</span>
            <span>{new Date(contract.awardDate).toLocaleDateString()}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-400">Amount:</span>
            <span className="font-semibold text-green-300">{formatAmount(contract.amount)}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-400">UEI SAM:</span>
            <span className="font-mono">{contract.ueiSam}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-400">CAGE Code:</span>
            <span className="font-mono">{contract.cageCode}</span>
          </div>
        </div>

        <div className="mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
          <h5 className="text-sm font-semibold text-blue-300 mb-2">Contract Description</h5>
          <p className="text-gray-300 text-sm leading-relaxed">
            {contract.description || 'Professional services and technical support for government operations including maintenance, consulting, and system administration.'}
          </p>
        </div>
        
        <div className="mb-6">
          <h5 className="text-sm font-semibold text-blue-300 mb-2">Contract History</h5>
          <ul className="text-gray-400 text-xs space-y-1">
            <li>• {new Date(contract.awardDate).toLocaleDateString()}: Contract awarded - {formatAmount(contract.amount)} (Active)</li>
            <li>• {new Date(new Date(contract.awardDate).getTime() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}: Initial milestone completed</li>
            <li>• {new Date(new Date(contract.awardDate).getTime() + 60 * 24 * 60 * 60 * 1000).toLocaleDateString()}: Performance review - Satisfactory</li>
          </ul>
        </div>

        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-blue-400 text-black rounded-full hover:bg-blue-300 transition-all duration-200 font-medium hover:shadow-lg"
          >
            Close
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="px-4 py-2 border border-white/10 text-gray-300 hover:bg-white/5 rounded-full transition-all duration-200 hover:shadow-lg"
          >
            Export Data
          </motion.button>
        </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContractModal;