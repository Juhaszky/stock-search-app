'use client'
import { Line } from "react-chartjs-2";
import 'chart.js/auto';
import { ChartData } from "@/app/models/ChartData";
import React from "react";

const ChartLayout: React.FC<{ chartData: ChartData }> = ({ chartData }: {
    chartData: ChartData
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
