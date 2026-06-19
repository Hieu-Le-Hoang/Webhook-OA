const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();

// Chuyển sang cổng mặc định của Bizfly nếu cổng không được xác định
const port = process.env.PORT || 80;

// Power Automate URLs — đọc từ env vars, KHÔNG hardcode
const PA_URL_1 = process.env.POWER_AUTOMATE_URL_1;
const PA_URL_2 = process.env.POWER_AUTOMATE_URL_2;
const PA_URL_3 = process.env.POWER_AUTOMATE_URL_3;

// Validate bắt buộc phải có env vars khi khởi động
if (!PA_URL_1 || !PA_URL_2 || !PA_URL_3) {
    console.error('[ERROR] Missing required environment variables: POWER_AUTOMATE_URL_1, POWER_AUTOMATE_URL_2, POWER_AUTOMATE_URL_3');
    process.exit(1);
}

// Thư mục chứa tệp HTML xác thực
const publicPath = path.join(__dirname, 'public');

// Middleware để phục vụ các tệp tĩnh
app.use(express.static(publicPath));

app.use(express.json());

// Endpoint 1 — /webhook
app.post('/webhook', async (req, res) => {
    const data = req.body;

    try {
        const response = await axios.post(PA_URL_1, data, {
            headers: { 'Content-Type': 'application/json' },
            timeout: 10000,
            maxBodyLength: 1 * 1024 * 1024, // 1MB limit
        });
        console.log('Data forwarded to Power Automate 1:', response.data);
        res.status(200).send('Data received and forwarded successfully');
    } catch (error) {
        console.error('Error forwarding data to Power Automate 1:', error.message);
        res.status(500).send('Failed to forward data');
    }
});

// Endpoint 2 — /webhook2
app.post('/webhook2', async (req, res) => {
    const data = req.body;

    try {
        const response = await axios.post(PA_URL_2, data, {
            headers: { 'Content-Type': 'application/json' },
            timeout: 10000,
            maxBodyLength: 1 * 1024 * 1024,
        });
        console.log('Data forwarded to Power Automate 2:', response.data);
        res.status(200).send('Data received and forwarded successfully');
    } catch (error) {
        console.error('Error forwarding data to Power Automate 2:', error.message);
        res.status(500).send('Failed to forward data');
    }
});

// Endpoint 3 — /webhook3
app.post('/webhook3', async (req, res) => {
    const data = req.body;

    try {
        const response = await axios.post(PA_URL_3, data, {
            headers: { 'Content-Type': 'application/json' },
            timeout: 10000,
            maxBodyLength: 1 * 1024 * 1024,
        });
        console.log('Data forwarded to Power Automate 3:', response.data);
        res.status(200).send('Data received and forwarded successfully');
    } catch (error) {
        console.error('Error forwarding data to Power Automate 3:', error.message);
        res.status(500).send('Failed to forward data');
    }
});

// Endpoint để phục vụ tệp HTML xác thực Zalo
app.get('./zalo_verifierVTMv8wp_53be_y0EhDLoKY_hfL33dNS7CJ4u.html', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'zalo_verifierVTMv8wp_53be_y0EhDLoKY_hfL33dNS7CJ4u.html'), (err) => {
        if (err) {
            res.status(404).send('File not found');
        }
    });
});

app.listen(port, () => {
    console.log(`Webhook is listening on port ${port}`);
});