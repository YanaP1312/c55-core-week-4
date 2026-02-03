// This is the entrypoint for your application.
// node app.js
import {
  addTransaction,
  calculateAverageExpensesPerCategory,
  getTransactionsByCategory,
  groupTransactionByMonth,
  printGeneralReport,
  searchTransactionsByDate,
} from './finance.js';
import transactions from './data.js';

console.log(
  addTransaction(
    'expense',
    'groceries',
    98,
    'Weekly supermarket shopping',
    '2026-01-25'
  )
);

// console.log(getTransactionsByCategory(transactions, 'groceries'));

// console.log(printGeneralReport(transactions));

//Bonus Challenges output
// console.log(searchTransactionsByDate(transactions, '2025-01-22', '2025-02-24'));

// Node.js collapses nested objects inside arrays and prints them as [Object]. To see the full structure, I use JSON.stringify(). The second argument (null)means no custom replacer, and the third argument (2) adds indentation for readability.

// console.log(JSON.stringify(groupTransactionByMonth(transactions), null, 2));

// console.log(calculateAverageExpensesPerCategory(transactions));
