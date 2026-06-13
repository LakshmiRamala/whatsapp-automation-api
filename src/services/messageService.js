// Message Dispatch Service — Meta WhatsApp Business API
// Jun 2026 by Lakshmi

const axios = require('axios');
const { META_CONFIG } = require('../config/meta');
const redisConnection = require('../config/redis');

const CACHE_TTL = 3600; // 1 hour

// Send a single WhatsApp message
const sendMessage = async (to, templateName, parameters) => {
  // Check Redis cache — avoid duplicate sends
  const cacheKey = `msg:${to}:${templateName}`;
  const cached = await redisConnection.get(cacheKey);

  if (cached) {
    console.log(`⚡ Cache hit — skipping duplicate message to ${to}`);
    return JSON.parse(cached);
  }

  try {
    const payload = {
      messaging_product: 'whatsapp',
      to,
      type: 'template',
      template: {
        name: templateName,
        language: { code: 'en_US' },
        components: [
          {
            type: 'body',
            parameters: parameters.map((p) => ({
              type: 'text',
              text: p,
            })),
          },
        ],
      },
    };

    const response = await axios.post(
      `${META_CONFIG.apiUrl}/${META_CONFIG.phoneNumberId}/messages`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${META_CONFIG.accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Cache the result to prevent duplicates
    await redisConnection.setex(
      cacheKey,
      CACHE_TTL,
      JSON.stringify(response.data)
    );

    console.log(`✅ Message sent to ${to}:`, response.data.messages[0].id);
    return response.data;

  } catch (error) {
    console.error(`❌ Failed to send message to ${to}:`, error.message);
    throw error;
  }
};

// Send bulk messages — processes 5000+ daily
const sendBulkMessages = async (recipients) => {
  console.log(`📤 Sending bulk messages to ${recipients.length} recipients`);

  const results = await Promise.allSettled(
    recipients.map(({ phone, template, params }) =>
      sendMessage(phone, template, params)
    )
  );

  const success = results.filter((r) => r.status === 'fulfilled').length;
  const failed = results.filter((r) => r.status === 'rejected').length;

  console.log(`✅ Bulk send complete: ${success} success, ${failed} failed`);
  return { success, failed, total: recipients.length };
};

module.exports = { sendMessage, sendBulkMessages };
