var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  cateringInquiries: () => cateringInquiries,
  contactMessages: () => contactMessages,
  feedback: () => feedback,
  insertCateringInquirySchema: () => insertCateringInquirySchema,
  insertContactMessageSchema: () => insertContactMessageSchema,
  insertFeedbackSchema: () => insertFeedbackSchema,
  insertJobApplicationSchema: () => insertJobApplicationSchema,
  insertOrderSchema: () => insertOrderSchema,
  insertReviewSchema: () => insertReviewSchema,
  insertUserSchema: () => insertUserSchema,
  jobApplications: () => jobApplications,
  orders: () => orders,
  reviews: () => reviews,
  users: () => users
});
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, jsonb, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users, orders, feedback, cateringInquiries, jobApplications, contactMessages, reviews, insertUserSchema, insertOrderSchema, insertFeedbackSchema, insertCateringInquirySchema, insertJobApplicationSchema, insertContactMessageSchema, insertReviewSchema;
var init_schema = __esm({
  "shared/schema.ts"() {
    "use strict";
    users = pgTable("users", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      username: text("username").notNull().unique(),
      password: text("password").notNull()
    });
    orders = pgTable("orders", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      orderNumber: varchar("order_number").notNull(),
      customerName: text("customer_name").notNull(),
      customerEmail: text("customer_email").notNull(),
      customerPhone: text("customer_phone").notNull(),
      items: jsonb("items").notNull(),
      subtotal: integer("subtotal").notNull(),
      tax: integer("tax").notNull(),
      total: integer("total").notNull(),
      status: text("status").notNull().default("pending"),
      pickupTime: text("pickup_time"),
      specialInstructions: text("special_instructions"),
      toastOrderGuid: text("toast_order_guid"),
      createdAt: timestamp("created_at").notNull().defaultNow()
    });
    feedback = pgTable("feedback", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      name: text("name").notNull(),
      email: text("email").notNull(),
      rating: integer("rating").notNull(),
      message: text("message").notNull(),
      createdAt: timestamp("created_at").notNull().defaultNow()
    });
    cateringInquiries = pgTable("catering_inquiries", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      name: text("name").notNull(),
      email: text("email").notNull(),
      phone: text("phone").notNull(),
      eventDate: text("event_date"),
      guestCount: integer("guest_count"),
      message: text("message").notNull(),
      status: text("status").notNull().default("new"),
      createdAt: timestamp("created_at").notNull().defaultNow()
    });
    jobApplications = pgTable("job_applications", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      position: text("position").notNull(),
      name: text("name").notNull(),
      email: text("email").notNull(),
      phone: text("phone").notNull(),
      availability: text("availability"),
      experience: text("experience"),
      resume: text("resume"),
      createdAt: timestamp("created_at").notNull().defaultNow()
    });
    contactMessages = pgTable("contact_messages", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      name: text("name").notNull(),
      email: text("email").notNull(),
      phone: text("phone"),
      subject: text("subject").notNull(),
      message: text("message").notNull(),
      createdAt: timestamp("created_at").notNull().defaultNow()
    });
    reviews = pgTable("reviews", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      customerName: text("customer_name").notNull(),
      rating: integer("rating").notNull(),
      comment: text("comment").notNull(),
      isApproved: boolean("is_approved").notNull().default(false),
      createdAt: timestamp("created_at").notNull().defaultNow()
    });
    insertUserSchema = createInsertSchema(users).omit({ id: true });
    insertOrderSchema = createInsertSchema(orders).omit({ id: true, createdAt: true });
    insertFeedbackSchema = createInsertSchema(feedback).omit({ id: true, createdAt: true });
    insertCateringInquirySchema = createInsertSchema(cateringInquiries).omit({ id: true, createdAt: true });
    insertJobApplicationSchema = createInsertSchema(jobApplications).omit({ id: true, createdAt: true });
    insertContactMessageSchema = createInsertSchema(contactMessages).omit({ id: true, createdAt: true });
    insertReviewSchema = createInsertSchema(reviews).omit({ id: true, createdAt: true });
  }
});

// server/db.ts
var db_exports = {};
__export(db_exports, {
  db: () => db
});
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
var _db, db;
var init_db = __esm({
  "server/db.ts"() {
    "use strict";
    init_schema();
    _db = null;
    db = new Proxy({}, {
      get(target, prop) {
        if (!_db) {
          if (!process.env.DATABASE_URL) {
            throw new Error("DATABASE_URL environment variable is not set");
          }
          const sql2 = neon(process.env.DATABASE_URL);
          _db = drizzle(sql2, { schema: schema_exports });
        }
        return _db[prop];
      }
    });
  }
});

// server/index.ts
import { fileURLToPath } from "url";
import path2 from "path";
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  orders = [];
  feedback = [];
  cateringInquiries = [];
  jobApplications = [];
  contactMessages = [];
  reviews = [];
  async createOrder(data) {
    const order = {
      id: crypto.randomUUID(),
      ...data,
      status: data.status || "pending",
      pickupTime: data.pickupTime || null,
      specialInstructions: data.specialInstructions || null,
      toastOrderGuid: data.toastOrderGuid || null,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.orders.push(order);
    return order;
  }
  async getOrder(id) {
    return this.orders.find((o) => o.id === id) || null;
  }
  async getAllOrders() {
    return this.orders;
  }
  async updateOrderStatus(id, status, toastOrderGuid) {
    const order = this.orders.find((o) => o.id === id);
    if (!order) return null;
    order.status = status;
    if (toastOrderGuid) {
      order.toastOrderGuid = toastOrderGuid;
    }
    return order;
  }
  async createFeedback(data) {
    const item = {
      id: crypto.randomUUID(),
      ...data,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.feedback.push(item);
    return item;
  }
  async getAllFeedback() {
    return this.feedback;
  }
  async createCateringInquiry(data) {
    const inquiry = {
      id: crypto.randomUUID(),
      ...data,
      status: data.status || "new",
      eventDate: data.eventDate || null,
      guestCount: data.guestCount || null,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.cateringInquiries.push(inquiry);
    return inquiry;
  }
  async getAllCateringInquiries() {
    return this.cateringInquiries;
  }
  async createJobApplication(data) {
    const application = {
      id: crypto.randomUUID(),
      ...data,
      availability: data.availability || null,
      experience: data.experience || null,
      resume: data.resume || null,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.jobApplications.push(application);
    return application;
  }
  async getAllJobApplications() {
    return this.jobApplications;
  }
  async createContactMessage(data) {
    const message = {
      id: crypto.randomUUID(),
      ...data,
      phone: data.phone || null,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.contactMessages.push(message);
    return message;
  }
  async getAllContactMessages() {
    return this.contactMessages;
  }
  async createReview(data) {
    const review = {
      id: crypto.randomUUID(),
      ...data,
      isApproved: data.isApproved || false,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.reviews.push(review);
    return review;
  }
  async getApprovedReviews() {
    return this.reviews.filter((r) => r.isApproved);
  }
  async getAllReviews() {
    return this.reviews;
  }
};
var PgStorage = class {
  constructor(db2) {
    this.db = db2;
  }
  async createOrder(data) {
    const { db: db2 } = await Promise.resolve().then(() => (init_db(), db_exports));
    const { orders: orders2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
    const [order] = await db2.insert(orders2).values(data).returning();
    return order;
  }
  async getOrder(id) {
    const { db: db2 } = await Promise.resolve().then(() => (init_db(), db_exports));
    const { orders: orders2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
    const { eq } = await import("drizzle-orm");
    const [order] = await db2.select().from(orders2).where(eq(orders2.id, id));
    return order || null;
  }
  async getAllOrders() {
    const { db: db2 } = await Promise.resolve().then(() => (init_db(), db_exports));
    const { orders: orders2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
    return await db2.select().from(orders2);
  }
  async updateOrderStatus(id, status, toastOrderGuid) {
    const { db: db2 } = await Promise.resolve().then(() => (init_db(), db_exports));
    const { orders: orders2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
    const { eq } = await import("drizzle-orm");
    const updateData = { status };
    if (toastOrderGuid) updateData.toastOrderGuid = toastOrderGuid;
    const [order] = await db2.update(orders2).set(updateData).where(eq(orders2.id, id)).returning();
    return order || null;
  }
  async createFeedback(data) {
    const { db: db2 } = await Promise.resolve().then(() => (init_db(), db_exports));
    const { feedback: feedback2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
    const [result] = await db2.insert(feedback2).values(data).returning();
    return result;
  }
  async getAllFeedback() {
    const { db: db2 } = await Promise.resolve().then(() => (init_db(), db_exports));
    const { feedback: feedback2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
    return await db2.select().from(feedback2);
  }
  async createCateringInquiry(data) {
    const { db: db2 } = await Promise.resolve().then(() => (init_db(), db_exports));
    const { cateringInquiries: cateringInquiries2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
    const [inquiry] = await db2.insert(cateringInquiries2).values(data).returning();
    return inquiry;
  }
  async getAllCateringInquiries() {
    const { db: db2 } = await Promise.resolve().then(() => (init_db(), db_exports));
    const { cateringInquiries: cateringInquiries2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
    return await db2.select().from(cateringInquiries2);
  }
  async createJobApplication(data) {
    const { db: db2 } = await Promise.resolve().then(() => (init_db(), db_exports));
    const { jobApplications: jobApplications2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
    const [application] = await db2.insert(jobApplications2).values(data).returning();
    return application;
  }
  async getAllJobApplications() {
    const { db: db2 } = await Promise.resolve().then(() => (init_db(), db_exports));
    const { jobApplications: jobApplications2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
    return await db2.select().from(jobApplications2);
  }
  async createContactMessage(data) {
    const { db: db2 } = await Promise.resolve().then(() => (init_db(), db_exports));
    const { contactMessages: contactMessages2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
    const [message] = await db2.insert(contactMessages2).values(data).returning();
    return message;
  }
  async getAllContactMessages() {
    const { db: db2 } = await Promise.resolve().then(() => (init_db(), db_exports));
    const { contactMessages: contactMessages2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
    return await db2.select().from(contactMessages2);
  }
  async createReview(data) {
    const { db: db2 } = await Promise.resolve().then(() => (init_db(), db_exports));
    const { reviews: reviews2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
    const [review] = await db2.insert(reviews2).values(data).returning();
    return review;
  }
  async getApprovedReviews() {
    const { db: db2 } = await Promise.resolve().then(() => (init_db(), db_exports));
    const { reviews: reviews2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
    const { eq } = await import("drizzle-orm");
    return await db2.select().from(reviews2).where(eq(reviews2.isApproved, true));
  }
  async getAllReviews() {
    const { db: db2 } = await Promise.resolve().then(() => (init_db(), db_exports));
    const { reviews: reviews2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
    return await db2.select().from(reviews2);
  }
};
var storage = process.env.DATABASE_URL ? new PgStorage(null) : new MemStorage();

// server/routes.ts
init_schema();

// server/toast-api.ts
var TOAST_API_BASE = "https://ws-api.toasttab.com";
var ToastAPI = class {
  constructor(config) {
    this.config = config;
  }
  accessToken = null;
  tokenExpiry = 0;
  async getAccessToken() {
    if (!this.config) {
      throw new Error("Toast API not configured. Please add TOAST_CLIENT_ID, TOAST_CLIENT_SECRET, and TOAST_RESTAURANT_GUID environment variables.");
    }
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }
    const response = await fetch(`${TOAST_API_BASE}/authentication/v1/authentication/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        clientId: this.config.clientId,
        clientSecret: this.config.clientSecret,
        userAccessType: "TOAST_MACHINE_CLIENT"
      })
    });
    if (!response.ok) {
      throw new Error(`Toast authentication failed: ${response.statusText}`);
    }
    const data = await response.json();
    this.accessToken = data.token.accessToken;
    this.tokenExpiry = Date.now() + data.token.expiresIn * 1e3;
    if (!this.accessToken) {
      throw new Error("Failed to get access token from Toast API");
    }
    return this.accessToken;
  }
  async getMenu() {
    if (!this.config) {
      throw new Error("Toast API not configured");
    }
    const token = await this.getAccessToken();
    const response = await fetch(
      `${TOAST_API_BASE}/menus/v2/menus?restaurantGuid=${this.config.restaurantGuid}`,
      {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Toast-Restaurant-External-ID": this.config.restaurantGuid
        }
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch menu: ${response.statusText}`);
    }
    const data = await response.json();
    return data.menus || [];
  }
  async calculatePrice(items) {
    if (!this.config) {
      const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const tax = Math.round(subtotal * 0.08);
      return {
        subtotal,
        tax,
        total: subtotal + tax
      };
    }
    const token = await this.getAccessToken();
    const response = await fetch(`${TOAST_API_BASE}/orders/v2/pricing`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Toast-Restaurant-External-ID": this.config.restaurantGuid,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        restaurantGuid: this.config.restaurantGuid,
        checks: [{
          selections: items.map((item) => ({
            itemName: item.name,
            quantity: item.quantity
          }))
        }]
      })
    });
    if (!response.ok) {
      const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const tax = Math.round(subtotal * 0.08);
      return {
        subtotal,
        tax,
        total: subtotal + tax
      };
    }
    const data = await response.json();
    return {
      subtotal: data.totalAmount - data.taxAmount,
      tax: data.taxAmount,
      total: data.totalAmount
    };
  }
  async submitOrder(order) {
    if (!this.config) {
      const orderNumber = `ORD-${Date.now().toString().slice(-6)}`;
      console.log("Toast API not configured - order simulated locally:", orderNumber);
      return { orderNumber };
    }
    const token = await this.getAccessToken();
    const response = await fetch(`${TOAST_API_BASE}/orders/v2/orders`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Toast-Restaurant-External-ID": this.config.restaurantGuid,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        restaurantGuid: this.config.restaurantGuid,
        diningOption: "TAKEOUT",
        source: "WEB",
        checks: [{
          tab: {
            name: `Zawadi Web - ${Date.now()}`
          },
          customer: {
            firstName: order.customerName.split(" ")[0],
            lastName: order.customerName.split(" ").slice(1).join(" ") || "Guest",
            email: order.customerEmail,
            phone: order.customerPhone
          },
          selections: order.items.map((item) => ({
            itemName: item.name,
            quantity: item.quantity,
            modifiers: item.modifiers || []
          }))
        }],
        estimatedFulfillmentDate: order.pickupTime,
        notes: order.specialInstructions
      })
    });
    if (!response.ok) {
      throw new Error(`Failed to submit order to Toast: ${response.statusText}`);
    }
    const data = await response.json();
    return {
      orderGuid: data.guid,
      orderNumber: data.entityId || `ORD-${Date.now().toString().slice(-6)}`
    };
  }
  isConfigured() {
    return !!this.config;
  }
};
function createToastAPI() {
  const config = process.env.TOAST_CLIENT_ID && process.env.TOAST_CLIENT_SECRET && process.env.TOAST_RESTAURANT_GUID ? {
    clientId: process.env.TOAST_CLIENT_ID,
    clientSecret: process.env.TOAST_CLIENT_SECRET,
    restaurantGuid: process.env.TOAST_RESTAURANT_GUID
  } : void 0;
  return new ToastAPI(config);
}

// server/routes.ts
var toastAPI = createToastAPI();
async function registerRoutes(app2) {
  app2.get("/api/health", (_req, res) => {
    res.json({ status: "ok", toastConfigured: toastAPI.isConfigured() });
  });
  app2.post("/api/orders", async (req, res, next) => {
    try {
      const { items, ...orderData } = req.body;
      const pricing = await toastAPI.calculatePrice(items);
      const orderNumber = `ORD-${Date.now().toString().slice(-6)}`;
      const validatedData = insertOrderSchema.parse({
        orderNumber,
        ...orderData,
        items,
        subtotal: pricing.subtotal,
        tax: pricing.tax,
        total: pricing.total
      });
      const order = await storage.createOrder(validatedData);
      try {
        const toastResult = await toastAPI.submitOrder({
          items,
          customerName: orderData.customerName,
          customerEmail: orderData.customerEmail,
          customerPhone: orderData.customerPhone,
          pickupTime: orderData.pickupTime,
          specialInstructions: orderData.specialInstructions
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
  app2.get("/api/orders/:id", async (req, res, next) => {
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
  app2.post("/api/feedback", async (req, res, next) => {
    try {
      const validatedData = insertFeedbackSchema.parse(req.body);
      const feedback2 = await storage.createFeedback(validatedData);
      res.json(feedback2);
    } catch (error) {
      next(error);
    }
  });
  app2.post("/api/catering", async (req, res, next) => {
    try {
      const validatedData = insertCateringInquirySchema.parse(req.body);
      const inquiry = await storage.createCateringInquiry(validatedData);
      res.json(inquiry);
    } catch (error) {
      next(error);
    }
  });
  app2.post("/api/jobs", async (req, res, next) => {
    try {
      const validatedData = insertJobApplicationSchema.parse(req.body);
      const application = await storage.createJobApplication(validatedData);
      res.json(application);
    } catch (error) {
      next(error);
    }
  });
  app2.post("/api/contact", async (req, res, next) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.json(message);
    } catch (error) {
      next(error);
    }
  });
  app2.post("/api/reviews", async (req, res, next) => {
    try {
      const validatedData = insertReviewSchema.parse(req.body);
      const review = await storage.createReview(validatedData);
      res.json(review);
    } catch (error) {
      next(error);
    }
  });
  app2.get("/api/reviews", async (_req, res, next) => {
    try {
      const reviews2 = await storage.getApprovedReviews();
      res.json(reviews2);
    } catch (error) {
      next(error);
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      ),
      await import("@replit/vite-plugin-dev-banner").then(
        (m) => m.devBanner()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}

// server/index.ts
var __filename = fileURLToPath(import.meta.url);
var __dirname = path2.dirname(__filename);
var app = express2();
app.use(
  express2.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    }
  })
);
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const url = req.path;
  let captured;
  const original = res.json;
  res.json = function(body, ...args) {
    captured = body;
    return original.apply(res, [body, ...args]);
  };
  res.on("finish", () => {
    if (url.startsWith("/api")) {
      const time = Date.now() - start;
      let line = `${req.method} ${url} ${res.statusCode} in ${time}ms`;
      if (captured) line += ` :: ${JSON.stringify(captured)}`;
      log(line);
    }
  });
  next();
});
var publicPath = path2.join(__dirname, "public");
app.use("/images", express2.static(path2.join(publicPath, "images")));
app.use("/gallery", express2.static(path2.join(publicPath, "gallery")));
app.use("/assets", express2.static(path2.join(publicPath, "assets")));
app.use(express2.static(publicPath));
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || 500;
    const msg = err.message || "Internal Server Error";
    log("ERROR: " + msg);
    res.status(status).json({ message: msg });
  });
  app.get("*", (req, res) => {
    res.sendFile(path2.join(publicPath, "index.html"));
  });
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen(
    { port, host: "0.0.0.0", reusePort: true },
    () => log("Serving on port " + port)
  );
})();
