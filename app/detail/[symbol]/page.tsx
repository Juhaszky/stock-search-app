import { notFound } from "next/navigation";
import ChartLayout from "../components/Chart";

export const revalidate = 60;

const fetchStockData = async () => {
    try {
        const res = await fetch(`http://localhost:3000/api/detail`);
        const data = await res.json();
        console.log(data);
        if (!data['Time Series (5min)']) {
            throw new Error("Stock data not available");
        }
        return data;
    } catch (error) {
        console.error("Error fetching stock data:", error);
        return null;
    }

};

const StockDetail = async ({ params }: { params: { symbol: string } }) => {
    const { symbol } = await params;
    const stockData = await fetchStockData();
    const timeSeries = stockData['Time Series (5min)'];
    console.log(timeSeries);
    const dates = Object.keys(timeSeries).reverse();
    const prices: number[] = dates.map(date => timeSeries[date]['4. close']);

    const chartData = {
        labels: dates,
        datasets: [
            {
                label: 'Price',
                data: prices,
                borderColor: '#9333ea',
                backgroundColor: '#4c1d95',
                tension: 0.1
            }
        ]
    };
    if (!stockData) {
        notFound();
    }

    const latestTime = Object.keys(stockData['Time Series (5min)'])[0];
    const latestData = stockData['Time Series (5min)'][latestTime];
    const currentPrice = latestData['4. close'];

    return (
        <div className="flex flex-col items-center w-full mx-auto p-6">
            <h1 className="text-3xl font-bold">Stock Detail: {symbol}</h1>
            <div className="mt-6">
                <div className="text-lg">
                    <p>Name: {symbol}</p>
                    <p>Current Price: ${currentPrice}</p>
                </div>
            </div>
            <div className="flex justify-center w-full mt-6">
                <ChartLayout chartData={chartData}></ChartLayout>
                
            </div>

        </div>
    );
};

export default StockDetail;
