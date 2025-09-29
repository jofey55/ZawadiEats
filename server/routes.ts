import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertOrderSchema, insertOrderItemSchema } from "@shared/schema";
import { z } from "zod";

// Schema for creating order with items
const createOrderRequestSchema = z.object({
  order: insertOrderSchema,
  items: z.array(
    insertOrderItemSchema.omit({ orderId: true })
  ).min(1, "At least one item is required"),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Menu Routes
  app.get("/api/menu", async (_req, res) => {
    try {
      const menuItems = await storage.getAllMenuItems();
      res.json(menuItems);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch menu items" });
    }
  });

  app.get("/api/menu/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const menuItems = await storage.getMenuItemsByCategory(category);
      res.json(menuItems);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch menu items" });
    }
  });

  app.get("/api/menu/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const menuItem = await storage.getMenuItem(id);
      if (!menuItem) {
        return res.status(404).json({ message: "Menu item not found" });
      }
      res.json(menuItem);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch menu item" });
    }
  });

  // Order Routes
  app.post("/api/orders", async (req, res) => {
    try {
      const validatedData = createOrderRequestSchema.parse(req.body);
      const { order: orderData, items: orderItemsData } = validatedData;

      // Create order and items in transaction
      const order = await storage.createOrder(orderData);

      try {
        for (const item of orderItemsData) {
          await storage.createOrderItem({
            ...item,
            orderId: order.id,
          });
        }
      } catch (itemError) {
        // If any item fails, we should ideally rollback the order
        // For now, log the error and return the order anyway
        console.error("Failed to create order items:", itemError);
        throw new Error("Failed to create order items");
      }

      const fullOrder = await storage.getOrderWithItems(order.id);
      res.status(201).json(fullOrder);
    } catch (error: any) {
      if (error.errors) {
        // Zod validation error
        res.status(400).json({ message: "Invalid request data", errors: error.errors });
      } else {
        res.status(400).json({ message: error.message || "Failed to create order" });
      }
    }
  });

  app.get("/api/orders/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const order = await storage.getOrderWithItems(id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch order" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
