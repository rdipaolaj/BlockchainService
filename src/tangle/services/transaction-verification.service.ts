// src/tangle/services/transaction-verification.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { Client, TaggedDataPayload, PayloadType } from '@iota/sdk';
import { ApiResponseHelper } from 'src/common/responses/api-response.helper';
import { ApiResponse } from 'src/common/responses/api-response';
import { ApiErrorCode } from '../../common/enums/api-error-code.enum';
import { ITransactionVerificationService } from '../interfaces/transaction-verification.interface';

@Injectable()
export class TransactionVerificationService implements ITransactionVerificationService {
    private readonly client: Client;
    private readonly logger = new Logger(TransactionVerificationService.name);

    constructor() {
        this.client = new Client({
            nodes: ['http://3.92.78.140:14265'],
        });
    }

    async retrieveTransaction(blockId: string): Promise<ApiResponse<any>> {
        this.logger.log(`Recuperando la transacción con ID de Bloque: ${blockId}`);
        
        // Intentamos obtener el bloque
        const block = await this.client.getBlock(blockId).catch(() => null);

        if (!block) {
            const notFoundMessage = `El bloque con ID ${blockId} no fue encontrado en la red Tangle.`;
            this.logger.warn(notFoundMessage);
            console.log('response: ', ApiResponseHelper.createErrorResponse(notFoundMessage,
                404,
                [{ code: ApiErrorCode.NotFound.toString(), description: 'El bloque solicitado no existe en el nodo de Tangle.' }]));
            return ApiResponseHelper.createErrorResponse(
                notFoundMessage,
                404,
                [{ code: ApiErrorCode.NotFound.toString(), description: 'El bloque solicitado no existe en el nodo de Tangle.' }]
            );
        }

        if (!block.payload || block.payload.type !== PayloadType.TaggedData) {
            const errorMessage = `El bloque ${blockId} no contiene un payload de datos etiquetados válido.`;
            this.logger.warn(errorMessage);
            return ApiResponseHelper.createErrorResponse(
                errorMessage,
                400,
                [{ code: ApiErrorCode.InvalidData.toString(), description: 'El payload del bloque está vacío o no es del tipo TaggedDataPayload.' }]
            );
        }

        const taggedDataPayload = block.payload as TaggedDataPayload;
        const hexData = taggedDataPayload.data.replace(/^0x/, '');
        const decodedData = Buffer.from(hexData, 'hex').toString('utf8');
        
        let transactionData;
        try {
            transactionData = JSON.parse(decodedData);
        } catch (parseError) {
            this.logger.error('Error al analizar los datos de la transacción', parseError);
            return ApiResponseHelper.createErrorResponse(
                'Error al analizar los datos de la transacción.',
                500,
                [{ code: ApiErrorCode.TransactionError.toString(), description: parseError.message }]
            );
        }

        this.logger.log('Datos de la transacción recuperados exitosamente.');
        return ApiResponseHelper.createSuccessResponse(
            { transactionData },
            'Datos de la transacción recuperados exitosamente.'
        );
    }
}
