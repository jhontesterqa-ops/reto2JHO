import { APIRequestContext, APIResponse } from '@playwright/test';

export class StoreApi {
    readonly request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async createOrder(orderData: object): Promise<APIResponse> {
        return await this.request.post('/v2/store/order', {
            data: orderData
        });
    }

    async getOrder(orderId: number): Promise<APIResponse> {
        return await this.request.get(`/v2/store/order/${orderId}`);
    }

    async getInventory(): Promise<APIResponse> {
        return await this.request.get('/v2/store/inventory');
    }

    async deleteOrder(orderId: number): Promise<APIResponse> {       
        return await this.request.delete(`/v2/store/order/${orderId}`);
    }
}