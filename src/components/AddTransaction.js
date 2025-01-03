import React, { useState } from 'react';
import '../styles/AddTransaction.css';

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

function AddTransaction({ onAddTransaction }) {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    date: '',
    category: '',
    notes: '',
    type: 'expense'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTransaction({
      ...formData,
      amount: parseFloat(formData.amount),
      id: Date.now()
    });
    setFormData({
      name: '',
      amount: '',
      date: '',
      category: '',
      notes: '',
      type: 'expense'
    });
  };

  return (
    <div className="add-transaction">
      <h2>Add New Transaction</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Transaction Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label>Amount (DZD)</label>
          <input
            type="number"
            value={formData.amount}
            onChange={(e) => setFormData({...formData, amount: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({...formData, date: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            required
          >
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Notes (Optional)</label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
          />
        </div>

        <div className="type-buttons">
          <button
            type="button"
            className={`type-btn ${formData.type === 'income' ? 'active' : ''}`}
            onClick={() => setFormData({...formData, type: 'income'})}
          >
            Income
          </button>
          <button
            type="button"
            className={`type-btn ${formData.type === 'expense' ? 'active' : ''}`}
            onClick={() => setFormData({...formData, type: 'expense'})}
          >
            Expense
          </button>
        </div>

        <button type="submit" className="submit-btn">Add Transaction</button>
      </form>
    </div>
  );
}

export default AddTransaction;