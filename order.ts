// order.ts - TypeScript model
interface OrderItem {
  id: string;
  name: string;
  item: string;
  quantity: number;
  price: number;
  total: number;
  share?: number;
}

class OrderManager {
  private orders: OrderItem[] = [];
  private deliveryFee: number = 0;

  constructor() {}

  setDeliveryFee(fee: number): void {
    this.deliveryFee = fee;
  }

  getDeliveryFee(): number {
    return this.deliveryFee;
  }

  addOrder(name: string, item: string, quantity: number, unitPrice: number): OrderItem {
    const id = crypto.randomUUID();
    const newOrder: OrderItem = {
      id,
      name,
      item,
      quantity,
      price: unitPrice,
      total: quantity * unitPrice
    };
    
    this.orders.push(newOrder);
    this.calculateShares();
    return newOrder;
  }

  removeOrder(id: string): void {
    this.orders = this.orders.filter(order => order.id !== id);
    this.calculateShares();
  }

  getOrders(): OrderItem[] {
    return this.orders;
  }

  getTotalBeforeDelivery(): number {
    return this.orders.reduce((sum, order) => sum + order.total, 0);
  }

  private calculateShares(): void {
    if (this.orders.length === 0) return;
    
    const deliveryPerPerson = this.deliveryFee / this.orders.length;
    
    this.orders.forEach(order => {
      order.share = order.total + deliveryPerPerson;
    });
  }

  getOrderCount(): number {
    return this.orders.length;
  }
}

export { OrderManager, OrderItem };
