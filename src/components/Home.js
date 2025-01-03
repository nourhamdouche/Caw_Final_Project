import React from 'react';
import '../styles/Home.css';

function Home({ transactions }) {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="home">
      <h2>Welcome to Masroofy</h2>
      <div className="summary-cards">
        <div className="card income">
          <h3>Total Income</h3>
          <p>{totalIncome.toFixed(2)} DZD</p>
          <span className="icon">💰</span>
        </div>
        <div className="card expenses">
          <h3>Total Expenses</h3>
          <p>{totalExpenses.toFixed(2)} DZD</p>
          <span className="icon">💸</span>
        </div>
        <div className="card balance">
          <h3>Balance</h3>
          <p>{balance.toFixed(2)} DZD</p>
          <span className="icon">⚖️</span>
        </div>
      </div>
    </div>
  );
}

export default Home;
