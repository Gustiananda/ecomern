// Convert numbers into price format with dot separator
export const toFormatPrice = (
  number,
  currency,
  withTextCurrency
) => {
  if (number === '' || number === null) return '';
  const parsedNumber = Number(number);
  if (Number.isNaN(parsedNumber)) return '';
  const locale = currency === 'IDR' ? 'id-ID' : 'en-US';
  let currencyText = currency ?? '';
  // let result = new Intl.NumberFormat(locale).format(parsedNumber);
  return `${currencyText} ${new Intl.NumberFormat(locale).format(parsedNumber)}`;
  // return result;
};

// Convert string price format into number
export const convertPriceStringToNumber = (
  value) => {
  value = String(value);
  const normalizedValue = (value || '').replace(/[^0-9]/g, '');
  const result = parseInt(normalizedValue, 10);
  if (Number.isNaN(result)) return 0;
  return result;
};
