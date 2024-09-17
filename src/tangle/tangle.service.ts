// src/tangle/tangle.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { Client, IBuildBlockOptions } from '@iota/sdk';
import { ApiResponseHelper } from 'src/common/responses/api-response.helper';
import { ApiResponse } from 'src/common/responses/api-response';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';  // Importa el enum correcto

@Injectable()
export class TangleService {
    private readonly client: Client;
    private readonly logger = new Logger(TangleService.name);

    constructor() {
        this.client = new Client({
            nodes: ['http://34.229.104.127:14265'], // Nodo de IOTA (test: https://api.testnet.shimmer.network)
        });
    }

    async getNodeInfo(): Promise<ApiResponse<any>> {
        try {
            const info = await this.client.getInfo();
            this.logger.log('Node Info:', JSON.stringify(info));

            // Devolviendo una respuesta exitosa con la información del nodo
            return ApiResponseHelper.createSuccessResponse(info, 'Node information retrieved successfully.');
        } catch (error) {
            this.logger.error('Error retrieving node info', error);

            // Devolviendo una respuesta de error con un código de error específico
            return ApiResponseHelper.createErrorResponse<any>(
                'Error retrieving node info.',
                500,
                [{ code: ApiErrorCode.NetworkError.toString(), description: error.message }]
            );
        }
    }

    async registerTransaction(options: IBuildBlockOptions): Promise<ApiResponse<string>> {
        try {
            // Creas y posteas el bloque usando las opciones adecuadas.
            const [blockId] = await this.client.buildAndPostBlock(undefined, options);

            this.logger.log('Transaction registered on Tangle:', blockId);

            // Devolviendo una respuesta exitosa con el ID del bloque
            return ApiResponseHelper.createSuccessResponse(blockId, 'Transaction registered successfully.');
        } catch (error) {
            this.logger.error('Error registering transaction', error);

            // Devolviendo una respuesta de error con un código de error específico
            return ApiResponseHelper.createErrorResponse<string>(
                'Error registering transaction.',
                500,
                [{ code: ApiErrorCode.TransactionError.toString(), description: error.message }]
            );
        }
    }
}