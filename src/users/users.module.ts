import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersController } from './user.controller';
import { UsersService } from './users.service';
import { User, UserSchema } from './users.schema';
import { BankAccountModule } from '../bank-account/bank-account.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    BankAccountModule,
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
