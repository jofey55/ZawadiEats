import type { 
  InsertOrder, Order, 
  InsertFeedback, Feedback,
  InsertCateringInquiry, CateringInquiry,
  InsertJobApplication, JobApplication,
  InsertContactMessage, ContactMessage,
  InsertReview, Review
} from "@shared/schema";

export interface IStorage {
  createOrder(order: InsertOrder): Promise<Order>;
  getOrder(id: string): Promise<Order | null>;
  getAllOrders(): Promise<Order[]>;
  updateOrderStatus(id: string, status: string, toastOrderGuid?: string): Promise<Order | null>;
  
  createFeedback(feedback: InsertFeedback): Promise<Feedback>;
  getAllFeedback(): Promise<Feedback[]>;
  
  createCateringInquiry(inquiry: InsertCateringInquiry): Promise<CateringInquiry>;
  getAllCateringInquiries(): Promise<CateringInquiry[]>;
  
  createJobApplication(application: InsertJobApplication): Promise<JobApplication>;
  getAllJobApplications(): Promise<JobApplication[]>;
  
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getAllContactMessages(): Promise<ContactMessage[]>;
  
  createReview(review: InsertReview): Promise<Review>;
  getApprovedReviews(): Promise<Review[]>;
  getAllReviews(): Promise<Review[]>;
}

export class MemStorage implements IStorage {
  private orders: Order[] = [];
  private feedback: Feedback[] = [];
  private cateringInquiries: CateringInquiry[] = [];
  private jobApplications: JobApplication[] = [];
  private contactMessages: ContactMessage[] = [];
  private reviews: Review[] = [];
  
  async createOrder(data: InsertOrder): Promise<Order> {
    const order: Order = {
      id: crypto.randomUUID(),
      ...data,
      status: data.status || "pending",
      pickupTime: data.pickupTime || null,
      specialInstructions: data.specialInstructions || null,
      toastOrderGuid: data.toastOrderGuid || null,
      createdAt: new Date(),
    };
    this.orders.push(order);
    return order;
  }
  
  async getOrder(id: string): Promise<Order | null> {
    return this.orders.find(o => o.id === id) || null;
  }
  
  async getAllOrders(): Promise<Order[]> {
    return this.orders;
  }
  
  async updateOrderStatus(id: string, status: string, toastOrderGuid?: string): Promise<Order | null> {
    const order = this.orders.find(o => o.id === id);
    if (!order) return null;
    
    order.status = status;
    if (toastOrderGuid) {
      order.toastOrderGuid = toastOrderGuid;
    }
    return order;
  }
  
  async createFeedback(data: InsertFeedback): Promise<Feedback> {
    const item: Feedback = {
      id: crypto.randomUUID(),
      ...data,
      createdAt: new Date(),
    };
    this.feedback.push(item);
    return item;
  }
  
  async getAllFeedback(): Promise<Feedback[]> {
    return this.feedback;
  }
  
  async createCateringInquiry(data: InsertCateringInquiry): Promise<CateringInquiry> {
    const inquiry: CateringInquiry = {
      id: crypto.randomUUID(),
      ...data,
      status: data.status || "new",
      eventDate: data.eventDate || null,
      guestCount: data.guestCount || null,
      createdAt: new Date(),
    };
    this.cateringInquiries.push(inquiry);
    return inquiry;
  }
  
  async getAllCateringInquiries(): Promise<CateringInquiry[]> {
    return this.cateringInquiries;
  }
  
  async createJobApplication(data: InsertJobApplication): Promise<JobApplication> {
    const application: JobApplication = {
      id: crypto.randomUUID(),
      ...data,
      availability: data.availability || null,
      experience: data.experience || null,
      resume: data.resume || null,
      createdAt: new Date(),
    };
    this.jobApplications.push(application);
    return application;
  }
  
  async getAllJobApplications(): Promise<JobApplication[]> {
    return this.jobApplications;
  }
  
  async createContactMessage(data: InsertContactMessage): Promise<ContactMessage> {
    const message: ContactMessage = {
      id: crypto.randomUUID(),
      ...data,
      phone: data.phone || null,
      createdAt: new Date(),
    };
    this.contactMessages.push(message);
    return message;
  }
  
  async getAllContactMessages(): Promise<ContactMessage[]> {
    return this.contactMessages;
  }
  
  async createReview(data: InsertReview): Promise<Review> {
    const review: Review = {
      id: crypto.randomUUID(),
      ...data,
      isApproved: data.isApproved || false,
      createdAt: new Date(),
    };
    this.reviews.push(review);
    return review;
  }
  
  async getApprovedReviews(): Promise<Review[]> {
    return this.reviews.filter(r => r.isApproved);
  }
  
  async getAllReviews(): Promise<Review[]> {
    return this.reviews;
  }
}

export class PgStorage implements IStorage {
  constructor(private db: any) {}
  
  async createOrder(data: InsertOrder): Promise<Order> {
    const { db } = await import("./db");
    const { orders } = await import("@shared/schema");
    const [order] = await db.insert(orders).values(data).returning();
    return order;
  }
  
  async getOrder(id: string): Promise<Order | null> {
    const { db } = await import("./db");
    const { orders } = await import("@shared/schema");
    const { eq } = await import("drizzle-orm");
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    return order || null;
  }
  
  async getAllOrders(): Promise<Order[]> {
    const { db } = await import("./db");
    const { orders } = await import("@shared/schema");
    return await db.select().from(orders);
  }
  
  async updateOrderStatus(id: string, status: string, toastOrderGuid?: string): Promise<Order | null> {
    const { db } = await import("./db");
    const { orders } = await import("@shared/schema");
    const { eq } = await import("drizzle-orm");
    const updateData: any = { status };
    if (toastOrderGuid) updateData.toastOrderGuid = toastOrderGuid;
    const [order] = await db.update(orders).set(updateData).where(eq(orders.id, id)).returning();
    return order || null;
  }
  
  async createFeedback(data: InsertFeedback): Promise<Feedback> {
    const { db } = await import("./db");
    const { feedback } = await import("@shared/schema");
    const [result] = await db.insert(feedback).values(data).returning();
    return result;
  }
  
  async getAllFeedback(): Promise<Feedback[]> {
    const { db } = await import("./db");
    const { feedback } = await import("@shared/schema");
    return await db.select().from(feedback);
  }
  
  async createCateringInquiry(data: InsertCateringInquiry): Promise<CateringInquiry> {
    const { db } = await import("./db");
    const { cateringInquiries } = await import("@shared/schema");
    const [inquiry] = await db.insert(cateringInquiries).values(data).returning();
    return inquiry;
  }
  
  async getAllCateringInquiries(): Promise<CateringInquiry[]> {
    const { db } = await import("./db");
    const { cateringInquiries } = await import("@shared/schema");
    return await db.select().from(cateringInquiries);
  }
  
  async createJobApplication(data: InsertJobApplication): Promise<JobApplication> {
    const { db } = await import("./db");
    const { jobApplications } = await import("@shared/schema");
    const [application] = await db.insert(jobApplications).values(data).returning();
    return application;
  }
  
  async getAllJobApplications(): Promise<JobApplication[]> {
    const { db } = await import("./db");
    const { jobApplications } = await import("@shared/schema");
    return await db.select().from(jobApplications);
  }
  
  async createContactMessage(data: InsertContactMessage): Promise<ContactMessage> {
    const { db } = await import("./db");
    const { contactMessages } = await import("@shared/schema");
    const [message] = await db.insert(contactMessages).values(data).returning();
    return message;
  }
  
  async getAllContactMessages(): Promise<ContactMessage[]> {
    const { db } = await import("./db");
    const { contactMessages } = await import("@shared/schema");
    return await db.select().from(contactMessages);
  }
  
  async createReview(data: InsertReview): Promise<Review> {
    const { db } = await import("./db");
    const { reviews } = await import("@shared/schema");
    const [review] = await db.insert(reviews).values(data).returning();
    return review;
  }
  
  async getApprovedReviews(): Promise<Review[]> {
    const { db } = await import("./db");
    const { reviews } = await import("@shared/schema");
    const { eq } = await import("drizzle-orm");
    return await db.select().from(reviews).where(eq(reviews.isApproved, true));
  }
  
  async getAllReviews(): Promise<Review[]> {
    const { db } = await import("./db");
    const { reviews } = await import("@shared/schema");
    return await db.select().from(reviews);
  }
}

// Use PgStorage if DATABASE_URL is available, otherwise fall back to MemStorage
export const storage = process.env.DATABASE_URL 
  ? new PgStorage(null) 
  : new MemStorage();
