import { IsEnum, IsString, IsNumber, IsOptional, IsUUID } from 'class-validator';

export enum PaymentStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

export enum PaymentMethod {
  XENDIT = 'xendit',
  BANK_TRANSFER = 'bank_transfer',
  GCASH = 'gcash',
  GRAB_PAY = 'grab_pay',
}

export class CreatePaymentDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  contractId: string;

  @IsNumber()
  amount: number;

  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @IsString()
  currency: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  metadata?: Record<string, any>;
}
