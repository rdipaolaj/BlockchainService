// src/application/commands/dtos/register-transaction.dto.ts
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class RegisterTransactionDto {
    @IsNotEmpty()
    @IsString()
    address: string; // La dirección del destinatario

    @IsNotEmpty()
    @IsNumber()
    amount: number; // La cantidad a enviar
}