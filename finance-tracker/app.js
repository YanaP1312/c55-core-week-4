// This is the entrypoint for your application.
// node app.js
import {
  addTransaction,
  getTotalIncome,
  getTotalExpenses,
  getBalance,
  getTransactionsByCategory,
  getLargestExpense,
  printAllTransactions,
  printSummary,
} from './finance.js';
import transactions from './data.js';

addTransaction(
  'expense',
  'groceries',
  98,
  'Weekly supermarket shopping',
  '2025-01-25'
);

const totalIncome = getTotalIncome(transactions);
const totalExpenses = getTotalExpenses(transactions);
const balance = getBalance(transactions);
const transactionsByCategory = getTransactionsByCategory(
  transactions,
  'groceries'
);
const largestExpenseAmount = getLargestExpense(transactions);

console.log(transactions);
console.log(totalIncome);
console.log(totalExpenses);
console.log(balance);
console.log(transactionsByCategory);
console.log(largestExpenseAmount);

printAllTransactions(transactions);
console.log(printSummary(transactions));
