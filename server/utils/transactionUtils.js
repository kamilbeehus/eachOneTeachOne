// Utility function for formatting transaction related responses
export const formatTransactionResponse = (transactions) => ({
  firstName: transactions.userId.firstName,
  lastName: transactions.userId.lastName,
  type: transactions.type,
  amount: transactions.amount,
  course: transactions.courseId.title,
  transactionDate: transactions.transactionDate,
});
