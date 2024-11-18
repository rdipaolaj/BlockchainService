// src/tangle/interfaces/transaction-verification.interface.ts
import { ApiResponse } from 'src/common/responses/api-response';

export interface ITransactionVerificationService {
    retrieveTransaction(blockId: string): Promise<ApiResponse<any>>;
}
