export const calculateTotalIncome = (transactions) => {
    return transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
  };
  
  export const calculateTotalExpenses = (transactions) => {
    return transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
  };
  
  export const calculateBalance = (income, expenses) => {
    return income - expenses;
  };
