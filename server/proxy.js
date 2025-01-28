const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// Configuración de CORS para el proxy
app.use(cors({
    origin: ['http://127.0.0.1:5500', 'http://localhost:5500'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Configuración del proxy
const apiProxy = createProxyMiddleware({
    target: 'http://localhost:8080',
    changeOrigin: true,
    onProxyReq: (proxyReq, req, res) => {
        console.log('Proxy Request:', req.method, req.url);
    },
    onProxyRes: (proxyRes, req, res) => {
        console.log('Proxy Response:', proxyRes.statusCode);
    },
    onError: (err, req, res) => {
        console.error('Proxy Error:', err);
        res.status(500).send('Proxy Error');
    }
});

app.use('/', apiProxy);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Proxy server running on http://localhost:${PORT}`);
});