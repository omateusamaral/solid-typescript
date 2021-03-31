import { orderStatus } from './interfaces/order-status';
import { Messaging } from './messaging';
import { Persistency } from './persistency';
import { ShoppingCart } from './shopping-cart';

export class Order {
  private _orderStatus: orderStatus = 'open';

  constructor(
    private readonly cart: ShoppingCart,
    private readonly messaging: Messaging,
    private readonly persistency: Persistency,
  ) {}
  get orderStatus(): orderStatus {
    return this._orderStatus;
  }
  checkout(): void {
    if (this.cart.isEmpaty()) {
      console.log('Seu carrinho está vazio');
      return;
    }

    this.messaging.sendMessage(
      `Seu pedido com total de ${this.cart.total()} foi recebido.`,
    );
    this.persistency.saveOrder();
    this.cart.clear();
  }
}