import { $Enums } from '@prisma/client';

// Definindo o tipo para os itens do pedido (OrderItem)
type OrderItem = {
  book: {
    price: number;
    title: string;
    author: string;
    description: string | null;
    stockQuantity: number;
    publicationDate: Date;
    categoryId: number;
  };
  orderId: number;
  bookId: number;
  quantity: number;
  price: number;
};

// Definindo o tipo para o pedido (Order)
type Order = {
  id: number;
  createdAt: Date;
  totalPrice: number;
  status: $Enums.OrderStatus; // Certificando que está usando o tipo correto do Prisma
  orderItems: OrderItem[];
};

// Definindo o tipo para os pedidos de um usuário (UserOrders)
export interface UserOrders {
  name: string; // Nome do usuário
  orders: Order[]; // Array de pedidos
}

export interface IUserOrders {
  name: string;
  orders: {
    id: number;
    totalPrice: number;
    status: $Enums.OrderStatus;
    createdAt: Date;
    orderItems: {
      orderId: number;
      bookId: number;
      quantity: number;
      price: number;
      book: {
        title: string;
        author: string;
        description: string | null;
        price: number;
        stockQuantity: number;
        publicationDate: Date;
        categoryId: number;
      };
    }[];
  }[];
}
