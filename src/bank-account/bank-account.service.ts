import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types} from 'mongoose';
import { BankAccount, BankAccountDocument } from './bank-account.schema';
import { CreateBankAccountForm } from './create-bank-account.dto';

@Injectable()
export class BankAccountService {
  constructor(
    @InjectModel(BankAccount.name)
    private bankaAccount: Model<BankAccountDocument>,
  ) {}

  async create(payload: CreateBankAccountForm): Promise<BankAccountDocument> {
    const account = await this.bankaAccount.findOneAndUpdate(
      { userId: payload.userId },
      { userId: payload.userId },
      { new: true, upsert: true, setDefaultsOnInsert: true },
    );

    return account;
  }

  async findOneByUserId(userId: string) {
    return this.bankaAccount.findOne({ userId });
  }

  async findOneById(id: string | Types.ObjectId) {
    return this.bankaAccount.findById(id);
  }

  async findOneByIdAndUserId(id: string, userId: string) {
    return this.bankaAccount.findOne({
      _id: id,
      userId,
    });
  }
}
