import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function StatsChart() {
  const chartData = {
    labels: ['JavaScript', 'Python', 'C++', 'Java', 'PHP', 'CSS & Figma'],
    datasets: [
      {
        label: 'Skill Level',
        data: [70, 65, 80, 75, 60, 85],
        backgroundColor: 'rgba(76, 29, 149, 0.2)', 
        borderColor: 'rgba(76, 29, 149, 1)',
        borderWidth: 1, 
        borderRadius: 10, 
        barPercentage: 0.8,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#4C1D95', 
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#4C1D95', 
        },
        grid: {
          color: 'rgba(76, 29, 149, 0.2)', 
        },
      },
      y: {
        ticks: {
          color: '#4C1D95', 
        },
        grid: {
          color: 'rgba(76, 29, 149, 0.2)', 
        },
      },
    },
  };

  return (
    <div className="bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-6 rounded-xl shadow-lg border border-purple-200 mt-8">
      <h2 className="text-2xl font-bold text-purple-800 mb-4 text-center">
        Programming Skills
      </h2>
      <Bar data={chartData} options={options} />
    </div>
  );
}
