import React, { useState } from 'react';
import '../assets/css/style.scss';

const Income = () => {
    const [inputValue, setInputValue] = useState('');
    const [arrCategory, setArrCategory] = useState(()=>{
        try{
            const saveCategory_income = (localStorage.getItem("saveCategory_income"));
            return saveCategory_income ? JSON.parse(saveCategory_income) : [];
        }
            catch(e){
                console.log(`Error${e}`);
                return [];
        }});
    const [incomeInput, setIncomeInput] = useState(''); 
    const deleteList = (id) =>{
     let deletingList = arrCategory.filter((item) => item.id !== id);
     setArrCategory(deletingList);
     saveToLocalStorage(deletingList)
    }
    const displayInput = (event) => {
        setInputValue(event.target.value);
    };
    const displayIncome = (id,value) =>{
        setIncomeInput((prev) =>({
            ...prev,
            [id]:value
        }))
    }
    const clearList = () =>{
        setInputValue('');
    }
    const clearCategory = (id) =>{
        setIncomeInput((prev) =>({
            ...prev,
            [id]:""}))
    }
    const addCategory = () => {
        const updatedArrCategory = [...arrCategory, { value: inputValue,id: Date.now(),total:0 }];
        setArrCategory(updatedArrCategory);
        setInputValue('');
        saveToLocalStorage(updatedArrCategory)
    };
    const [totalInput, setTotalInput] = useState('');
    const addToTotal = (id) =>{
        setTotalInput((prev)=>({
            ...prev, [id]:(prev[id] || 0) + parseFloat(incomeInput[id] || 0)}
        ));
        setIncomeInput((prev)=>({
            ...prev, [id]:""
        }));
    }
    const displayTotal = (id,value) =>{
        setTotalInput((prev) =>({
            ...prev,
            [id]:value
        }))
        setTotalInput((prev) =>({
            ...prev,
            [id]:""
        }));
    }
    const saveToLocalStorage = (data) =>{
        localStorage.setItem("saveCategory_income",JSON.stringify(data));
    }

    return (
        <div className='income income__padding income__container'>
            <div className='income__category'>
                <h2>Income</h2>
                <h2>Select Category</h2>
                <div className='income__category-block'>    
                <div className='income__category-btn'>
                    <input
                        type="text"
                        className="input is-primary"
                        onChange={displayInput}
                        value={inputValue}
                        placeholder='Create a category'
                    />
                     <button onClick={clearList}>Clear</button>
                    <button
                        onClick={addCategory}
                        className="button is-info is-light"
                    >
                        Submit
                    </button>
                </div>
                    <ul className="income__category-list">
                        {arrCategory.map((item, index) => (
                            <React.Fragment key={index}>
                            <li>
                                <span>{item.value}</span>
                                <input 
                                className='input is-success'
                                type="number"
                                value={incomeInput[item.id] || ""}
                                onChange={(e)=>displayIncome(item.id,e.target.value)}
                                />
                                <button onClick = {() =>clearCategory(item.id)}>Clear</button>
                                <button onClick={() =>addToTotal(item.id)} className="income__category-btn">Add</button>
                                <button onClick={() => deleteList(item.id)}>Delete</button>
                            </li>
                            <li>
                                <span>Total for {item.value}</span>
                                <input 
                                className='input is-success'
                                type="number"
                                value={totalInput[item.id] || ""}
                                onChange={(e)=>displayTotal(item.id,e.target.value)}
                                 />
                            </li>
                            </React.Fragment>
                        ))}
                    </ul>
            </div>
            </div>
        </div>
    );
}

export default Income;