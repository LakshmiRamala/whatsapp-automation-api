// WhatsApp Automation API — Entry Point
// Jun 2026 by Lakshmi

require('dotenv').config();

const express = require('express');
const webhookRoutes = require('./routes/webhookRoutes');
const { validateConfig } = require('./config/meta');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Validate Meta API config on startup
validateConfig();

// Routes
app.use('/api', webhookRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'whatsapp-automation-api',
    timestamp: new Date().toISOString(),
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 WhatsApp Automation API running on port ${PORT}`);
  console.log(`📡 Webhook endpoint: /api/webhook`);
  console.log(`❤️  Health check: /health`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 Shutting down gracefully...');
  process.exit(0);
});
