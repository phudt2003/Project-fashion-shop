import { ApiResponse } from '../../utils/ApiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { clerkWebhookService } from './clerkWebhook.service.js';

export const clerkWebhookController = {
  handleClerkWebhook: asyncHandler(async (req, res) => {
    const result = await clerkWebhookService.processWebhook(req.body, req.headers);
    res.json(new ApiResponse(result, 'Webhook processed successfully'));
  }),
};
