import './App.scss';
import calculateNetProfit from './helpers/calculateNetProfit';
import calculateMininalPrice from './helpers/calculateMinimalPrice';
import { useState } from 'react';

function App() {
  const [costprice, setCostprice] = useState(0);
  const [price, setPrice] = useState(0);
  const [deduction, setDeduction] = useState(0.52);
  const [commission, setCommission] = useState(13.1);
  const [tax, setTax] = useState(24);

  const [netProfit, setNetProfit] = useState('');
  const [minimalPrice, setMinimalPrice] = useState('');
  const [isCalculated, setIsCalculated] = useState(false);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPrice(Number(e.target.value));
  }

  const handleCostpriceChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCostprice(Number(e.target.value));
  };

  const handleDeductionChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setDeduction(Number(e.target.value));
  };

  const handleCommisionChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCommission(Number(e.target.value));
  };

  const handleTaxChange = (e: any) => {
    setTax(e.target.value);
  };

  const handleUserProfitCalculatorSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (price !== 0) {
      const netProfitCalculationResult = calculateNetProfit(costprice, price, deduction, commission, tax);
      const minimalPriceCalculationResult = calculateMininalPrice(costprice, deduction, commission, tax);
      setNetProfit(netProfitCalculationResult);
      setMinimalPrice(minimalPriceCalculationResult);
      setIsCalculated(true);
    }
  };

  return (
    <div className='profitCalculator'>
      <h2 className='profitCalculator__heading'>Profit calculator</h2>
      <form onSubmit={(e) => handleUserProfitCalculatorSubmit(e)} className='profitCalculator__form'>
        <div className='profitCalculator__formgroup'>
          <label className='profitCalculator__label' htmlFor='costprice'>Себестоимость</label>
          <input onChange={(e) => handleCostpriceChange(e)} type='number' value={costprice} step='0.1' id='costprice' className='profitCalculator__input'></input>
        </div>
        <div className='profitCalculator__formgroup'>
          <label className='profitCalculator__label' htmlFor='price'>Цена</label>
          <input onChange={(e) => handlePriceChange(e)} type='number' value={price} step='0.1' id='price' className='profitCalculator__input'></input>
        </div>
        <div className='profitCalculator__formgroup'>
          <label className='profitCalculator__label' htmlFor='deduction'>Вычет</label>
          <input onChange={(e) => handleDeductionChange(e)} type='number' value={deduction} step='0.1' id='deduction' className='profitCalculator__input'></input>
        </div>
        <div className='profitCalculator__formgroup'>
          <label className='profitCalculator__label' htmlFor='commision'>Комиссия сайта</label>
          <input onChange={(e) => handleCommisionChange(e)} type='number' value={commission} step='0.1' id='comission' className='profitCalculator__input'></input>
        </div>
        <div className='profitCalculator__formgroup'>
          <label className='profitCalculator__label' htmlFor='tax'>Налог с прибыли</label>
          <input onChange={(e) => handleTaxChange(e)} type='number' value={tax} step='0.1' id='tax' className='profitCalculator__input'></input>
        </div>
        <button type='submit'>Рассчитать</button>
      </form>

      { isCalculated &&
      <div className='profitCalculator__results'>
        <h4 className='profitCalculator__heading_small'>Чистая прибыль: {netProfit}€</h4>
        <h4 className='profitCalculator__heading_small'>Выход в ноль при цене: {minimalPrice}€</h4>
      </div>
      }
      
    </div>
  )
}

export default App
