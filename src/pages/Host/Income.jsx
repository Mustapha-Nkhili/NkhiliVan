export function loader() {
  return null;
}

export default function Income() {
  const transactionsData = [
    { amount: 720, date: "Jan 3, 23", id: "1" },
    { amount: 560, date: "Dec 12, 22", id: "2" },
    { amount: 980, date: "Dec 3, 22", id: "3" },
  ];

  return (
    <div className="income">
      <h1>Income</h1>
      <div className="income-time">
        last <span className="days">30 days</span>
      </div>
      <span className="income-amount">$2260</span>
      <div className="flex-sb-ctr">
        <h2>Your transactions ({transactionsData.length})</h2>
        <div className="income-time">
          last <span className="days">30 days</span>
        </div>
      </div>
      <div className="transactions">
        {transactionsData.map((transaction) => {
          return (
            <div className="transaction flex-sb-ctr" key={transaction.id}>
              <span className="amount">{transaction.amount}</span>
              <span className="date">{transaction.date}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
