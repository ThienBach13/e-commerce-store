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

export type UserRegister = {
  name: string;
  email: string;
  password: string;
  avatar: string;
};

export type UserType = UserRegister & {
  role: "customer" | "admin";
  id: number;
};

export type CartItemType = ProductType & {
  quantity: number;
};
