export const calculateTotalPrice = (item) => {
  return item.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.price * currentValue.quantity;
  }, 0);
};
