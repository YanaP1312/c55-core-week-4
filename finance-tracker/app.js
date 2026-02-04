// This is the entrypoint for your application.
// node app.js
import {
  addTransaction,
  calculateAverageExpensesPerCategory,
  findConsecutiveExpensiveMonth,
  getTransactionsByCategory,
  groupTransactionByMonth,
  printGeneralReport,
  removeTransactions,
  searchTransactionsByDateRange,
} from './finance.js';
import transactions from './data.js';

const newTransaction = addTransaction({
  id: 31,
  type: 'expense',
  category: 'groceries',
  amount: 98,
  description: 'Weekly supermarket shopping',
  date: '2026-01-25',
});

const transactionsByCategory = getTransactionsByCategory(
  transactions,
  'groceries'
);

const financeReport = printGeneralReport(transactions);

console.log(newTransaction, transactionsByCategory, financeReport);

//Bonus Challenges output
const transactionsByDateRange = searchTransactionsByDateRange(
  transactions,
  '2025-01-22',
  '2025-02-24'
);

// Node.js collapses nested objects inside arrays and prints them as [Object]. To see the full structure, I use JSON.stringify(). The second argument (null)means no custom replacer, and the third argument (2) adds indentation for readability.

const transactionsGroupedByMonth = JSON.stringify(
  groupTransactionByMonth(transactions),
  null,
  2
);

const averageExpensesPerCategory =
  calculateAverageExpensesPerCategory(transactions);

const remainingTransactions = removeTransactions(transactions, 3);

const consecutiveExpensiveMonths = findConsecutiveExpensiveMonth(transactions);

console.log(
  transactionsByDateRange,
  transactionsGroupedByMonth,
  averageExpensesPerCategory,
  remainingTransactions,
  consecutiveExpensiveMonths
);
