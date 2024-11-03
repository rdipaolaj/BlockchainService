// src/application/commands/dtos/register-transaction.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsObject } from 'class-validator';

export class RegisterTransactionDto {
    @ApiProperty({
        description: 'Tag que se usará en la transacción',
        example: 'transaction-tag',
    })
    @IsString({ message: 'El tag debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El tag no puede estar vacío' })
    tag: string;

    @ApiProperty({
        description: 'Datos de la transacción que se registrará en Tangle',
        example: { amount: 1000, currency: 'USD', "...": '...' },
    })
    @IsObject({ message: 'transactionData debe ser un objeto' })
    @IsNotEmpty({ message: 'transactionData no puede estar vacío' })
    transactionData: { [key: string]: any };

    constructor(tag: string, transactionData: { [key: string]: any }) {
        this.tag = tag;
        this.transactionData = transactionData;
    }
}