import { env } from './env.js';

export const sepayConfig = {
  bankBin: env.sepay.bankBin,
  accountNumber: env.sepay.accountNumber,
  accountName: env.sepay.accountName,
  webhookSecret: env.sepay.webhookSecret,
  qrTemplate: env.sepay.qrTemplate,
};

