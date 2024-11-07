import { notFound } from "next/navigation";
import ChartLayout from "../components/Chart";
import FavoriteButton from "../components/FavoriteBtn";

export const revalidate = 60;

const fetchStockData = async () => {
    try {
        const res = await fetch(`http://localhost:3000/api/detail`);
        const data = await res.json();
        if (!data['Monthly Time Series']) {
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

    if (!stockData) {
        notFound();
    }

    const timeSeries = stockData['Monthly Time Series'];
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
                tension: 0.1,
            }
        ],
    };

    const latestTime = Object.keys(stockData['Monthly Time Series'])[0];
    const latestData = stockData['Monthly Time Series'][latestTime];
    const currentPrice = latestData['4. close'];

    return (
        <div className="flex flex-col items-center w-full mx-auto p-6">
            <h1 className="text-center text-3xl font-bold">Stock Detail: {symbol}</h1>
            <div className="mt-6 w-full">
                <div className="flex flex-wrap gap-6 justify-center">
                    <div className="flex flex-col items-center bg-zinc-700 p-6 rounded-lg w-full sm:w-1/2 lg:w-1/3 shadow-md">
                        <h2 className="text-xl font-semibold">Stock Info</h2>
                        <div className="mt-4">
                            <p><strong>Name:</strong> {symbol}</p>
                            <p><strong>Current Price:</strong> ${currentPrice}</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center bg-zinc-700 p-6 rounded-lg w-full sm:w-1/2 lg:w-1/3 shadow-md">
                        <h2 className="text-xl font-semibold">Additional Info</h2>
                        <div className="mt-4">
                            <p><strong>Open:</strong> {latestData['1. open']}</p>
                            <p><strong>High:</strong> {latestData['2. high']}</p>
                            <p><strong>Low:</strong> {latestData['3. low']}</p>
                            <p><strong>Volume:</strong> {latestData['5. volume']}</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center w-full mt-6">
                    <ChartLayout chartData={chartData} />
                </div>
                <div className="flex justify-center w-full">
                    <FavoriteButton stockSymbol={symbol}></FavoriteButton>
                </div>
            </div>
        </div>
    );
};

export default StockDetail;
