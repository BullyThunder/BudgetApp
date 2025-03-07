import React, { useState,useEffect } from 'react';
import '../assets/css/style.scss';
import {Link} from "react-router-dom";
import { useSelector } from 'react-redux';
const Balance = () => {
    const totalBalance = useSelector((state) =>state.balance.totalBalance)
    return (
    <div className='total-nav'>
        <nav>
            <Link to="/Total">Main</Link> |  
            <Link to="/BudgetApp">Total</Link>
        </nav>
        <div className='total-extra'>
        <h1>Current Balance {totalBalance}</h1>
        <span></span>
        </div>
    </div>
    )
};

export default Balance;