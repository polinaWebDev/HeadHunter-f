import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
    input: ' http://localhost:3000/static/openapi.json',
    output: 'src/client/gen',
    plugins: ['@hey-api/client-fetch', '@tanstack/react-query', ],
});