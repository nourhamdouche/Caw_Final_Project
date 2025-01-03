import React, { useState } from 'react';
import '../styles/TransactionList.css';

const categories = [
  'Groceries',
  'Transportation',
  'Entertainment',
  'Bills',
  'Shopping',
  'Health',
  'Education',
  'Other'
];

function TransactionList({ transactions, onDeleteTransaction, onEditTransaction }) {
  const [filter, setFilter] = useState({ category: '', date: '' });
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [formData, setFormData] = useState(null);

  const filteredTransactions = transactions.filter(transaction => {
    const matchCategory = !filter.category || transaction.category === filter.category;
    const matchDate = !filter.date || transaction.date === filter.date;
    return matchCategory && matchDate;
  });

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setFormData(transaction);
  };

  const handleSave = (e) => {
    e.preventDefault();
    onEditTransaction({
      ...formData,
      amount: parseFloat(formData.amount),
    });
    setEditingTransaction(null);
    setFormData(null);
  };

  return (
    <div className="transaction-list">
      <h2>Transactions</h2>
      
      <div className="filters">
        <select
          value={filter.category}
          onChange={(e) => setFilter({ ...filter, category: e.target.value })}
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <input
          type="date"
          value={filter.date}
          onChange={(e) => setFilter({ ...filter, date: e.target.value })}
        />
      </div>

      <div className="transactions">
        {filteredTransactions.map(transaction => (
          <div 
            key={transaction.id} 
            className={`transaction-item ${transaction.type}`}
          >
            <div className="transaction-info">
              <h3>{transaction.name}</h3>
              <p className="amount">{transaction.amount.toFixed(2)} DZD</p>
              <p className="details">
                <span>{transaction.category}</span>
                <span>{transaction.date}</span>
              </p>
              {transaction.notes && <p className="notes">{transaction.notes}</p>}
            </div>
            <div className="actions">
              <button onClick={() => onDeleteTransaction(transaction.id)}>
                Delete
              </button>
              <button onClick={() => handleEdit(transaction)}>
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingTransaction && (
        <div className="edit-transaction-overlay">
          <div className="edit-transaction">
            <h2>Edit Transaction</h2>
            <form onSubmit={handleSave}>
              <div className="form-group">
                <label>Transaction Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Amount (DZD)</label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Notes (Optional)</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>

              <div className="type-buttons">
                <button
                  type="button"
                  className={`type-btn ${formData.type === 'income' ? 'active' : ''}`}
                  onClick={() => setFormData({ ...formData, type: 'income' })}
                >
                  Income
                </button>
                <button
                  type="button"
                  className={`type-btn ${formData.type === 'expense' ? 'active' : ''}`}
                  onClick={() => setFormData({ ...formData, type: 'expense' })}
                >
                  Expense
                </button>
              </div>

              <div className="edit-actions">
                <button type="submit" className="save-btn">Save Changes</button>
                <button 
                  type="button" 
                  className="cancel-btn" 
                  onClick={() => {
                    setEditingTransaction(null);
                    setFormData(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default TransactionList;
