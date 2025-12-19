export interface Product_Size{
  product_id:string,
  size_id:string
}

export interface Product_Color{
  product_id:string,
  color_id:string
}

export interface details {
  product_id: string;
  count: number;
  subtotal: number;
  product_size: Product_Size;
  product_color: Product_Color;
}