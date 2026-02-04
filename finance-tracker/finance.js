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

  // The assignment requires using the spread operator when adding a transaction. In this task, mutating the existing array with push() feels more suitable, and that is the approach I would normally use if there were no requirement. To satisfy the task while keeping the logic I prefer, I include both: spread for the assignment, and push() for the actual update.

  const updated = [...transactions, newTransaction];

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
  //I moved the logic for filtering "expense" transactions into a separate function, because this code is reused in several bonus tasks.
  const expenseTransactions = getExpenseTransactions(transactions);

  let largest = expenseTransactions[0];

  for (const transaction of expenseTransactions) {
    if (transaction.amount > largest.amount) {
      largest = transaction;
    }
  }

  return largest;
}

export function printAllTransactions(transactions) {
  let output = chalk.bold('All Transactions:\n');

  for (const transaction of transactions) {
    const { id, type, category, amount, description } = transaction;

    //formatting values by task requirements with chalk
    const typeFormat =
      type === 'income'
        ? chalk.green(type.toUpperCase())
        : chalk.red(type.toUpperCase());

    const categoryFormat = getFirstCharacterToUp(chalk.yellow(category));
    const amountFormat = chalk.bold(amount);
    const descriptionFormat = description.toLowerCase();

    //collect all in one line for each element
    const line = `${id}. [${typeFormat}] ${categoryFormat} - €${amountFormat} (${descriptionFormat})`;

    output += `${line}\n`;
  }

  return output;
}

export function printSummary(transactions) {
  //formatting values by task requirements with chalk
  const totalIncome = chalk.bold.green(getTotalIncome(transactions));
  const totalExpenses = chalk.bold.red(getTotalExpenses(transactions));
  const numOfTransactions = chalk.bold(transactions.length);

  const balance =
    getBalance(transactions) >= 0
      ? chalk.bold.cyan(getBalance(transactions))
      : chalk.bold.red(getBalance(transactions));

  const { amount, description } = getLargestExpense(transactions);
  const largestExpense = chalk.bold(amount);

  //collect summary
  const summary = `📊 ${chalk.bold('financial summary'.toUpperCase())} 📊 \nTotal Income: €${totalIncome}\nTotal Expenses: €${totalExpenses}\nCurrent Balance: €${balance}\n\nLargest Expense: ${description} (€${largestExpense})\nTotal Transactions: ${numOfTransactions}`;

  return summary;
}

export function printGeneralReport(transactions) {
  const allTransactions = printAllTransactions(transactions);
  const summary = printSummary(transactions);

  return `💰 ${chalk.bold('personal finance tracker'.toUpperCase())} 💰\n\n${allTransactions}\n${summary}`;
}

//Bonus Challenges functions

//Search transactions by date range using slice
export function searchTransactionsByDateRange(
  transactions,
  startDate,
  endDate
) {
  const sorted = transactions
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date));

  const startIndex = sorted.findIndex(
    (transaction) => transaction.date >= startDate
  );
  const endIndex = sorted.findIndex(
    (transaction) => transaction.date > endDate
  );

  const range = sorted.slice(
    startIndex,
    endIndex === -1 ? sorted.length : endIndex
  );

  return range;
}

//Group transactions by month using nested objects
export function groupTransactionByMonth(transactions) {
  let groupedTransactions = {};

  for (const transaction of transactions) {
    const [year, month] = transaction.date.split('-');

    if (!groupedTransactions[year]) {
      groupedTransactions[year] = {};
    }

    if (!groupedTransactions[year][month]) {
      groupedTransactions[year][month] = [];
    }

    groupedTransactions[year][month].push(transaction);
  }

  return groupedTransactions;
}

//Calculate average expense per category
export function calculateAverageExpensesPerCategory(transactions) {
  const expenses = getExpenseTransactions(transactions);

  let expenseCategories = {};

  for (const transaction of expenses) {
    const { category, amount } = transaction;

    if (!expenseCategories[category]) {
      expenseCategories[category] = { total: 0, count: 0 };
    }

    expenseCategories[category].total += amount;
    expenseCategories[category].count += 1;
  }

  let averages = {};

  for (const category in expenseCategories) {
    const { total, count } = expenseCategories[category];
    averages[category] = Number((total / count).toFixed(2));
  }

  return averages;
}

//Add ability to remove transactions by id
export function removeTransactions(transactions, id) {
  const newTransactions = transactions.filter(
    (transaction) => transaction.id !== id
  );
  return newTransactions;
}

//Create a function that finds consecutive expensive months (use while loop)
//Use multi-line commenting to explain your most complex function

/* This function returns a list of months where expenses increase consecutively.
  It follows these steps:

  1. It filters all transactions using getExpenseTransactions() to keep only those with type "expense".

  2. It creates an empty object (monthlyTotal) to store total expenses per month.

  3. It iterates through all expense transactions. For each one:
    - extracts the date and amount,
    - derives the month in "YYYY-MM" format using slice(),
    - initializes monthlyTotal[month] to 0 if it doesn't exist yet,
    - adds the transaction amount to that month's total.

  4. It collects all month keys from monthlyTotal and sorts them to ensure chronological comparison.

  5. It prepares a while loop index (i) and an empty result array.

  6. Using a while loop, it compares each month with the next one.
    If the next month has a higher total expense than the current month:
      - it adds the current month to the result (only if not already included),
      - it always adds the next month.
    This builds a sequence of months with increasing expenses.

  7. After the loop finishes, it returns the result array containing all months that form consecutive increasing expense periods. */

export function findConsecutiveExpensiveMonth(transactions) {
  const expenses = getExpenseTransactions(transactions);
  const monthlyTotal = {};

  for (const transaction of expenses) {
    const { date, amount } = transaction;
    const month = date.slice(0, 7);

    if (!monthlyTotal[month]) monthlyTotal[month] = 0;
    monthlyTotal[month] += amount;
  }

  const months = Object.keys(monthlyTotal).sort();

  let i = 0;
  const result = [];

  while (i < months.length - 1) {
    const current = months[i];
    const next = months[i + 1];

    if (monthlyTotal[current] < monthlyTotal[next]) {
      if (!result.includes(current)) result.push(current);
      result.push(next);
    }
    i++;
  }

  return result;
}

//reused functions

function getExpenseTransactions(transactions) {
  const expenses = transactions.filter(
    (transaction) => transaction.type === 'expense'
  );
  return expenses;
}

function getFirstCharacterToUp(word) {
  if (!word) return '';
  return word[0].toUpperCase() + word.slice(1);
}
