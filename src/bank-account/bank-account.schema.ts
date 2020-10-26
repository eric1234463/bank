import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BankAccountDocument = BankAccount & Document;

@Schema()
export class BankAccount {
  @Prop({ required: true })
  userId: Types.ObjectId;

  @Prop({ required: true, default: 0 })
  totalBalance: number;

  @Prop({ required: true, default: 'HKD' })
  currency: string;
}

export const BankAccountSchema = SchemaFactory.createForClass(BankAccount);
