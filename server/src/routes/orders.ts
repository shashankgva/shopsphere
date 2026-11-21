import { Router } from 'express';
import { CreateOrderSchema } from '../schemas/order.js';
import { priceOrder } from '../services/pricing.js';
import { OrderModel, toOrderResponse } from '../models/Order.js';
import { isValidObjectId } from 'mongoose';

const router = Router();

// Create and persist an order
router.post('/', async (req, res, next) => {
  try {
    const validation = CreateOrderSchema.safeParse(req.body);

    if (!validation.success) {
      res.status(400).json({
        message: 'Please check your order details.',
        issues: validation.error.issues.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message,
        })),
      });

      return;
    }

    // Use validated IDs and quantities to calculate prices on the server
    const pricedOrder = await priceOrder(validation.data);

    // Persist only after validation and pricing succeed
    const savedOrder = await OrderModel.create(pricedOrder);

    res
      .status(201)
      .json(
        toOrderResponse(
          savedOrder as unknown as Parameters<typeof toOrderResponse>[0],
        ),
      );
  } catch (error) {
    next(error);
  }
});

// Fetch an order by its database ID
router.get('/:orderId', async (req, res, next) => {
  try {
    const { orderId } = req.params;

    if (!isValidObjectId(orderId)) {
      res.status(400).json({
        message: 'Invalid order ID.',
      });
      return;
    }

    const order = await OrderModel.findById(orderId);

    if (!order) {
      res.status(404).json({
        message: 'Order not found.',
      });

      return;
    }

    res
      .status(200)
      .json(
        toOrderResponse(
          order as unknown as Parameters<typeof toOrderResponse>[0],
        ),
      );
  } catch (error) {
    next(error);
  }
});

export default router;
