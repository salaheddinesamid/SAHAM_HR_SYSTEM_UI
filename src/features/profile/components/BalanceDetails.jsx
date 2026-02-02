export const BalanceDetails = () => {
    const user = JSON.parse(localStorage.getItem("userDetails"));
    
    const balances = [
        { type: `Solde ${user?.balanceDetails?.year}`, days: user?.balanceDetails?.currentBalance },
        { type: "Droit annuel", days: user?.balanceDetails?.annualBalance },
        { type: "Jours Cumulés", days: user?.balanceDetails?.accumulatedBalance },
        { type: "Pris", days: user?.balanceDetails.usedBalance},
        { type: "Reliquat", days: user?.balanceDetails.reminderBalance },
    ];
    
    return (
    <>
      <h2>Solde de congé</h2>

      <div className="balance-grid">
        {balances.map((b) => (
          <div key={b.type} className="balance-card">
            <h3>{b.days}</h3>
            <p>{b.type}</p>
          </div>
        ))}
      </div>
    </>
  );
};
