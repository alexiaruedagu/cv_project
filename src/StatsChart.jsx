import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Registro de los componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function StatsChart() {
  // Datos del gráfico
  const chartData = {
    labels: ['JavaScript', 'Python', 'C++', 'Java', 'PHP'],
    datasets: [
      {
        label: 'Skill Level',
        data: [95, 85, 75, 80, 70],
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Opciones del gráfico
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#4C1D95', // Color de las etiquetas
        },
      },
      title: {
        display: true,
        text: 'Programming Languages Skill Level',
        color: '#4C1D95', // Color del título
        font: {
          size: 18,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#4C1D95',
        },
      },
      y: {
        ticks: {
          color: '#4C1D95',
        },
      },
    },
  };

  return (
    <div className="bg-white bg-opacity-80 p-6 rounded-xl shadow-lg border border-purple-200 mt-8">
      <Bar data={chartData} options={options} />
    </div>
  );
}
