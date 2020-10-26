import { Types } from 'mongoose';

export class CreateTransactionForm {
  bankAccountId: Types.ObjectId;
  from: Types.ObjectId | null;
  to: Types.ObjectId | null;
  amount: number;
}
