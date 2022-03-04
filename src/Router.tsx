import {BrowserRouter, Switch, Route} from "react-router-dom";
import Coin from "./routes/Coin";
import CoinLst from "./routes/CoinLst"

function Router() {
    return <BrowserRouter >
        <Switch>
            <Route path={`/:coinId`}>
                <Coin />
            </Route>
            <Route path={`/`}>
                <CoinLst />
            </Route>
        </Switch>
    </BrowserRouter>
}

export default Router;