export const numberWithCommas = (x) => {
  if (x === null) return "XXX,XXX";
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
