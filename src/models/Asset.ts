export interface Asset {
  id: string
  address: string
  name: string
  purchasePrice: number
  purchaseDate: Date
  propertyTaxPerYear: number
  hasPrimaryResidenceExmption: boolean
  depreciationYears: number
  assessedValue: number
  hoaFees: number
  insuranceCosts: number
  maintenanceCosts: number
  otherTaxes: number
}

export interface AssetWithLoan extends Asset {
  loanLength: 15 | 30
  interestRate: number
  downPayment: number
  monthlyPayment: number
  remainingBalance: number
  maturityDate: Date
}

export interface ShortTermRentalAssetWithLoan extends AssetWithLoan {
  averageDailyRate: number
  occupancyRate: number
  averageMaidVisitsPerMonth: number
}

export interface LongTermRentalAssetWithLoan extends AssetWithLoan {
  monthlyRent: number
  payUtilities: boolean
}
