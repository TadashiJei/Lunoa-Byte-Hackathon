import { IsString, IsEnum, IsOptional } from 'class-validator';

export enum MessageType {
  DIRECT = 'direct',
  GROUP = 'group',
  SYSTEM = 'system',
}

export class CreateMessageDto {
  @IsString()
  senderId: string;

  @IsString()
  recipientId: string;

  @IsString()
  content: string;

  @IsEnum(MessageType)
  type: MessageType;

  @IsOptional()
  metadata?: Record<string, any>;
}
