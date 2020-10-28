import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Types } from 'mongoose';

import { BankAccountService } from './bank-account.service';
import { BankAccount } from './bank-account.schema';

describe('BankAccountService', () => {
  let service: BankAccountService;
  const bank = { userId: Types.ObjectId() };
  const modal = {
    findOneAndUpdate: jest.fn().mockReturnValue(bank),
    findOne: jest.fn().mockReturnValue(bank),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BankAccountService,
        {
          provide: getModelToken(BankAccount.name),
          useValue: modal,
        },
      ],
    }).compile();

    service = module.get<BankAccountService>(BankAccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#create', () => {
    it('return a bank document', async () => {
      const result = await service.create({
        userId: bank.userId,
      });

      expect(modal.findOneAndUpdate).toBeCalledWith(
        { userId: bank.userId },
        { userId: bank.userId },
        { new: true, upsert: true, setDefaultsOnInsert: true },
      );
      expect(result).toEqual(bank);
    });
  });

  describe('#findOneByIdAndUserId', () => {
    it('return a bank document', async () => {
      const result = await service.findOneByIdAndUserId('123', '123');

      expect(modal.findOne).toBeCalledWith({ _id: '123', userId: '123' });
      expect(result).toEqual(bank);
    });
  });
});
