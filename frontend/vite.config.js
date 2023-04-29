import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:5000/',
                changeOrigin: true,
                headers: {
                    'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                    'Access-Control-Allow-Origin': '*',
                    'Max-Forwards': '10',
                    'Max-Header-Size': '65536',
                },
                rewrite: path => path.replace(/^\/api/, ''),
            },
        },
    },
})
