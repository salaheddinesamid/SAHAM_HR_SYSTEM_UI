export const expenseAmountMapper = (amount)=>{
    return amount?.toLocaleString('fr-FR', { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 2 
    })
}