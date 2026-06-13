// Meta WhatsApp Business API Configuration
// Jun 2026 by Lakshmi

const META_CONFIG = {
  apiUrl: process.env.META_API_URL || 'https://graph.facebook.com/v18.0',
  phoneNumberId: process.env.META_PHONE_NUMBER_ID,
  accessToken: process.env.META_ACCESS_TOKEN,
  webhookVerifyToken: process.env.WEBHOOK_VERIFY_TOKEN,
};

// Validate required config on startup
const validateConfig = () => {
  const required = ['phoneNumberId', 'accessToken', 'webhookVerifyToken'];
  required.forEach((key) => {
    if (!META_CONFIG[key]) {
      throw new Error(`Missing required Meta config: ${key}`);
    }
  });
  console.log('✅ Meta API config validated');
};

module.exports = { META_CONFIG, validateConfig };
