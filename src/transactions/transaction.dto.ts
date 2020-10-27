export class CreateTransactionForm {
  bankAccountId: string;
  from: string | null;
  to: string | null;
  amount: number;
}


export class ViewTransactionForm {
  bankAccountId: string;
  limit: number;
  offset: number;
}

export class UpdateTransactionForm {
  transactionsId: string;
  bankAccountId: string;
  amount: number;
}
