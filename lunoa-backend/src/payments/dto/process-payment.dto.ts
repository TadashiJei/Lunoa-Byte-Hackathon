import { IsString, IsOptional } from 'class-validator';

export class ProcessPaymentDto {
  @IsString()
  paymentId: string;

  @IsString()
  paymentMethod: string;

  @IsOptional()
  @IsString()
  paymentToken?: string;

  @IsOptional()
  metadata?: Record<string, any>;
}
