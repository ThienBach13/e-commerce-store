export type CategoryType = {
  id: number;
  name: string;
  image: string;
};

export type ProductType = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: CategoryType;
};

export interface CreateProductType {
  title: string;
  price: number | null;
  description: string;
  categoryId: number;
  images: string[];
}

export interface UpdateProductType {
  title?: string;
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
  role: "customer" | "admin";
  id: number;
};

export type CartItemType = ProductType & {
  quantity: number;
};

export type UpdateQuantity = {
  id: number;
  quantity: number;
};

export type Sort = "Default" | "Highest Price" | "Lowest Price";
