import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTransactionForm } from './create-transaction.dto';
import { Transaction, TransactionDocument } from './transactions.schema';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name)
    private bankaAccount: Model<TransactionDocument>,
  ) {}

  async create(payload: CreateTransactionForm): Promise<TransactionDocument> {
    const account = await this.bankaAccount.create(payload);

    return account;
  }
}
