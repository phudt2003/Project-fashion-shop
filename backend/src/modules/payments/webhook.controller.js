import { ApiResponse } from '../../utils/ApiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { paymentService } from './payment.service.js';

export const webhookController = {
  handleSePayWebhook: asyncHandler(async (req, res) => {
    const signature = req.headers['x-sepay-signature'] || req.headers['x-signature'];
    const result = await paymentService.handleSePayWebhook(req.body, signature);
    res.json(new ApiResponse(result, 'SePay webhook processed'));
  }),
};

