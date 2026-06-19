import { Router } from 'express';
import { webhookController } from './webhook.controller.js';

export const webhookRoutes = Router();

webhookRoutes.post('/sepay', webhookController.handleSePayWebhook);

