import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/router.js"; // Импортируем маршруты правильно
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;