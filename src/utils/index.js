export const formatCurrent = value => {
  const number = Number(value);

  return new Intl.NumberFormat('pl', { style: 'currency', currency: 'PLN' }).format(number);
};

export const formatData = string => {
  const data = new Date(string);

  return new Intl.DateTimeFormat('pl').format(data);
};