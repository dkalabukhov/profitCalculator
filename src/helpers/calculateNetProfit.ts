function calculateNetProfit(costprice: number, price: number, deduction: number, commission: number, tax: number): string {
  const comissionPercentRemainder: number = (100 - commission) / 100;
  const taxPercentRemainder: number = (100 - tax) / 100;
  
  const result: number = (price * comissionPercentRemainder - deduction) * taxPercentRemainder - costprice;
  return `${result.toFixed(2)}`;
}

export default calculateNetProfit;