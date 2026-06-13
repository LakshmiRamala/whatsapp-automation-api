// Webhook Routes
// Jun 2026 by Lakshmi

const express = require('express');
const router = express.Router();
const {
  verifyWebhook,
  handleWebhook,
} = require('../controllers/webhookController');

// Meta webhook verification (GET)
router.get('/webhook', verifyWebhook);

// Meta webhook events (POST)
router.post('/webhook', handleWebhook);

module.exports = router;
