import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: "/",
    server: {
        port: 3000,
    },
    define: {
        APP_VERSION: JSON.stringify(process.env.npm_package_version),
    },
})
