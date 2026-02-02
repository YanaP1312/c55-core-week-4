import transactions from './data.js';
import chalk from 'chalk';

export function addTransaction(type, category, amount, description, date) {
  const newTransaction = {
    id: transactions.length + 1,
    type,
    category,
    amount,
    description,
    date,
  };
  transactions.push(newTransaction);
  return newTransaction;
}

export function getTotalIncome(transactions) {
  let totalIncome = 0;
  for (const transaction of transactions) {
    if (transaction.type === 'income') {
      totalIncome += transaction.amount;
    }
  }
  return totalIncome;
}

export function getTotalExpenses(transactions) {
  let totalExpenses = 0;
  for (const transaction of transactions) {
    if (transaction.type === 'expense') {
      totalExpenses += transaction.amount;
    }
  }
  return totalExpenses;
}

export function getBalance(transactions) {
  const totalIncome = getTotalIncome(transactions);
  const totalExpenses = getTotalExpenses(transactions);
  const balance = totalIncome - totalExpenses;

  return balance;
}

export function getTransactionsByCategory(transactions, category) {
  let transactionByCategory = [];

  for (const transaction of transactions) {
    if (transaction.category === category) {
      transactionByCategory.push(transaction);
    }
  }

  return transactionByCategory;
}

export function getLargestExpense(transactions) {
  const expenseTransactions = transactions.filter(
    (transaction) => transaction.type === 'expense'
  );

  let largest = expenseTransactions[0].amount;

  for (const transaction of expenseTransactions) {
    if (transaction.amount > largest) {
      largest = transaction.amount;
    }
  }
  return largest;
}

export function printAllTransactions(transactions) {
  console.log(chalk.bold('All Transactions:'));
  for (const transaction of transactions) {
    const { id, type, category, amount, description } = transaction;

    const typeFormat =
      type === 'income'
        ? chalk.green(type.toUpperCase())
        : chalk.red(type.toUpperCase());

    const categoryFormat = getFirstCharacterToUp(chalk.yellow(category));

    const amountFormat = chalk.bold(amount);

    const descriptionFormat = description.toLowerCase();

    const formattingTransaction = `${id}. [${typeFormat}] ${categoryFormat} - €${amountFormat} (${descriptionFormat})`;
    console.log(formattingTransaction);
  }
}

export function printSummary(transactions) {
  const totalIncome = chalk.green(getTotalIncome(transactions));
  const totalExpenses = chalk.red(getTotalExpenses(transactions));
  const balance =
    getBalance(transactions) >= 0
      ? chalk.cyan(getBalance(transactions))
      : chalk.red(getBalance(transactions));
  const numOfTransactions = chalk.bold(transactions.length);
  const largestExpense = getLargestExpense(transactions);
  const largestExpenseForm = chalk.bold(largestExpense.amount);
  const largestExpenseDescr = getFirstCharacterToUp(largestExpense.description);

  const summary = `📊 FINANCIAL SUMMARY 📊 \nTotal Income: €${totalIncome}\nTotal Expenses: €${totalExpenses}\nCurrent Balance: €${balance}\n\nLargest Expense: ${largestExpenseDescr} (${largestExpenseForm})\nTotal Transactions: ${numOfTransactions}`;

  return summary;
}

function getFirstCharacterToUp(word) {
  return word[0].toUpperCase() + word.slice(1);
}

// if (balance >= 0) {
//     return chalk.bold.cyan(balance);
//   } else {
//     return chalk.bold.red(balance);
//   }
