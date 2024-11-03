// src/tangle/interfaces/node-service.interface.ts
import { ApiResponse } from '@app/common/responses/api-response';

export interface INodeService {
    getNodeInfo(): Promise<ApiResponse<any>>;
}