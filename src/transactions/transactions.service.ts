import {
  Injectable,
  UnprocessableEntityException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BankAccountService } from 'src/bank-account/bank-account.service';
import {
  CreateTransactionForm,
  UpdateTransactionForm,
  ViewTransactionForm,
} from './transaction.dto';
import { Transaction, TransactionDocument } from './transactions.schema';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name)
    private transaction: Model<TransactionDocument>,
    private bankAccountService: BankAccountService,
  ) {}

  async create(payload: CreateTransactionForm): Promise<TransactionDocument> {
    if (payload.from) {
      const fromBankAccount = await this.bankAccountService.findOneById(
        payload.from,
      );
      if (!fromBankAccount) {
        throw new UnprocessableEntityException('no from bank account found');
      }
      fromBankAccount.totalBalance =
        fromBankAccount.totalBalance - payload.amount;
      await fromBankAccount.save();
    }

    if (payload.to) {
      const toBankAccount = await this.bankAccountService.findOneById(
        payload.to,
      );

      if (!toBankAccount) {
        throw new UnprocessableEntityException('no to bank account found');
      }
      toBankAccount.totalBalance = toBankAccount.totalBalance + payload.amount;
      await toBankAccount.save();
    }

    const transaction = await this.transaction.create(payload);

    return transaction;
  }

  async update(payload: UpdateTransactionForm): Promise<TransactionDocument> {
    const transaction = await this.transaction.findById(payload.transactionsId);

    if (!transaction) {
      throw new NotFoundException('transaction not found');
    }

    if (transaction.from && transaction.to) {
      throw new UnprocessableEntityException('unable handle operation');
    } else if (transaction.from) {
      await this.updateWithdrawTransaction(transaction, payload.amount);
    } else if (transaction.to) {
      await this.updateDepositTransaction(transaction, payload.amount);
    }

    transaction.amount = payload.amount;

    await transaction.save();
    return transaction;
  }

  async updateWithdrawTransaction(
    transaction: TransactionDocument,
    newAmount: number,
  ) {
    const bankAccount = await this.bankAccountService.findOneById(
      transaction.from,
    );
    const diffAmount = transaction.amount - newAmount;

    bankAccount.totalBalance = bankAccount.totalBalance + diffAmount;

    await bankAccount.save();

    return bankAccount;
  }

  async updateDepositTransaction(
    transaction: TransactionDocument,
    newAmount: number,
  ) {
    const bankAccount = await this.bankAccountService.findOneById(
      transaction.to,
    );
    const diffAmount = newAmount - transaction.amount;

    bankAccount.totalBalance = bankAccount.totalBalance + diffAmount;

    await bankAccount.save();

    return bankAccount;
  }

  async index({
    bankAccountId,
    limit = 24,
    offset = 0,
  }: ViewTransactionForm): Promise<TransactionDocument[]> {
    return this.transaction
      .find({
        $or: [
          {
            to: bankAccountId,
          },
          {
            from: bankAccountId,
          },
        ],
      })
      .limit(limit)
      .skip(offset);
  }

  hideSensitiveInfo(transaction: TransactionDocument, shouldHide: boolean) {
    const newTransaction = transaction.toJSON();
    const hideKeys = ['from', 'to', 'amount'];
    if (shouldHide) {
      const digit = 4;
      const argRegEx = new RegExp(`[\\s\\S]*(?=\\S{${digit}})`);
      hideKeys.forEach(key => {
        const value = String(transaction[key]);
        if (value.length > digit) {
          newTransaction[key] = value.replace(
            argRegEx,
            '*'.repeat(value.length - digit),
          );
        }
      });
    }

    return newTransaction;
  }
}
