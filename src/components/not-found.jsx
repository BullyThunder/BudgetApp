import React, { useState,useEffect } from 'react';
import '../assets/css/style.scss';
import {Link} from "react-router-dom";
const NotFound = () => {
    return (
    <div className='total-nav'>
        <nav>
            <Link to="/">Error</Link> |  
            <Link to="/BudgetApp">Total</Link>
        </nav>
        <div className='total-extra'>
        <h1>404 - Страница не найдена</h1>
        </div>
    </div>
    )
};

export default NotFound;