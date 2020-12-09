export function numberWithDot(number) {
  if (typeof number !== 'number') return;
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
