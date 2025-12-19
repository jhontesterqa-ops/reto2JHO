import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { StoreApi } from '../api/StoreApi';

const { Given, When, Then } = createBdd();

// Variables de estado para compartir datos entre pasos
let storeApi: StoreApi;
let response: any;
let orderId: number;
let orderData: any;

Given('que tengo los datos para una nueva orden de compra', async ({ request }) => {
    storeApi = new StoreApi(request);
    // Generamos un ID aleatorio para evitar colisiones en la API pública
    const randomId = Math.floor(Math.random() * 100000);
    orderData = {
        id: randomId,
        petId: 1,
        quantity: 1,
        shipDate: new Date().toISOString(),
        status: "placed",
        complete: true
    };
});

When('creo una orden de compra en la tienda', async () => {
    const apiResponse = await storeApi.createOrder(orderData);
    expect(apiResponse.status()).toBe(200);
    response = await apiResponse.json();
    orderId = response.id; // Guardamos el ID para pasos futuros
    console.log(`Orden creada con ID: ${orderId}`);
});

Then('la orden debe ser creada exitosamente con los datos correctos', async () => {
    expect(response.id).toBe(orderData.id);
    expect(response.status).toBe(orderData.status);
});

When('busco la orden de compra creada por su ID', async () => {
    const apiResponse = await storeApi.getOrder(orderId);
    expect(apiResponse.status()).toBe(200);
    response = await apiResponse.json();
});

Then('debo obtener los detalles de la orden correctamente', async () => {
    expect(response.id).toBe(orderId);
    expect(response.petId).toBe(orderData.petId);
});

When('verifico el inventario de la tienda', async () => {
    const apiResponse = await storeApi.getInventory();
    expect(apiResponse.status()).toBe(200);
    response = await apiResponse.json();
});

Then('el inventario debe contener items con status {string}', async ({}, status: string) => {
    // La API de inventario devuelve un objeto tipo { "sold": 10, "string": 50 }
    // Verificamos que la propiedad exista (no el valor exacto, ya que cambia)
    expect(response).toHaveProperty(status); // Puede ser "placed", "sold", etc.
});

When('elimino la orden de compra creada', async () => {
    const apiResponse = await storeApi.deleteOrder(orderId);
    expect(apiResponse.status()).toBe(200);
});

Then('al buscar la orden nuevamente debo recibir un error {int}', async ({}, errorCode: number) => {
    const apiResponse = await storeApi.getOrder(orderId);
    expect(apiResponse.status()).toBe(errorCode);
});