import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BankAccountModule } from 'src/bank-account/bank-account.module';
import {
  BankAccount,
  BankAccountSchema,
} from 'src/bank-account/bank-account.schema';

import { TransactionsController } from './transactions.controller';
import { Transaction, TransactionSchema } from './transactions.schema';
import { TransactionsService } from './transactions.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
      { name: BankAccount.name, schema: BankAccountSchema },
    ]),
    BankAccountModule,
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionModule {}
