// Webhook Controller — Handles incoming Meta WhatsApp events
// Jun 2026 by Lakshmi

const { META_CONFIG } = require('../config/meta');
const { sendMessage } = require('../services/messageService');

// Webhook verification (required by Meta)
const verifyWebhook = (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === META_CONFIG.webhookVerifyToken) {
    console.log('✅ Webhook verified by Meta');
    return res.status(200).send(challenge);
  }

  console.error('❌ Webhook verification failed');
  return res.status(403).json({ error: 'Forbidden' });
};

// Handle incoming webhook events
const handleWebhook = async (req, res) => {
  // Immediately acknowledge Meta (must respond within 5s)
  res.status(200).send('EVENT_RECEIVED');

  try {
    const { entry } = req.body;
    if (!entry?.length) return;

    for (const e of entry) {
      const changes = e.changes || [];

      for (const change of changes) {
        const { messages, statuses } = change.value || {};

        // Handle incoming messages
        if (messages?.length) {
          for (const message of messages) {
            await processIncomingMessage(message);
          }
        }

        // Handle delivery status updates
        if (statuses?.length) {
          for (const status of statuses) {
            await processStatusUpdate(status);
          }
        }
      }
    }
  } catch (error) {
    console.error('❌ Webhook processing error:', error.message);
  }
};

// Process incoming customer message
const processIncomingMessage = async (message) => {
  const { from, type, text } = message;
  console.log(`📩 Incoming message from ${from}: ${type}`);

  // Route based on message content / CRM state
  if (type === 'text') {
    const userText = text?.body?.toLowerCase();

    if (userText?.includes('help')) {
      await sendMessage(from, 'help_template', ['Support Team']);
    } else if (userText?.includes('status')) {
      await sendMessage(from, 'status_template', ['Your order is on the way!']);
    } else {
      await sendMessage(from, 'default_template', ['Team']);
    }
  }
};

// Process delivery status update
const processStatusUpdate = async (status) => {
  const { id, status: deliveryStatus, recipient_id } = status;
  console.log(`📊 Message ${id} to ${recipient_id}: ${deliveryStatus}`);
  // Update CRM with delivery status
};

module.exports = { verifyWebhook, handleWebhook };
