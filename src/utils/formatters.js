export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('fr-DZ', {
    style: 'currency',
    currency: 'DZD'
  }).format(amount);
};