import {BrowserRouter, Routes, Route} from "react-router-dom";
import Coin from "./routes/Coin";
import CoinLst from "./routes/CoinLst"
import Price from "./routes/Price";
import Chart from "./routes/Chart";

interface IRouterProps {}

const Router = ({}: IRouterProps) => {
    return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
            <Route path="/" element={<CoinLst />}  />
            <Route path="/:coinId" element={<Coin />}>
                <Route path="price" element={<Price />} />
                <Route path="chart" element={<Chart />} />
            </Route>
        </Routes>
    </BrowserRouter>
    );
}

export default Router;