// src/application/commands/register-transaction.command.ts
export class RegisterTransactionCommand {
    constructor(
        public readonly transactionData: { [key: string]: any }, // Datos de la transacción
        public readonly tag: string // Tag dinámico
    ) {}
}