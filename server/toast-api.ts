const TOAST_API_BASE = "https://ws-api.toasttab.com";

export interface ToastConfig {
  clientId: string;
  clientSecret: string;
  restaurantGuid: string;
}

export interface ToastMenuItem {
  guid: string;
  name: string;
  description: string;
  basePrice: number;
  image?: string;
}

export interface ToastOrderItem {
  name: string;
  quantity: number;
  price: number;
  modifiers?: string[];
}

export interface ToastOrder {
  items: ToastOrderItem[];
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  pickupTime?: string;
  specialInstructions?: string;
}

export class ToastAPI {
  private accessToken: string | null = null;
  private tokenExpiry: number = 0;

  constructor(private config?: ToastConfig) {}

  private async getAccessToken(): Promise<string> {
    if (!this.config) {
      throw new Error("Toast API not configured. Please add TOAST_CLIENT_ID, TOAST_CLIENT_SECRET, and TOAST_RESTAURANT_GUID environment variables.");
    }

    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    const response = await fetch(`${TOAST_API_BASE}/authentication/v1/authentication/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clientId: this.config.clientId,
        clientSecret: this.config.clientSecret,
        userAccessType: "TOAST_MACHINE_CLIENT",
      }),
    });

    if (!response.ok) {
      throw new Error(`Toast authentication failed: ${response.statusText}`);
    }

    const data = await response.json();
    this.accessToken = data.token.accessToken;
    this.tokenExpiry = Date.now() + (data.token.expiresIn * 1000);
    
    if (!this.accessToken) {
      throw new Error("Failed to get access token from Toast API");
    }
    
    return this.accessToken;
  }

  async getMenu(): Promise<ToastMenuItem[]> {
    if (!this.config) {
      throw new Error("Toast API not configured");
    }

    const token = await this.getAccessToken();
    
    const response = await fetch(
      `${TOAST_API_BASE}/menus/v2/menus?restaurantGuid=${this.config.restaurantGuid}`,
      {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Toast-Restaurant-External-ID": this.config.restaurantGuid,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch menu: ${response.statusText}`);
    }

    const data = await response.json();
    return data.menus || [];
  }

  async calculatePrice(items: ToastOrderItem[]): Promise<{ subtotal: number; tax: number; total: number }> {
    if (!this.config) {
      const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const tax = Math.round(subtotal * 0.08);
      return {
        subtotal,
        tax,
        total: subtotal + tax,
      };
    }

    const token = await this.getAccessToken();

    const response = await fetch(`${TOAST_API_BASE}/orders/v2/pricing`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Toast-Restaurant-External-ID": this.config.restaurantGuid,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        restaurantGuid: this.config.restaurantGuid,
        checks: [{
          selections: items.map(item => ({
            itemName: item.name,
            quantity: item.quantity,
          })),
        }],
      }),
    });

    if (!response.ok) {
      const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const tax = Math.round(subtotal * 0.08);
      return {
        subtotal,
        tax,
        total: subtotal + tax,
      };
    }

    const data = await response.json();
    return {
      subtotal: data.totalAmount - data.taxAmount,
      tax: data.taxAmount,
      total: data.totalAmount,
    };
  }

  async submitOrder(order: ToastOrder): Promise<{ orderGuid?: string; orderNumber: string }> {
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
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        restaurantGuid: this.config.restaurantGuid,
        diningOption: "TAKEOUT",
        source: "WEB",
        checks: [{
          tab: {
            name: `Zawadi Web - ${Date.now()}`,
          },
          customer: {
            firstName: order.customerName.split(" ")[0],
            lastName: order.customerName.split(" ").slice(1).join(" ") || "Guest",
            email: order.customerEmail,
            phone: order.customerPhone,
          },
          selections: order.items.map(item => ({
            itemName: item.name,
            quantity: item.quantity,
            modifiers: item.modifiers || [],
          })),
        }],
        estimatedFulfillmentDate: order.pickupTime,
        notes: order.specialInstructions,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to submit order to Toast: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      orderGuid: data.guid,
      orderNumber: data.entityId || `ORD-${Date.now().toString().slice(-6)}`,
    };
  }

  isConfigured(): boolean {
    return !!this.config;
  }
}

export function createToastAPI(): ToastAPI {
  const config = process.env.TOAST_CLIENT_ID && process.env.TOAST_CLIENT_SECRET && process.env.TOAST_RESTAURANT_GUID
    ? {
        clientId: process.env.TOAST_CLIENT_ID,
        clientSecret: process.env.TOAST_CLIENT_SECRET,
        restaurantGuid: process.env.TOAST_RESTAURANT_GUID,
      }
    : undefined;

  return new ToastAPI(config);
}
