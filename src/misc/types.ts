export type CategoryType = {
  id: string;
  name: string;
  image: string;
};

export type ProductType = {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  categoryId: string;
};

export interface CreateProductType {
  name: string;
  description: string;
  price: number | null;
  categoryId: string;
  images: string[];
}

export interface UpdateProductType {
  name?: string;
  price?: number;
  description?: string;
  images?: string[];
}

export interface UserCredential {
  email: string;
  password: string;
}

export type UserRegister = UserCredential & {
  name: string;
  avatar: string;
};

export type User = UserRegister & {
  role: "Customer" | "Admin";
  id: string;
};

export type CartItemType = ProductType & {
  quantity: number;
};

export type UpdateQuantity = {
  id: string;
  quantity: number;
};

export type Order = {
  id: string;
  createdAt: string;
  orderItems: [OrderItem];
};
export type OrderItem = {
  productId: string;
  quantity: number;
  price: number;
};

export type Sort = "Default" | "Highest Price" | "Lowest Price";
