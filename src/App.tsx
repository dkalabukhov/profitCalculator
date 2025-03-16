import './App.scss';
import calculateNetProfit from './helpers/calculateNetProfit';
import calculateMininalPrice from './helpers/calculateMinimalPrice';
import { useState } from 'react';

function App() {
  const [costprice, setCostprice] = useState <(number | '')>('');
  const [price, setPrice] = useState <number | ''>('');
  const [deduction, setDeduction] = useState <number | ''> (0.52);
  const [commission, setCommission] = useState <number | ''>(13.1);
  const [tax, setTax] = useState <number | ''>(24);

  const [netProfit, setNetProfit] = useState('');
  const [minimalPrice, setMinimalPrice] = useState('');
  const [isCalculated, setIsCalculated] = useState(false);

  const handleCostpriceChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value === '') {
      setCostprice('');
    } else {
    setCostprice(Number(e.target.value));
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value === '') {
      setPrice('');
    } else {
    setPrice(Number(e.target.value));
    }
  }

  const handleDeductionChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value === '') {
      setDeduction('');
    } else {
    setDeduction(Number(e.target.value));
    }  };

  const handleCommisionChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value === '') {
      setCommission('');
    } else {
    setCommission(Number(e.target.value));
    }
  };

  const handleTaxChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value === '') {
      setTax('');
    } else {
    setTax(Number(e.target.value));
    }
  };

  const handleUserProfitCalculatorSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (price !== 0 && price !== '') {
      const netProfitCalculationResult = calculateNetProfit(Number(costprice), Number(price), Number(deduction), Number(commission), Number(tax));
      const minimalPriceCalculationResult = calculateMininalPrice(Number(costprice), Number(deduction), Number(commission), Number(tax));
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
          <input placeholder='0' name='costprice' onChange={(e) => handleCostpriceChange(e)} type='number' value={costprice} step='0.01' id='costprice' className='profitCalculator__input'></input>
        </div>
        <div className='profitCalculator__formgroup'>
          <label className='profitCalculator__label' htmlFor='price'>Цена</label>
          <input placeholder='0' name='price' onChange={(e) => handlePriceChange(e)} type='number' value={price} step='0.01' id='price' className='profitCalculator__input'></input>
        </div>
        <div className='profitCalculator__formgroup'>
          <label className='profitCalculator__label' htmlFor='deduction'>Вычет</label>
          <input name='deduction' onChange={(e) => handleDeductionChange(e)} type='number' value={deduction} step='0.01' id='deduction' className='profitCalculator__input'></input>
        </div>
        <div className='profitCalculator__formgroup'>
          <label className='profitCalculator__label' htmlFor='commission'>Комиссия сайта</label>
          <input name='commission' onChange={(e) => handleCommisionChange(e)} type='number' value={commission} step='0.01' id='commission' className='profitCalculator__input'></input>
        </div>
        <div className='profitCalculator__formgroup'>
          <label className='profitCalculator__label' htmlFor='tax'>Налог с прибыли</label>
          <input name='tax' onChange={(e) => handleTaxChange(e)} type='number' value={tax} step='0.01' id='tax' className='profitCalculator__input'></input>
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
