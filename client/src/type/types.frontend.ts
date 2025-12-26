// Auth types
export interface AuthUser {
  user: {
    user_id: string;
    role: string;
  };
}
//End Auth types

// product type

export interface Product_Size {
  product_id: string;
  size_id: string;
}

export interface Product_Color {
  product_id: string;
  color_id: string;
}

export interface Product {
  product_id: string;
  price: number;
  imageUrl: string[];
  product_name: string;
  product_size: Product_Size[];
}

export interface ProductLanding {
  product_id: string;
  product_name: string;
  price: number;
  description: string;
  imageUrl: string[];
}
export interface ProductData {
  product_id: string;
  product_name: string;
  price: number;
  description: string;
  imageUrl: string[];
  tryon: string;
  category: string;
  product_size: Product_Size[];
  product_color: Product_Color[];
}

//end product type

// cart type
export interface cartItem {
  // Trùng thuộc tính (cắt bớt)
  product_size: Product_Size | null;
  product_color: Product_Color | null;
  quantity: number;
  subtotal: number;
  product: ProductData_Cart;
  active: boolean;
}

export interface ProductData_Cart {
  product_id: string;
  product_name: string;
  price: number;
  imageUrl: string[];
  product_size: Product_Size | null;
  product_color: Product_Color | null;
}

//end cart type

//order type
export interface detail {
  product_id: string;
  product_name: string;
  quantity: number;
  subtotal: number;
  product_size: Product_Size | null;
  product_color: Product_Color | null;
}

export interface orderCreate {
  Message: string | null;
}

export interface user_order {
  user_id: string;
  email: string;
  name: string;
}

export interface OrderData {
  order_id: string;
  total: number;
  create_at: Date;
  update_at: Date;
  payment: string;
  status: string;
  method: string;
  delivered_date: Date;
  user_create: userInOrderProfile;
  user_ship: shipperInOrderProfile | null;
  order_detail: detail[];
}

export interface userInOrderProfile {
  email: string;
  address: string;
  name: string;
}

export interface shipperInOrderProfile {
  user_id: string;
  name: string;
}

export interface OrderUser {
  order_id: string;
  user_create: userInOrderProfile;
  user_ship: shipperInOrderProfile | null;
  total: number;
  create_at: Date;
  update_at: Date;
  delivered_date: Date;
  payment: string;
  status: string;
  method: string;
  order_detail: detail[];
}

export interface paymentAndStatus {
  order_id: string;
  payment: string;
  status: string;
}
//end order type

// user type

export interface userData {
  Message: string;
  email: string;
  role: string;
  user_id: string;
}

export interface user {
  user_id: string;
  email: string;
  name: string;
  address: string;
}

// end user type

// Admin

// review type

export interface Review {
  product_id: string;
  user_id: string;
  score: number;
  content: string;
  user?: {
    user_id: string;
    email: string;
    name: string;
  };
}

// Define the initial state
export interface ReviewState {
  Reviews: Review[];
  loadingReview: boolean;
  errorReview: string | null;
}

export interface Product_Review {
  product_id: string | undefined;
  product_name: string | undefined;
  imageUrl: string[] | undefined;
  description: string | undefined;
  price: number | undefined;
  product_size: Product_Size[] | undefined;
  product_color: Product_Color[] | undefined;
  tryon: string | undefined;
  Reviews: Review[];
}

// end review type

// track type

export interface Revenue {
  month: number;
  year: number;
  total: number;
}

export interface BestSeller {
  product_id: string;
  price: number;
  count: number;
  product_name: string;
}

export interface BestCustomer {
  user_id: string;
  name: string;
  email: string;
  total: number;
}

export interface monthAndRevenue {
  month: string;
  year: number;
  total: number;
}

// end track type

// size type

export interface SizeOrigin {
  size_id: string;
  size_name: string;
}

// end size type

// color type

export interface ColorOrigin {
  color_id: string;
  color_name: string;
}

// end color type

// role type

export interface RoleOrigin {
  role_id: string;
  role_name: string;
}

// end role type

// category type

export interface CategoryOrigin {
  category_id: string;
  category_name: string;
}

// end category type

// admin type

export interface orderUserInAdminPanel {
  order_id: string;
  total: number;
  create_at: Date;
  update_at: Date;
  payment: string;
  status: string;
  method: string;
  user_create: userInOrderProfile;
  user_ship: shipperInOrderProfile | null;
}

export interface userInAdminPanel {
  user_id: string;
  email: string;
  name: string;
  address: string;
  role: RoleOrigin;
  status: boolean;
}

export interface userDetailInAdminPanel {
  user_id: string;
  email: string;
  name: string;
  address: string;
  role: RoleOrigin;
  carts: cartItem[];
  orders: orderUserInAdminPanel[];
}

export interface ProductDataAmin {
  product_id: string;
  product_name: string;
  price: number;
  imageUrl: string[];
  category: CategoryOrigin;
  product_size: Product_Size[];
  product_color: Product_Color[];
  count: number;
  status: string;
}

export interface OrderDetailInAdmin {
  product_id: string;
  imageUrl: string;
  product_name: string;
  quantity: number;
  subtotal: number;
  product_size: Product_Size | null;
  product_color: Product_Color | null;
}

export interface OrderUserInAdmin {
  order_id: string;
  user_create: userInOrderProfile;
  user_ship: shipperInOrderProfile | null;
  total: number;
  create_at: Date;
  update_at: Date;
  delivered_date: Date;
  payment: string;
  status: string;
  method: string;
  order_detail: OrderDetailInAdmin[];
}

export interface paymentAndStatusAdmin {
  order_id: string;
  payment: string;
  status: string;
  shipper_id: string;
}

export interface ProviderOrigin {
  provider_id: string;
  provider_name: string;
}

export interface InventoryInAdmin {
  inventory_id: string;
  create_at: Date;
  product_id: string;
  color_id: string;
  size_id: string;
  min_quantity: number;
  update_at: Date;
  quantity: number;
  product: {
    category: CategoryOrigin;
    imageUrl: string;
    product_name: string;
  };
}

export interface InventoryInSearchAdmin {
  inventory_id: string;
  product_id: string;
  color_id: string;
  size_id: string;
  min_quantity: number;
  quantity: number;
  product: {
    product_name: string;
  };
}

export interface StockReceiptDetail {
  inventory_id: string;
  product_name: string; // can be ignored but I need to show name
  product_id: string;
  size_id: string;
  color_id: string;
  quantity: number;
}

export interface StockReceipt {
  provider_id: string;
  user_id: string;
  stock_receipt_detail: StockReceiptDetail[];
}

//end admin type
