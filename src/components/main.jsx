import React, { useState,useEffect } from 'react';
import '../assets/css/style.scss';
import {Link} from "react-router-dom";
const Main = () =>{
    return (
        <div className='main'>
            <div className='total-nav'>
                    <nav>
                     <Link to="/">Error</Link> |  
                     <Link to="/BudgetApp">Total</Link>
                     </nav>
            </div>
            <div className='total-text'>
            <h2>Hi, it`s main</h2> 
            </div>
           
        </div>
    );
}
export default Main;
