export const generateYears =(from, to) =>{
  const years = [];
  for (let year = from; year <= to; year++) {
    years.push(year);
  }
  console.log(years);
  return years;
}