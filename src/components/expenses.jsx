import React, { useEffect, useState } from 'react';
import '../assets/css/style.scss';

const Expenses = ({SetSum2}) => {
    const [categoryInput, setCategoryInput] = useState('');
    const [categoryList, setCategoryList] = useState(() => {
        try {
            const savedCategories = localStorage.getItem("savedCategories");
            const parsed = savedCategories ? JSON.parse(savedCategories) : [];
            return Array.isArray(parsed) ? parsed : [];
        } catch (e) {
            console.log(`Error: ${e}`);
            return [];
        }
    });

    const [expenseRecords, setExpenseRecords] = useState(() => {
        try {
            const savedExpenses = localStorage.getItem("savedExpenses");
            return savedExpenses ? JSON.parse(savedExpenses) : [];
        } catch (e) {
            console.log(`Error: ${e}`);
            return [];
        }
    });

    const removeCategory = (id) => {
        let updatedCategories = categoryList.filter((item) => item.id !== id);
        setCategoryList(updatedCategories);
        saveCategoriesToLocalStorage(updatedCategories);
    };

    const handleCategoryInput = (event) => {
        setCategoryInput(event.target.value);
    };

    const handleExpenseInput = (id, value) => {
        setExpenseRecords((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const clearCategoryInput = () => {
        setCategoryInput('');
    };

    const resetCategoryExpenses = (id) => {
        setExpenseRecords((prev) => ({
            ...prev,
            [id]: "",
        }));
    };

    const addNewCategory = () => {
        if (categoryInput.trim()) {
            const updatedCategoryList = [...categoryList, { value: categoryInput, id: Date.now(), total: 0 }];
            setCategoryList(updatedCategoryList);
            setCategoryInput('');
            saveCategoriesToLocalStorage(updatedCategoryList);
        }
    };

    const [totalExpenses, setTotalExpenses] = useState(() => {
        try {
            const savedTotals = localStorage.getItem("savedTotals");
            return savedTotals ? JSON.parse(savedTotals) : [];
        } catch (e) {
            console.log(`Error: ${e}`);
            return [];
        }
    });

    const updateTotalExpenses = (id) => {
        setTotalExpenses((prev) => {
            const updatedTotals = {
                ...prev,
                [id]: (prev[id] || 0) + parseFloat(expenseRecords[id] || 0),
            };
            saveTotalsToLocalStorage(updatedTotals);
            return updatedTotals;
        });

        setExpenseRecords((prev) => ({
            ...prev,
            [id]: "",
        }));
    };

    const modifyTotalExpense = (id) => {
        setTotalExpenses((prev) => {
            const adjustedTotals = {
                ...prev,
                [id]: (prev[id] || 0) + parseFloat(totalExpenses[id] || 0),
            };
            saveTotalsToLocalStorage(adjustedTotals);
            return adjustedTotals;
        });
    };

    const resetTotalExpense = (id) => {
        setTotalExpenses((prev) => {
            const resetTotals = { ...prev, [id]: "" };
            saveTotalsToLocalStorage(resetTotals);
            return resetTotals;
        });
    };
    const ResetTotal = () =>{
        setGrandTotal(""); 
    }
    const [grandTotal, setGrandTotal] = useState(() => {
        try {
            const savedGrandTotal = localStorage.getItem("savedGrandTotal");
            return savedGrandTotal ? JSON.parse(savedGrandTotal) : 0;
        } catch (e) {
            console.log(`Error: ${e}`);
            return 0;
        }
    });

    useEffect(() => {
        const computedTotal = Object.values(totalExpenses).reduce((acc, value) => acc + value, 0);
        setGrandTotal(computedTotal);
        saveGrandTotalToLocalStorage(computedTotal);
    }, [totalExpenses]);

    useEffect(() =>{
        if(typeof SetSum2 === 'function'){
        SetSum2(grandTotal);
        }
    },[grandTotal,SetSum2])
    const computeGrandTotal = () => {
        let summary = Object.values(totalExpenses).reduce((acc, next) => acc + next);
        setGrandTotal(summary);
        saveGrandTotalToLocalStorage(summary);
        return summary;
    };

    const saveCategoriesToLocalStorage = (data) => {
        localStorage.setItem("savedCategories", JSON.stringify(data));
    };

    const saveTotalsToLocalStorage = (data) => {
        localStorage.setItem("savedTotals", JSON.stringify(data));
    };

    const saveGrandTotalToLocalStorage = (data) => {
        localStorage.setItem("savedGrandTotal", JSON.stringify(data));
    };
    return (
        <div className='expenses expenses__padding expenses__container'>
            <div className='expenses__category'>
                <h2>Expenses</h2>
                <h2>Select Category</h2>
                <div className='income__category-block'>
                <div className='income__category-btn'>
                    <input
                        type="text"
                        className="input is-primary"
                        onChange={handleCategoryInput}
                        value={categoryInput}
                        placeholder='Create a category'
                    />
                    <button onClick={clearCategoryInput}>Clear</button>
                    <button onClick={addNewCategory} className="button is-info is-light">Submit</button>
                    </div>
                <ul className="income__category-list">
                    {categoryList.map((item, index) => (
                        <React.Fragment key={index}>
                            <li>
                                <span>{item.value}</span>
                                <input
                                    className='input is-success'
                                    type="number"
                                    value={expenseRecords[item.id] || ""}
                                    onChange={(e) => handleExpenseInput(item.id, e.target.value)}
                                />
                                <button onClick={() => resetCategoryExpenses(item.id)}>Clear</button>
                                <button onClick={() => updateTotalExpenses(item.id)} className="category-btn">Add</button>
                                <button onClick={() => removeCategory(item.id)}>Delete</button>
                            </li>
                            <li>
                                <span>Total for {item.value}</span>
                                <input
                                    className='input is-success'
                                    type="number"
                                    value={totalExpenses[item.id] || ""}
                                    onChange={(e) => modifyTotalExpense(item.id, e.target.value)}
                                />
                                <button onClick={() => resetTotalExpense(item.id)}>Clear</button>
                                <button onClick={() => computeGrandTotal()}>Add to Total</button>
                            </li>
                        </React.Fragment>
                    ))}
                </ul>
                
                <div>
                    <span>GRAND TOTAL</span>
                    <input className='input is-success' 
                        value={grandTotal} 
                        onChange={computeGrandTotal}
                        readOnly type="number" 
                       />
                        <button onClick={ResetTotal}>Reset</button>
                </div>
                </div>
            </div>
        </div>
    );
};

export default Expenses;
