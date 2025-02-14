import { defineConfig } from "@hey-api/openapi-ts";


export default defineConfig({
    input: "http://localhost:3002/api-json",
    output: 'src/client',
    plugins: [
        {
            name: '@hey-api/client-axios',
            runtimeConfigPath: './src/apiClient.ts'
        },
    ],
});