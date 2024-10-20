// src/tangle/interfaces/node-service.interface.ts
import { ApiResponse } from 'src/common/responses/api-response';

export interface INodeService {
    getNodeInfo(): Promise<ApiResponse<any>>;
}