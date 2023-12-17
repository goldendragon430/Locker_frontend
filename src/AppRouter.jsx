import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateLocker from "./pages/CreateLocker";
import Navbar from "./components/layout/Navbar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import LiquidityLocks from "./pages/LiquidityLocks";
import DetailLockedToken from "./pages/DetailLockedToken";
import ShowLock from "./pages/ShowLock";
import TokenLocks from "./pages/TokenLocks";

const AppRouter = () => {

    return (
        <div className='bg-dark1  font-monobold min-h-screen'>
            <BrowserRouter>
                <Navbar />
                <div className='flex justify-center'>

                    <div className='w-4/6 mt-[10px] relative overflow-y-auto pb-8'>
                        <Routes>
                            <Route element={<CreateLocker />} path={"/"} />
                            <Route element={<LiquidityLocks />} path={"/liquidity_locks"} />
                            <Route element={<TokenLocks />} path={"/token_locks"} />
                            <Route element={<DetailLockedToken />} path={"/detail/:token"} />
                            <Route element={<ShowLock />} path={"/record/:lockId"} />
                        </Routes>
                    </div>
                </div>

            </BrowserRouter>
            <ToastContainer theme="dark" autoClose={2000} />
        </div>
    );
};

export default AppRouter;