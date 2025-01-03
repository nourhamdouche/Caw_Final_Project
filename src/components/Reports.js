import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { formatCurrency } from '../utils/formatters';
import '../styles/Reports.css';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

function Reports({ transactions }) {
  // Calculate monthly totals
  const monthlyData = transactions.reduce((acc, t) => {
    const month = t.date.substring(0, 7);
    if (!acc[month]) {
      acc[month] = { income: 0, expenses: 0 };
    }
    if (t.type === 'income') {
      acc[month].income += t.amount;
    } else {
      acc[month].expenses += t.amount;
    }
    return acc;
  }, {});

  // Calculate category totals
  const categoryData = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  // Prepare data for pie chart
  const pieData = {
    labels: Object.keys(categoryData),
    datasets: [{
      data: Object.values(categoryData),
      backgroundColor: [
        '#f44336', '#2196f3', '#4caf50', '#ffc107', 
        '#9c27b0', '#00bcd4', '#ff9800', '#795548'
      ]
    }]
  };

  // Prepare data for bar chart
  const months = Object.keys(monthlyData).sort();
  const barData = {
    labels: months,
    datasets: [
      {
        label: 'Income',
        data: months.map(m => monthlyData[m].income),
        backgroundColor: 'rgba(76, 175, 80, 0.6)',
        borderColor: '#4caf50',
        borderWidth: 1
      },
      {
        label: 'Expenses',
        data: months.map(m => monthlyData[m].expenses),
        backgroundColor: 'rgba(244, 67, 54, 0.6)',
        borderColor: '#f44336',
        borderWidth: 1
      }
    ]
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Income vs Expenses'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: value => formatCurrency(value)
        }
      }
    }
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Expense Distribution by Category'
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${context.label}: ${formatCurrency(value)} (${percentage}%)`;
          }
        }
      }
    }
  };

  return (
    <div className="reports">
      <h2>Financial Reports</h2>
  
      <div className="chart-row">
        <div className="chart-container">
          <Bar data={barData} options={barOptions} />
        </div>
  
        <div className="chart-container">
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>
    </div>
  );
  
  }

export default Reports;