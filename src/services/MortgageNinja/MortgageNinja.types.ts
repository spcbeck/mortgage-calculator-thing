export interface ILatestMortgageRateResponse {
  week: string; // e.g., "current" so not actually the week date
  data: {
    frm_30: number; // e.g., 6.44
    frm_15: number; // e.g., 5.63
    week: string; // e.g., "2024-10-17"
  }
}

interface BaseMortgageParams {
  interest_rate: number
  duration_years?: number
  annual_property_tax?: number
  annual_home_insurance?: number
  monthly_hoa?: number
}

interface MortgageParamsWithLoanAmount extends BaseMortgageParams {
  loan_amount: number
  home_value?: never
  downpayment?: never
}

interface MortgageParamsWithHomeValue extends BaseMortgageParams {
  loan_amount?: never
  home_value: number
  downpayment: number
}

export type MortgageParams = MortgageParamsWithLoanAmount | MortgageParamsWithHomeValue

export interface IMortgageDetailsResponse {
  monthly_payment: {
    total: number
    mortgage: number
    property_tax: number
    hoa: number
    annual_home_ins: number
  }
  annual_payment: {
    total: number
    mortgage: number
    property_tax: number
    hoa: number
    home_insurance: number
  }
  total_interest_paid: number
}
