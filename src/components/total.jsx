import React, { useState,useEffect } from 'react';
import '../assets/css/style.scss';
import {Link} from "react-router-dom";
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
    const ChangeStyle = () =>{

    }
    useEffect(() => {
        setTotalBalance((IncomeSum - ExpensesSum).toFixed(2));
    }, [IncomeSum, ExpensesSum]); // Запускаем эффект при изменении доходов или расходов

    return (
        <div className='total'>
            <div className='total-nav'>
                <nav>
                <Link to="/">Error</Link> |  
                <Link to="/main">Main</Link>
                </nav>
            </div>
            <div className='total-list'>
            <Income SetSum1={setSumIncome} />
            <Expenses SetSum2={setSumExpenses} />
            </div>
            <div className='total-bottom'>
            <h2>Final Balance</h2>
            <input type="number"
            className={`input is-info total-input ${TotalBalance >=0 ? 'positive' : 'negative'}` }
             value={TotalBalance}
              readOnly />
              </div>
        </div>
    );
};

export default Total;
