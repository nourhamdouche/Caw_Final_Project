import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import AddTransaction from './components/AddTransaction';
import TransactionList from './components/TransactionList';
import Reports from './components/Reports';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState([]);

  const handleAddTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const handleEditTransaction = (transaction) => {
    setTransactions(transactions.map(t => 
      t.id === transaction.id ? transaction : t
    ));
  };

  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home transactions={transactions} />} />
            <Route 
              path="/add" 
              element={<AddTransaction onAddTransaction={handleAddTransaction} />} 
            />
            <Route 
              path="/list" 
              element={
                <TransactionList 
                  transactions={transactions}
                  onDeleteTransaction={handleDeleteTransaction}
                  onEditTransaction={handleEditTransaction}
                />
              } 
            />
            <Route path="/reports" element={<Reports transactions={transactions} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
