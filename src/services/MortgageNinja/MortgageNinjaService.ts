// terrible name, great product

import type { ILatestMortgageRateResponse, IMortgageDetailsResponse, MortgageParams } from "./MortgageNinja.types";

const MORTGAGE_NINJA_API_BASE_URL = 'https://api.api-ninjas.com/v1';
const X_API_KEY = 'Y3YtIyj6JEDe08VJaYh71Q==sk2NsOyQBtQLiDWD';

/**
 *
 * @description Returns mortgage interest rate data for fixed-rate mortgage (FRM), ARM and more. If no parameters are set, the mortgage rate data for the most recent week is returned.
 * @example [
  {
    "week": "2024-10-17",
    "frm_30": 6.44,
    "frm_15": 5.63
  }
]
 * @returns
 */
export async function getLatestMortgageRate(): Promise<ILatestMortgageRateResponse[]> {
  try {
      const response = await fetch(
      `${MORTGAGE_NINJA_API_BASE_URL}/mortgagerate`,
      {
        headers: {
          "X-Api-Key": X_API_KEY,
        }
      }
    )

    return response.json();
  } catch (error) {
    console.error('Error fetching mortgage rate data:', error);
    throw error;
  }
}

/**
 * @description Calculate mortgage details based on provided parameters.
 * Requirements: interest_rate and either loan_amount or (home_value + downpayment) must be set.
 *
 * @requires interest_rate
 * @requires either loan_amount or (home_value + downpayment)
 * @exampleResponse
 * {
    "monthly_payment": {
      "total": 898,
      "mortgage": 898,
      "property_tax": 0,
      "hoa": 0,
      "annual_home_ins": 0
    },
    "annual_payment": {
      "total": 10777,
      "mortgage": 10777,
      "property_tax": 0,
      "hoa": 0,
      "home_insurance": 0
    },
    "total_interest_paid": 123312
  }
 * @returns An object containing monthly payment, total payment, and total interest.
 */

export async function getMortgageDetails(params: MortgageParams): Promise<IMortgageDetailsResponse> {
  const queryParams = new URLSearchParams()

  // Add required interest_rate
  queryParams.append('interest_rate', params.interest_rate.toString())

  // Add either loan_amount or (home_value + downpayment)
  if ('loan_amount' in params && params.loan_amount !== undefined) {
    queryParams.append('loan_amount', params.loan_amount.toString())
  } else if ('home_value' in params && params.home_value !== undefined) {
    queryParams.append('home_value', params.home_value.toString())
    queryParams.append('downpayment', params.downpayment.toString())
  }

  // Add optional parameters
  if (params.duration_years !== undefined) {
    queryParams.append('duration_years', params.duration_years.toString())
  }
  if (params.annual_property_tax !== undefined) {
    queryParams.append('annual_property_tax', params.annual_property_tax.toString())
  }
  if (params.annual_home_insurance !== undefined) {
    queryParams.append('annual_home_insurance', params.annual_home_insurance.toString())
  }
  if (params.monthly_hoa !== undefined) {
    queryParams.append('monthly_hoa', params.monthly_hoa.toString())
  }

  try {
    const response = await fetch(
      `${MORTGAGE_NINJA_API_BASE_URL}/mortgagecalculator?${queryParams.toString()}`,
      {
        headers: {
          "X-Api-Key": X_API_KEY,
        }
      }
    );

    return response.json();
  } catch (error) {
    console.error('Error fetching mortgage details:', error);
    throw error;
  }
}

/**
 *
 * @description Returns a list of regions and corresponding 25th, 50th (median), and 75th percentile effective property tax rates. The region is mostly zipcode-based, but sometimes a single zipcode can contain multiple regions due to local tax laws.The maximum number of results returned is 100.
 * @requires city, county, zip. At least one parameter must be provided.
 * @param param0
 * @exampleResponse [
  {
    "state": "OR",
    "county": "Lane",
    "city": "Eugene",
    "zip": "97401",
    "property_tax_25th_percentile": 0.00942916,
    "property_tax_50th_percentile": 0.0104363,
    "property_tax_75th_percentile": 0.0114832
  },
  {
    "state": "OR",
    "county": "Lane",
    "city": "Eugene",
    "zip": "97402",
    "property_tax_25th_percentile": 0.00782806,
    "property_tax_50th_percentile": 0.00855799,
    "property_tax_75th_percentile": 0.00956312
  },
  {
    "state": "OR",
    "county": "Lane",
    "city": "Eugene",
    "zip": "97403",
    "property_tax_25th_percentile": 0.00942755,
    "property_tax_50th_percentile": 0.0106412,
    "property_tax_75th_percentile": 0.0118866
  },
  {
    "state": "OR",
    "county": "Lane",
    "city": "Eugene",
    "zip": "97404",
    "property_tax_25th_percentile": 0.00717529,
    "property_tax_50th_percentile": 0.00883678,
    "property_tax_75th_percentile": 0.0102749
  },
  {
    "state": "OR",
    "county": "Lane",
    "city": "Eugene",
    "zip": "97405",
    "property_tax_25th_percentile": 0.00900753,
    "property_tax_50th_percentile": 0.010321,
    "property_tax_75th_percentile": 0.0115112
  },
  {
    "state": "OR",
    "county": "Lane",
    "city": "Eugene",
    "zip": "97408",
    "property_tax_25th_percentile": 0.00891131,
    "property_tax_50th_percentile": 0.0104162,
    "property_tax_75th_percentile": 0.0116135
  }
]
 * @returns
 */
export async function getPropertyTaxPercentage({ atate, county, city, zip }: { atate?: string; county?: string; city?: string; zip?: string }) {
  try {
    if (!atate && !county && !city && !zip) {
      throw new Error('At least one parameter (atate, county, city, zip) must be provided.');
    }

    const queryParams = new URLSearchParams();
    if (atate) queryParams.append('atate', atate);
    if (county) queryParams.append('county', county);
    if (city) queryParams.append('city', city);
    if (zip) queryParams.append('zip', zip);
    const response = await fetch(`${MORTGAGE_NINJA_API_BASE_URL}/propertytaxpercentage?${queryParams.toString()}`, {
      headers: {
        "X-Api-Key": X_API_KEY,
      }
    });
    return response.json();
  } catch (error) {
    console.error('Error fetching property tax percentage:', error);
    throw error;
  }
}


/**
 *
 * @param countryCode
 * @param region
 * @param income
 * @param filingStatus
 * @param [deductions=0]
 * @param [credits=0]
 * @param [self_employed=false]
 * @responseExample
 * {
    "country": "US",
    "region": "CA",
    "income": 100000,
    "taxable_income": 100000,
    "deductions": 0,
    "credits": 0,
    "federal_effective_rate": 0.17053,
    "federal_taxes_owed": 17053,
    "fica_social_security": 6200,
    "fica_medicare": 1450,
    "fica_total": 7650,
    "region_effective_rate": 0.05952849999999999,
    "region_taxes_owed": 5952.849999999999,
    "total_taxes_owed": 30655.85,
    "income_after_tax": 69344.15,
    "total_effective_tax_rate": 0.3065585
  }
 *
 */
export async function getIncomeTaxInformation(countryCode: string, region: string, income: number, filingStatus: 'single' | 'married' | 'married_separate' | 'head_of_household', deductions = 0, credits = 0, self_employed = false) {
  try {
    const response = await fetch(`${MORTGAGE_NINJA_API_BASE_URL}/incometaxcalculator?country=${countryCode}&region=${region}&income=${income}&filing_status=${filingStatus}&deductions=${deductions}&credits=${credits}&self_employed=${self_employed}`, {
      headers: {
        "X-Api-Key": X_API_KEY,
      }
    });
    return response.json();
  } catch (error) {
    console.error('Error fetching income tax information:', error);
    throw error;
  }

}
