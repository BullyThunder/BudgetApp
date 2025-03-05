import { Routes, Route } from "react-router-dom";
import Main from "../components/main.jsx"; // Правильный путь
import Total from "../components/total.jsx"; 
import Transactions from "../components/transactions.jsx";

const AppRouter = () => {
    console.log("Текущий путь:", window.location.pathname); 
    return (
        <Routes>
            <Route path="*"element={<Total />} />
            <Route path="/main" element={<Main />} />
            <Route path="/transactions" element={<Transactions />} />
        </Routes>
    );
};

export default AppRouter;
