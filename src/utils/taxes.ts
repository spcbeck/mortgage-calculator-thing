export function calculateTotalTaxesForMortgage(
  income: number,
  mortgageInterest: number,
  propertyTax: number,
  hoaFees: number,
  insurance: number,
  maintenanceCosts: number,
  depreciation: number,
) {
  return (
    income -
    (mortgageInterest + propertyTax + hoaFees + insurance + maintenanceCosts + depreciation)
  )
}

/**
 * Calculates the federal tax owed based on the given income.
 * @param income The total income for the year including salary and rental income.
 * @returns The amount of federal tax owed.
 */
export function calculateFederalTax(income: number) {
  // this will be replaced by a call to src/services/IncomeTaxService/IncomeTaxService.ts, and we should also store it in localStorage
  const brackets = [
    { rate: 0.1, threshold: 11000 },
    { rate: 0.12, threshold: 44725 },
    { rate: 0.22, threshold: 95375 },
    { rate: 0.24, threshold: 182100 },
    { rate: 0.32, threshold: 231250 },
    { rate: 0.35, threshold: 578125 },
    { rate: 0.37, threshold: Infinity },
  ]

  let tax = 0
  let previousThreshold = 0

  for (const bracket of brackets) {
    if (income <= bracket.threshold) {
      break
    }
    const taxableInBracket = Math.min(income, bracket.threshold) - previousThreshold
    tax += taxableInBracket * bracket.rate
    previousThreshold = bracket.threshold
  }
  return tax
}

export function calculateStateTax(income: number) {
  const regularRate = 0.05 // assumes Massachusetts state tax rate of 5%, will be replaced by API call
  return income * regularRate
}

/**
 *
 * @param {object} params - An object containing all income and expense data
 * @param {number} params.rentalIncome - Total gross income from the short term rental
 * @param {number} params.operatingExpenses - cash expenses: utilities, cleaning, fees, repair, hoa
 * @param {number} params.propertyTax - Annual property taxes paid.
 * @param {number} params.depreciation - annual depreciation expense (building value / 27.5 years) (yes building value is separate from land value)
 * @param {number} params.ownerOtherIncome - salary/W-2 type income
 * @param {number} [params.standardDeduction=15750] - The 2025 standard deduction for a single filer
 * @returns {object} - An object containing preTaxCashFlow, taxableRentalIncome, totalTaxableIncome, afterTaxProfit, marginalTaxOnRental
 */
export function calculateShortTermRentalProfit({
  rentalIncome,
  operatingExpenses,
  propertyTax,
  mortgageInterest,
  depreciation,
  ownerOtherIncome,
  standardDeduction = 15750, // standard deduction for single filers in 2025
}: {
  rentalIncome: number
  operatingExpenses: number
  propertyTax: number
  mortgageInterest: number
  depreciation: number
  ownerOtherIncome: number
  standardDeduction?: number
}) {
  // 1. Calculate the property's pre-tax cash flow, as in actual cash-in-pocket
  // this does not include depreciation since it's a non-cash expense
  // it also does not include mortgage principal payments since those are not tax-deductible
  const preTaxCashFlow = rentalIncome - operatingExpenses - propertyTax - mortgageInterest

  // 2. Calculate taxable rental income
  // this is what you report to the IRS, note depreciation is included here
  const taxableRentalIncome =
    rentalIncome - operatingExpenses - propertyTax - mortgageInterest - depreciation

  // 3. Calculate the owner's base tax bill without the rental income
  // we subtract the standard deduction to get the final taxable income
  const baseTaxableIncome = Math.max(0, ownerOtherIncome - standardDeduction)
  const baseFederalTax = calculateFederalTax(baseTaxableIncome)
  const baseStateTax = calculateStateTax(baseTaxableIncome)
  const totalBaseTax = baseFederalTax + baseStateTax

  // 4. Calculate the owner's total tax bill including the rental income
  const totalTaxableIncome = Math.max(0, ownerOtherIncome + taxableRentalIncome - standardDeduction)
  const totalFederalTax = calculateFederalTax(totalTaxableIncome)
  const totalStateTax = calculateStateTax(totalTaxableIncome)
  const totalTaxWithRental = totalFederalTax + totalStateTax

  // 5. The difference is the true marginal tax owed on the rental income
  const marginalTaxOnRental = totalTaxWithRental - totalBaseTax

  // 6. Finally, calculate after-tax profit
  // Subtract only the MARGINAL tax on the rental, not the owner's entire tax bill
  const afterTaxProfit = preTaxCashFlow - marginalTaxOnRental

  // 7. Calculate the tax benefit from depreciation
  // This is what the tax would be WITHOUT depreciation (i.e., on the pre-tax cash flow)
  const taxableIncomeWithoutDepreciation = Math.max(0, ownerOtherIncome + preTaxCashFlow - standardDeduction)
  const federalTaxWithoutDepreciation = calculateFederalTax(taxableIncomeWithoutDepreciation)
  const stateTaxWithoutDepreciation = calculateStateTax(taxableIncomeWithoutDepreciation)
  const totalTaxWithoutDepreciation = federalTaxWithoutDepreciation + stateTaxWithoutDepreciation

  // The depreciation tax benefit is the difference
  const depreciationTaxBenefit = totalTaxWithoutDepreciation - totalTaxWithRental

  return {
    preTaxCashFlow: preTaxCashFlow.toFixed(2),
    taxableRentalIncome: taxableRentalIncome.toFixed(2),
    totalTaxableIncome: totalTaxableIncome.toFixed(2),
    afterTaxProfit: afterTaxProfit.toFixed(2),
    marginalTaxOnRental: marginalTaxOnRental.toFixed(2),
    depreciation: depreciation.toFixed(2),
    depreciationTaxBenefit: depreciationTaxBenefit.toFixed(2),
    rentalIncome: rentalIncome.toFixed(2),
    totalExpenses: (operatingExpenses + propertyTax + mortgageInterest).toFixed(2),
  }
}
