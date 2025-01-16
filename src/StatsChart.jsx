import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function StatsChart({ data }) {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Skill Proficiency',
        data: data.values,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Skill Proficiency Chart',
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <Bar data={chartData} options={options} />
    </div>
  );
}
