import { fetchCoinHistory } from "../api";
import { useQuery } from "react-query";
import ApexChart from "react-apexcharts";


interface IHistorical {
    time_open: string;
    time_close: string;
    open: number; //시작가
    high: number; //최고가
    low: number; //최저가
    close: number; //종가
    volume: number;
    market_cap: number;
}

interface ChartProps {
    coinId: string;
}

function Chart({coinId}:ChartProps) {
    const {isLoading, data} = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId),
        {
            refetchInterval: 10000,
        }
        
    );

    
    const dataArr = data?.map(data => ({x: data.time_close, y:[data.open.toFixed(2), data.high.toFixed(2), data.low.toFixed(2), data.close.toFixed(2)],}));
    

    return (<div>{isLoading ? ("Loading chart...") : (
            <ApexChart 
            type="candlestick" 
            series={[{
                    name: "Weeks Coin's Price",
                    data: dataArr,   
            }]}
            options={{
                theme: {
                    mode: "dark"
                },
                xaxis: {
                    type: "datetime",
                    labels: {
                        style: {
                            fontFamily: 'SuncheonB',
                        }
                    }
                },
                yaxis: {
                    labels: {
                        formatter: ((value) => `$ ${value}`),
                        style: {
                            fontFamily: 'SuncheonB',
                        }
                    }
                },
                chart: {
                    height: 300,
                    width: 500,
                    toolbar: {
                        show: false,
                    },
                    background: "rgba(0, 0, 0, 0.5)",
                },

            }}
            />
        )
    }
    </div>
    );
}

export default Chart;