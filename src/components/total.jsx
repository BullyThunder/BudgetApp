import React, { useState,useEffect } from 'react';
import '../assets/css/style.scss';
import Income from './income.jsx';
import Expenses from './expenses.jsx';

const Total = () => {
    const [IncomeSum, SetIncomeSum] = useState(0);
    const [ExpensesSum, SetExpensesSum] = useState(0);
    const [TotalBalance, setTotalBalance] = useState(0);

    const setSumIncome = (sum) => {
        SetIncomeSum(sum);
    };

    const setSumExpenses = (sum) => {
        SetExpensesSum(sum);
    };

    useEffect(() => {
        setTotalBalance(IncomeSum - ExpensesSum);
    }, [IncomeSum, ExpensesSum]); // Запускаем эффект при изменении доходов или расходов

    return (
        <div className='total'>
            <div className='total-list'>
            <Income SetSum1={setSumIncome} />
            <Expenses SetSum2={setSumExpenses} />
            </div>
            <h2>Final Balance</h2>
            <input type="number"
            class="input is-info total-input"
             value={TotalBalance}
              readOnly />
        </div>
    );
};

export default Total;
