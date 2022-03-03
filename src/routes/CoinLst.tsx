import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { fetchCoin } from "../api";

const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CoinList = styled.ul``;

const Coin = styled.li`
    background-color: white;
    color: ${props => props.theme.bgColor};
    margin-bottom: 10px;
    border-radius: 15px;
    a {
        padding: 20px;
        transition: color 0.2s ease-in-out;
        display:flex;
        align-items: center;
    }
    &:hover {
        a {
            color: ${props => props.theme.accentColor};
        }
    }
`;

const Title = styled.h1`
    color:${props => props.theme.accentColor};
    font-size: 48px;
`;

const Loader = styled.span`
    text-align: center;
    display: block;
`;

const CoinIcon = styled.img`
    width: 35px;
    height: 35px;
    margin-right: 10px;
`;

interface ICoin {
    id:string,
    name:string,
    symbol:string,
    rank:number,
    is_new:boolean,
    is_active:boolean,
    type:string,
}

function CoinLst() {

   const {isLoading, data} = useQuery<ICoin[]>("allCoins", fetchCoin)
    /* const [coins, setCoins] = useState<CoinInterface[]>([])
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        (async() => {
            const response = await fetch("https://api.coinpaprika.com/v1/coins");
            const json = await response.json();
            setCoins(json.slice(0, 100));
            setLoading(false);
        })();
    }, []) */
    return (
        <Container>
            <Header>
                <Title>코인</Title>
            </Header>
            {isLoading ? (<Loader>Loading...</Loader>):(<CoinList>
                {data?.slice(0, 100).map((coin) => (
                    <Coin key={coin.id}>
                        <Link to={{
                            pathname:`/${coin.id}`,
                            state:{name: coin.name},
                        }}>
                            <CoinIcon src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
                            {coin.name} &rarr;
                        </Link>
                    </Coin>
                ))}
            </CoinList>
            )}
        </Container>
    );

}

export default CoinLst;