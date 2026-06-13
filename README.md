# WhatsApp Automation API

A production-grade **Meta WhatsApp Business API** integration built with **Node.js** and **Express.js** — processes 5,000+ daily messages with dynamic template rendering and Redis-backed caching.

## 🚀 Features

- **Meta WhatsApp Business API** integration
- **Dynamic template rendering** based on CRM state
- **Redis caching** for low-latency message dispatch
- **Event-based routing** with conditional message flows
- **Bulk message processing** — 5,000+ messages/day
- **Webhook handling** for incoming message events
- **Rate limiting** to stay within Meta API limits

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js |
| Framework | Express.js |
| Cache | Redis |
| Message API | Meta WhatsApp Business API |
| Language | JavaScript (ES6+) |

## 📁 Project Structure

```
whatsapp-automation-api/
├── src/
│   ├── config/
│   │   ├── redis.js          # Redis connection
│   │   └── meta.js           # Meta API config
│   ├── controllers/
│   │   └── webhookController.js  # Incoming message handler
│   ├── services/
│   │   ├── messageService.js     # Message dispatch logic
│   │   └── templateService.js    # Dynamic template builder
│   ├── routes/
│   │   └── webhookRoutes.js      # Webhook endpoints
│   └── index.js              # Entry point
├── package.json
└── README.md
```

## ⚙️ How It Works

```
Incoming Event (CRM / Cron)
        ↓
Template Service builds message
        ↓
Redis cache check (avoid duplicate sends)
        ↓
Meta WhatsApp API call
        ↓
Webhook receives delivery status
        ↓
CRM state updated
```

## 📦 Installation

```bash
git clone https://github.com/LakshmiRamala/whatsapp-automation-api.git
cd whatsapp-automation-api
npm install
```

## 🔧 Environment Setup

```env
META_API_URL=https://graph.facebook.com/v18.0
META_PHONE_NUMBER_ID=your_phone_number_id
META_ACCESS_TOKEN=your_access_token
REDIS_HOST=localhost
REDIS_PORT=6379
```

## 📊 Performance

- Processes **5,000+ WhatsApp messages daily**
- Redis caching reduces redundant API calls significantly
- Webhook processing under **200ms average response time**
- **40% reduction** in manual communication ops

## 👩‍💻 Author

**Naga Lakshmi Ramala** — [LinkedIn](https://linkedin.com/in/lakshmi-ramala) | [GitHub](https://github.com/LakshmiRamala)
