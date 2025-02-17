import React, { useEffect, useState } from 'react';
import '../assets/css/style.scss';

const Income = () => {
    const [inputValue, setInputValue] = useState('');
    const [arrCategory, setArrCategory] = useState(()=>{
        try{
            const saveCategory_income = (localStorage.getItem("saveCategory_income"));
            const parsed = saveCategory_income ? JSON.parse(saveCategory_income) : [];
            return Array.isArray(parsed) ? parsed : [];
        }
            catch(e){
                console.log(`Error${e}`);
                return [];
        }});
    const [incomeInput, setIncomeInput] = useState(()=>{
        try {
            const saveIncomeInput = (localStorage.getItem("saveIncomeInput"));
            return saveIncomeInput ? JSON.parse(saveIncomeInput) : [];
        }
            catch(e){
                console.log(`Error${e}`);
                return [];
            }
    }); 
    const deleteList = (id) =>{
     let deletingList = arrCategory.filter((item) => item.id !== id);
     setArrCategory(deletingList);
     saveToLocalStorage_Category(deletingList)
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
        if(inputValue.trim()){
        const updatedArrCategory = [...arrCategory, { value: inputValue,id: Date.now(),total:0 }];
        setArrCategory(updatedArrCategory);
        setInputValue('');
        saveToLocalStorage_Category(updatedArrCategory)
        }
    };
    const [totalInput, setTotalInput] = useState(()=>{
        try {
            const saveTotalInput = (localStorage.getItem("saveTotalInput"));
            return saveTotalInput  ? JSON.parse(saveTotalInput ) : [];
        }
            catch(e){
                console.log(`Error${e}`);
                return [];
            }
    });
    const addToTotal = (id) => {
        // Обновляем totalInput
        setTotalInput((prev) => {
            const updatedTotal = {
                ...prev,
                [id]: (prev[id] || 0) + parseFloat(incomeInput[id] || 0),
            };
            saveToLocalStorage_Total(updatedTotal);
            return updatedTotal;
        });
    
        // Сбрасываем поле ввода incomeInput
        setIncomeInput((prev) => ({
            ...prev,
            [id]: "",
        }));
    };
    const displayTotal = (id) =>{
        setTotalInput((prev) =>{
            const updatedTotal_value = {
            ...prev,
            [id]: (prev[id] || 0) + parseFloat(totalInput[id] || 0),
        }
        saveToLocalStorage_Total(updatedTotal_value);
        return updatedTotal_value;
    });
    }
    const clearTotal =(id) =>{
        setTotalInput((prev)=>{
           const clear_Total ={ ...prev,
            [id]: ""}
            saveToLocalStorage_Total(clear_Total);
            return clearTotal;
        })
        }
        const [allTotalSumm, setAllTotalSumm] = useState (()=>{
            try {
                const saveTotalSummary = (localStorage.getItem("saveTotalSummary"));
                return saveTotalSummary  ? JSON.parse(saveTotalSummary ) : [];
            }
                catch(e){
                    console.log(`Error${e}`);
                    return [];
                }
        });
        useEffect(() =>{
            console.log(`the amount has been recalculated: ${allTotalSumm}`);
           }, [allTotalSumm]);

       const total_Sum = () =>{
       let summary = Object.values(totalInput).reduce((acc,next) => acc+next,0);
       setAllTotalSumm(summary);
       saveToLocalStorage_Summary(summary);
       return summary;
       }
        
       
    const saveToLocalStorage_Category = (data) =>{
        localStorage.setItem("saveCategory_income",JSON.stringify(data));
    }
    const saveToLocalStorage_Total = (data) =>{
        localStorage.setItem("saveTotalInput", JSON.stringify(data));
    }
    const saveToLocalStorage_Summary = (data) =>{
        localStorage.setItem("saveTotalSummary", JSON.stringify(data));
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
                                 <button onClick={() =>clearTotal(item.id)}>Clear</button>
                                 <button onClick={() =>total_Sum(item.id)}>Add to Total</button>
                            </li>
                            </React.Fragment>
                        ))}
                    </ul>
                    <div>
                        <span>TOTAL</span>
                        <input className='input is-success'
                    value={allTotalSumm}
                    onChange = {total_Sum}
                     type="number" />
                     </div>
            </div>
            
            </div>
        </div>
    );
}

export default Income;