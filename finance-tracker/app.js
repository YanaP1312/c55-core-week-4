// This is the entrypoint for your application.
// node app.js
import {
  addTransaction,
  getTransactionsByCategory,
  printGeneralReport,
} from './finance.js';
import transactions from './data.js';

console.log(
  addTransaction(
    'expense',
    'groceries',
    98,
    'Weekly supermarket shopping',
    '2025-01-25'
  )
);

console.log(getTransactionsByCategory(transactions, 'groceries'));

console.log(printGeneralReport(transactions));
