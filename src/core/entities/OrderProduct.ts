export class OrderProductEntity {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  unitPrice: number;

  constructor(id: number, orderId: number, productId: number, quantity: number, unitPrice: number) {
    this.id = id;
    this.orderId = orderId;
    this.productId = productId;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
  }
}
