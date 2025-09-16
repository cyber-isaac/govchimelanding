export interface Contract {
  id: string;
  awardDate: string;
  contractNumber: string;
  amount: number;
  awardee: string;
  ueiSam: string;
  cageCode: string;
  status: string;
  entityId: string;
  description?: string;
}

export interface Entity {
  id: string;
  name: string;
  ueiSam: string;
  cageCode: string;
  location: string;
  industry: string;
  activeContracts: string[];
  totalContractValue: number;
  riskScore: number;
  performanceMetrics?: {
    totalContractsWon: number;
    setAsideBreakdown: {
      sdvosb: number;
      wosb: number;
      eightA: number;
      hubzone: number;
    };
    cancellations: number;
    modifications: number;
    averageContractValue: number;
    peerAverageValue: number;
  };
}