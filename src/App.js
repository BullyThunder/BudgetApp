import React from "react";
import { BrowserRouter } from "react-router-dom"; // Для маршрутов
import { Provider } from "react-redux"; // Импортируем Provider
import AppRouter from "./router/router.js"; // Импортируем маршруты правильно
import store from "./redux/store.js"; // Импортируем store
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  );
}

export default App;