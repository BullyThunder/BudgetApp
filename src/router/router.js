import { Routes, Route } from "react-router-dom";
import Main from "../components/main.jsx"; // Правильный путь
import Total from "../components/total.jsx"; // Правильный путь
import NotFound from "../components/not-found.jsx"; // Убедись, что этот файл существует

const AppRouter = () => {
    console.log("Текущий путь:", window.location.pathname); 
    return (
        <Routes>
            <Route path="/BudgetApp" element={<Total />} />
            <Route path="/main" element={<Main />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRouter;
