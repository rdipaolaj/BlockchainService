// src/application/queries/handlers/retrieve-transaction.handler.ts
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RetrieveTransactionQuery } from '../retrieve-transaction.query';
import { TransactionVerificationService } from '../../../tangle/services/transaction-verification.service';
import { ApiResponse } from 'src/common/responses/api-response';

@QueryHandler(RetrieveTransactionQuery)
export class RetrieveTransactionHandler implements IQueryHandler<RetrieveTransactionQuery> {
    constructor(private readonly verificationService: TransactionVerificationService) {}

    async execute(query: RetrieveTransactionQuery): Promise<ApiResponse<any>> {
        const { blockId } = query;
        return await this.verificationService.retrieveTransaction(blockId);
    }
}