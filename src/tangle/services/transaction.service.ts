// src/tangle/services/transaction.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { Client, TaggedDataPayload, utf8ToHex } from '@iota/sdk';
import { ApiResponseHelper } from '@app/common/responses/api-response.helper';
import { ApiResponse } from '@app/common/responses/api-response';
import { ApiErrorCode } from '@app/common/enums/api-error-code.enum';
import { ITransactionService } from '../interfaces/transaction-service.interface';

@Injectable()
export class TransactionService implements ITransactionService {
    private readonly client: Client;
    private readonly logger = new Logger(TransactionService.name);

    constructor() {
        this.client = new Client({
            nodes: ['http://3.92.78.140:14265'], // Nodo de IOTA
        });
    }

    async registerTransaction(payloadData: any, tag: string = 'default-tag'): Promise<ApiResponse<any>> {
        this.logger.log('Received payload data for transaction:', JSON.stringify(payloadData));
        try {
            if (!payloadData || Object.keys(payloadData).length === 0) {
                return ApiResponseHelper.createErrorResponse<any>(
                    'Payload data is empty or invalid.',
                    400,
                    [{ code: ApiErrorCode.InvalidData.toString(), description: 'No data provided to create block.' }]
                );
            }

            const payload = new TaggedDataPayload(
                utf8ToHex(tag),
                utf8ToHex(JSON.stringify(payloadData))
            );
            const [blockId, block] = await this.client.postBlockPayload(payload);
            this.logger.log('Transaction registered on Tangle:', blockId);

            return ApiResponseHelper.createSuccessResponse({ blockId, block }, 'Transaction registered successfully.');
        } catch (error) {
            this.logger.error('Error registering transaction on Tangle', error);
            return ApiResponseHelper.createErrorResponse<any>(
                'Error registering transaction on Tangle.',
                500,
                [{ code: ApiErrorCode.TransactionError.toString(), description: error.message }]
            );
        }
    }
}
