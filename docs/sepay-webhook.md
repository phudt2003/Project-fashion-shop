# SePay Webhook

Webhook endpoint:

```txt
POST /api/v1/webhooks/sepay
```

Expected payment content format:

```txt
FS-<orderId>
```

The webhook handler accepts common SePay/banking fields such as:

```json
{
  "content": "FS-665f1f2b1234567890123456",
  "transferAmount": 250000,
  "transactionId": "BANK_TXN_001",
  "status": "success"
}
```

Supported normalized statuses:

- `pending`
- `paid`
- `cancelled`
- `refunded`

When a webhook is processed, the API updates both `Payment.status` and `Order.status`.

