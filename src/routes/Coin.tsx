import { Routes, Route } from "react-router";
import { Link, useLocation, useMatch, useParams, Outlet,  } from "react-router-dom";
import styled from "styled-components";
import Price from "./Price";
import Chart from "./Chart";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinTicker } from "../api";
import { Helmet } from "react-helmet";


const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
    max-height: 100vh;
    
`;

const Header = styled.header`
    @font-face {
        font-family: 'SEBANG_Gothic_Bold';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2104@1.0/SEBANG_Gothic_Bold.woff') format('woff');
        font-weight: normal;
        font-style: normal;
    }
    font-family: 'SEBANG_Gothic_Bold';
    height: 13vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Title = styled.h1`
    color:${props => props.theme.accentColor};
    font-size: 48px;
`;

const Loader = styled.span`
    text-align: center;
    display: block;
`;


interface RouteState {
    state: {
        name: string;
    };
    
}



interface InfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
}

interface PriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {USD: {
        ath_date: string;
        ath_price: number;
        market_cap: number;
        market_cap_change_24h: number;
        percent_change_1h: number;
        percent_change_1y: number;
        percent_change_6h: number;
        percent_change_7d: number;
        percent_change_12h: number;
        percent_change_15m: number;
        percent_change_24h: number;
        percent_change_30d: number;
        percent_change_30m: number;
        percent_from_price_ath: number;
        price: number;
        volume_24h: number;
        volume_24h_change_24h: number;
    }};
}

const Overview = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: rgba(0,0,0,0.5);
    padding: 10px 20px;
    border-radius: 10px;
    margin-top: 20px;
`;

const OverviewItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    span:first-child {
        font-size: 10px;
        font-weight: 400;
        text-transform: uppercase;
        margin-bottom: 5px;
    }
`;

const Description = styled.p`
    margin: 20px 0px;
`;

const Tabs = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin: 25px 0px;
    gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
    text-align: center;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 400;
    background-color: rgba(0,0,0,0.5);
    padding: 7px 0px;
    border-radius: 10px;
    color: ${(props) => props.isActive ? props.theme.accentColor : props.theme.textColor};
    a {
        display: block;
    }
`;

const HomeBtn = styled.span`
    position: fixed;
    top: 30px;
    left: 50px;
    background-color: ${(props) => props.theme.btnColor};
    width: 50px;
    height: 50px;
    border-radius: 25px;
    display:flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    box-shadow: 0px 3px rgba(0, 0, 0, 0.3);
    &:hover {
        color: ${(props) => props.theme.accentColor};
    }
`;




function Coin() {
    const { coinId } = useParams(); //react-router ver6 ?????? ???????????? string|undefined
    const { state } = useLocation() as RouteState; // ver6?????? ????????? ?????? x
    const priceMatch = useMatch(`/${coinId}/price`);
    const chartMatch = useMatch(`/${coinId}/chart`);
    const {isLoading: infoLoading, data: infoData} = useQuery<InfoData>(["info",coinId], () => fetchCoinInfo(coinId));
    const {isLoading: tickerLoading, data: tickerData} = useQuery<PriceData>(["ticker",coinId], () => fetchCoinTicker(coinId),
        {
            refetchInterval: 5000,
        }

    );
    /*
    const [loading, setLoading] = useState(true);
    const [info, setInfo] = useState<InfoData>();
    const [priceInfo, setPriceInfo] = useState<PriceData>();
    useEffect(() => {
        (async() => {
            const infoData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
            const priceData = await (await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();
            setInfo(infoData);
            setPriceInfo(priceData);
            setLoading(false);
        })();
    }, [coinId]) */
    const loading = infoLoading || tickerLoading;
        return  (
        <Container>
            <Helmet>
                <title>{state?.name ? state.name : loading ? "Loading..." : infoData?.name}</title>
            </Helmet>
            <HomeBtn>
                <Link to="/">&larr;</Link>
            </HomeBtn>

            <Header>
                <Title>{state?.name ? state.name : loading ? "Loading..." : infoData?.name}</Title>
            </Header>
            {loading ? (<Loader>Loading...</Loader>) : 
                <>
                    <Overview>
                        <OverviewItem>
                            <span>Rank:</span>
                            <span>{infoData?.rank}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Symbol:</span>
                            <span>{infoData?.symbol}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Price:</span>
                            <span>{`$ ${tickerData?.quotes.USD.price.toFixed(3)}`}</span>
                        </OverviewItem>
                    </Overview>
                    <Description>{infoData?.description}</Description>
                    <Overview>
                        <OverviewItem>
                            <span>Total Supply:</span>
                            <span>{tickerData?.total_supply}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Max Supply:</span>
                            <span>{tickerData?.max_supply}</span>
                        </OverviewItem>
                    </Overview>

  

                    <Tabs>
                        <Tab isActive={chartMatch !== null}> 
                            <Link to={`/${coinId}/chart`}>Chart</Link>
                        </Tab>
                        <Tab isActive={priceMatch !== null}>
                            <Link to={`/${coinId}/price`}>Price</Link>
                        </Tab>
                    </Tabs>
                   
                    <Outlet context={{coinId}} />
                </>
            }
        </Container>
        
    );
}

export default Coin;