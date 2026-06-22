import { Router } from 'express';
import { clerkWebhookController } from './clerkWebhook.controller.js';

export const clerkWebhookRoutes = Router();

clerkWebhookRoutes.post('/clerk', clerkWebhookController.handleClerkWebhook);
