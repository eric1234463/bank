import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BankAccountService } from './bank-account.service';
import { BankAccountController } from './bank-account.controller';
import { BankAccount, BankAccountSchema } from './bank-account.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BankAccount.name, schema: BankAccountSchema }]),
  ],
  providers: [
    BankAccountService,
  ],
  controllers: [BankAccountController],
  exports: [BankAccountService],
})
export class BankAccountModule {}
