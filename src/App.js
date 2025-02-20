import logo from './logo.svg';
import './App.css';

import Income from './components/income.jsx'
import Expenses from './components/expenses.jsx'
import Total from './components/total.jsx'
function App() {
  return (
    <div className="App">
      <div className="App-block">
      <Total/>
      </div>
    </div>
  );
}

export default App;
