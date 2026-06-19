export const formatCurrency = (value) =>
  new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(value || 0);

export const formatDate = (value) =>
  value ? new Intl.DateTimeFormat('vi-VN').format(new Date(value)) : '';

