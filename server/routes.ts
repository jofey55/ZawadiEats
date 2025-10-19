import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertOrderSchema, 
  insertFeedbackSchema, 
  insertCateringInquirySchema,
  insertJobApplicationSchema,
  insertContactMessageSchema,
  insertReviewSchema
} from "@shared/schema";
import { createToastAPI } from "./toast-api";

const toastAPI = createToastAPI();

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", toastConfigured: toastAPI.isConfigured() });
  });

  app.post("/api/orders", async (req, res, next) => {
    try {
      const { items, ...orderData } = req.body;
      
      const pricing = await toastAPI.calculatePrice(items);
      
      const orderNumber = `ORD-${Date.now().toString().slice(-6)}`;
      
      const validatedData = insertOrderSchema.parse({
        orderNumber,
        ...orderData,
        items: items,
        subtotal: pricing.subtotal,
        tax: pricing.tax,
        total: pricing.total,
      });

      const order = await storage.createOrder(validatedData);

      try {
        const toastResult = await toastAPI.submitOrder({
          items,
          customerName: orderData.customerName,
          customerEmail: orderData.customerEmail,
          customerPhone: orderData.customerPhone,
          pickupTime: orderData.pickupTime,
          specialInstructions: orderData.specialInstructions,
        });

        if (toastResult.orderGuid) {
          await storage.updateOrderStatus(order.id, "confirmed", toastResult.orderGuid);
        }
      } catch (toastError) {
        console.error("Toast submission failed, order saved locally:", toastError);
      }

      res.json(order);
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/orders/:id", async (req, res, next) => {
    try {
      const order = await storage.getOrder(req.params.id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/feedback", async (req, res, next) => {
    try {
      const validatedData = insertFeedbackSchema.parse(req.body);
      const feedback = await storage.createFeedback(validatedData);
      res.json(feedback);
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/catering", async (req, res, next) => {
    try {
      const validatedData = insertCateringInquirySchema.parse(req.body);
      const inquiry = await storage.createCateringInquiry(validatedData);
      res.json(inquiry);
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/jobs", async (req, res, next) => {
    try {
      const validatedData = insertJobApplicationSchema.parse(req.body);
      const application = await storage.createJobApplication(validatedData);
      res.json(application);
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/contact", async (req, res, next) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.json(message);
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/reviews", async (req, res, next) => {
    try {
      const validatedData = insertReviewSchema.parse(req.body);
      const review = await storage.createReview(validatedData);
      res.json(review);
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/reviews", async (_req, res, next) => {
    try {
      const reviews = await storage.getApprovedReviews();
      res.json(reviews);
    } catch (error) {
      next(error);
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
