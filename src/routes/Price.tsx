import styled from "styled-components";
import { useQuery } from "react-query";
import { fetchCoinTicker } from "../api";


interface PriceProps {
    coinId: string;
}


interface IPriceData {
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

const PriceContainer = styled.div`
    display: flex;
    justify-content:center;
    align-items: center;
    flex-direction: column;
    width: 440px;
    height: 300px;
`;

const PriceRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 50%;
`;

const PriceTile = styled.div`
    background-color: rgba(0, 0, 0, 0.5);
    width: 48%;
    height: 95%;
    border-radius: 10px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
`;

const PriceTitle = styled.span`
    color: ${props => props.theme.accentColor};
`;



function Price({coinId}:PriceProps) {
    const {isLoading: priceLoading, data: priceData} = useQuery<IPriceData>(["ticker", coinId], () => fetchCoinTicker(coinId),
        {
            refetchInterval: 10000,
        }
        
    );


    

    return (<div>{priceLoading ? ("Loading chart...") : (
            <PriceContainer>
                <PriceRow>
                    <PriceTile>
                        <PriceTitle>Current Price:</PriceTitle>
                        <span>{`$ ${priceData?.quotes.USD.price.toFixed(2)}`}</span>
                        <span>{`${priceData?.quotes.USD.percent_change_24h}%`}</span>
                    </PriceTile>
                    <PriceTile>
                        <PriceTitle>Market Cap:</PriceTitle>
                        <span>{`$ ${priceData?.quotes.USD.market_cap.toFixed(2)}`}</span>
                    </PriceTile>
                </PriceRow>
                <PriceRow>
                    <PriceTile>
                        <PriceTitle>All Time High: </PriceTitle>
                        <span>{`$ ${priceData?.quotes.USD.ath_price.toFixed(2)}`}</span>
                    </PriceTile>
                    <PriceTile>
                        <PriceTitle>All Time High's Date</PriceTitle>
                        <span>{`${priceData?.quotes.USD.ath_date}`}</span>
                    </PriceTile>
                </PriceRow>
            </PriceContainer>
        )
    }
    </div>
    );
}

export default Price;