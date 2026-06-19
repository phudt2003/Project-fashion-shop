import crypto from 'crypto';
import { sepayConfig } from '../../config/sepay.js';
import { PAYMENT_STATUS } from '../../constants/paymentStatus.js';
import { generateQRCodeDataUrl } from '../../utils/generateQRCode.js';

function encode(value) {
  return encodeURIComponent(value || '');
}

function buildVietQrUrl({ amount, transferContent }) {
  if (!sepayConfig.bankBin || !sepayConfig.accountNumber) return null;

  const base = `https://img.vietqr.io/image/${sepayConfig.bankBin}-${sepayConfig.accountNumber}-${sepayConfig.qrTemplate}.png`;
  const query = `amount=${amount}&addInfo=${encode(transferContent)}&accountName=${encode(sepayConfig.accountName)}`;
  return `${base}?${query}`;
}

export const sepayService = {
  buildTransferContent: (orderId) => `FS-${orderId}`,

  createQrCode: async ({ orderId, amount }) => {
    const transferContent = sepayService.buildTransferContent(orderId);
    const vietQrUrl = buildVietQrUrl({ amount, transferContent });

    if (vietQrUrl) {
      return {
        qrCodeUrl: vietQrUrl,
        transferContent,
        bankAccount: {
          bankBin: sepayConfig.bankBin,
          accountNumber: sepayConfig.accountNumber,
          accountName: sepayConfig.accountName,
        },
      };
    }

    const qrPayload = JSON.stringify({
      provider: 'sepay',
      orderId,
      amount,
      transferContent,
      accountNumber: sepayConfig.accountNumber,
    });

    return {
      qrCodeUrl: await generateQRCodeDataUrl(qrPayload),
      transferContent,
      bankAccount: {
        bankBin: sepayConfig.bankBin,
        accountNumber: sepayConfig.accountNumber,
        accountName: sepayConfig.accountName,
      },
    };
  },

  verifyWebhookSignature: (payload, signature) => {
    if (!sepayConfig.webhookSecret) return true;
    if (!signature) return false;

    const body = typeof payload === 'string' ? payload : JSON.stringify(payload);
    const expected = crypto
      .createHmac('sha256', sepayConfig.webhookSecret)
      .update(body)
      .digest('hex');

    const expectedBuffer = Buffer.from(expected);
    const signatureBuffer = Buffer.from(signature);
    if (expectedBuffer.length !== signatureBuffer.length) return false;

    return crypto.timingSafeEqual(expectedBuffer, signatureBuffer);
  },

  normalizeWebhookPayload: (payload) => {
    const content = payload.content || payload.transferContent || payload.description || '';
    const amount = Number(payload.transferAmount || payload.amount || payload.value || 0);
    const transactionId = payload.transactionId || payload.referenceCode || payload.code || payload.id;
    const statusText = String(payload.status || payload.transactionStatus || '').toLowerCase();

    let status = PAYMENT_STATUS.PENDING;
    if (['success', 'paid', 'completed', 'complete'].includes(statusText) || amount > 0) {
      status = PAYMENT_STATUS.PAID;
    }
    if (['cancelled', 'canceled', 'failed'].includes(statusText)) {
      status = PAYMENT_STATUS.CANCELLED;
    }
    if (['refunded', 'refund'].includes(statusText)) {
      status = PAYMENT_STATUS.REFUNDED;
    }

    return {
      content,
      amount,
      transactionId,
      status,
      orderId: sepayService.extractOrderId(content),
      raw: payload,
    };
  },

  extractOrderId: (content) => {
    const match = String(content).match(/FS-([a-f0-9]{24})/i);
    return match?.[1] || null;
  },
};
