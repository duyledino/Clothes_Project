// Auth types
export interface AuthUser {
  user: {
    user_id: string;
    role: string;
  };
}
//End Auth types

// product type

export interface Product_Size{
  product_id:string,
  size_id:string
}

export interface Product_Color{
  product_id:string,
  color_id:string
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
};
export interface ProductData {
  product_id: string;
  product_name: string;
  price: number;
  description: string;
  imageUrl: string[];
  tryon: string;
  category: string;
  product_size: Product_Size[];
  product_color:Product_Color[];
};
export interface ProductDataAmin {
  id: string;
  product_name: string;
  price: number;
  imageUrl: string[];
  size: string[];
  category: string;
  count: number;
  isDelete: string;
};

//end product type


// cart type
export interface cartItem {
  product_size: Product_Size|null;
  product_color: Product_Color|null;
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
};

//end cart type


//order type
export interface detail {
  product_id: string;
  count: number;
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

export interface product {
  product_name: string;
}
export interface detailAdmin {
  size: string;
  count: number;
  product: product;
}

export interface OrderData {
  order_id: string;
  user: user_order;
  total: number;
  update: Date;
  payment: string;
  status: string;
  details: detailAdmin[];
}

export interface userInOrderProfile {
  address: string;
  name: string;
}

export interface shipperInOrderProfile{
  user_id:string,
  name:string
}

export interface OrderUser {
  order_id: string;
  user_create: userInOrderProfile;
  user_ship: shipperInOrderProfile | null;
  total: number;
  create_at: Date;
  update_at: Date;
  payment: string;
  status: string;
  method: string;
  order_detail: detail[];
}

export interface paymentAndStatus {
  order_id: string;
  payment: string;
  status: string;
};
//end order type

// user type

export interface userData {
  Message: string;
  email: string;
  role:string;
  user_id: string;
};

export interface user {
  user_id: string;
  email: string;
  name: string;
  address: string;
};

// end user type




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
};

// Define the initial state
export interface ReviewState {
  Reviews: Review[];
  loadingReview: boolean;
  errorReview: string | null;
};

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
};

// end review type


// track type

export interface Revenue {
  month: number;
  year: number;
  total: number;
};

export interface BestSeller {
  product_id: string;
  price: number;
  count: number;
  title: string;
};

export interface BestCustomer {
  user_id: string;
  name: string;
  email: string;
  total: number;
};

// end track type