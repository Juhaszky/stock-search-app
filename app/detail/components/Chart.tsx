'use client'
import { Line } from "react-chartjs-2";
import 'chart.js/auto';

const ChartLayout = ({ chartData }: {
    chartData: {
        labels: string[];
        datasets: {
            label: string;
            data: number[];
            borderColor: string;
            backgroundColor: string;
            tension: number;
        }[];
    }
}) => {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div className="w-full md:w-3/4	 h-80">
            <Line data={chartData} options={options} />
        </div>
    );
}

export default ChartLayout;
