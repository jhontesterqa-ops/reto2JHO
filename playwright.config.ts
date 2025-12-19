import { defineConfig } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const testDir = defineBddConfig({
  features: 'features/*.feature',
  steps: 'src/steps/*.steps.ts',
});

export default defineConfig({
  testDir,
  reporter: [['html', { open: 'never' }]],
  use: {
    // 👇 OJO AQUÍ: Asegúrate de que termine en /v2
    baseURL: 'https://petstore.swagger.io/v2', 
    trace: 'on-first-retry',
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
      'accept': 'application/json',
      'api_key': 'special-key' // Clave de API para autorización
    }
  },
});