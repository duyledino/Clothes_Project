-- CreateTable
CREATE TABLE "public"."User" (
    "user_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "address" TEXT NOT NULL DEFAULT '',
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role_id" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "public"."Role" (
    "role_id" TEXT NOT NULL,
    "role_name" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("role_id")
);

-- CreateTable
CREATE TABLE "public"."Product" (
    "product_id" TEXT NOT NULL,
    "product_name" TEXT NOT NULL,
    "price" BIGINT NOT NULL,
    "description" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "imageUrl" TEXT[],
    "size_id" TEXT NOT NULL,
    "tryon" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "category_id" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "public"."Category" (
    "category_id" TEXT NOT NULL,
    "category_name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "public"."Size" (
    "size_id" TEXT NOT NULL,
    "size_name" TEXT NOT NULL,

    CONSTRAINT "Size_pkey" PRIMARY KEY ("size_id")
);

-- CreateTable
CREATE TABLE "public"."Product_Size" (
    "product_id" TEXT NOT NULL,
    "size_id" TEXT NOT NULL,

    CONSTRAINT "Product_Size_pkey" PRIMARY KEY ("product_id","size_id")
);

-- CreateTable
CREATE TABLE "public"."Color" (
    "color_id" TEXT NOT NULL,
    "color_name" TEXT NOT NULL,

    CONSTRAINT "Color_pkey" PRIMARY KEY ("color_id")
);

-- CreateTable
CREATE TABLE "public"."Product_Color" (
    "product_id" TEXT NOT NULL,
    "color_id" TEXT NOT NULL,

    CONSTRAINT "Product_Color_pkey" PRIMARY KEY ("product_id","color_id")
);

-- CreateTable
CREATE TABLE "public"."Order" (
    "order_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "shipper_id" TEXT NOT NULL,
    "total" BIGINT NOT NULL DEFAULT 0,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "method" TEXT NOT NULL DEFAULT 'COD',
    "payment" TEXT NOT NULL DEFAULT 'Pending',
    "status" TEXT NOT NULL DEFAULT 'Pending',

    CONSTRAINT "Order_pkey" PRIMARY KEY ("order_id")
);

-- CreateTable
CREATE TABLE "public"."Order_Detail" (
    "order_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "size_id" TEXT NOT NULL,
    "color_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "price" BIGINT NOT NULL DEFAULT 0,

    CONSTRAINT "Order_Detail_pkey" PRIMARY KEY ("product_id","order_id","size_id","color_id")
);

-- CreateTable
CREATE TABLE "public"."Cart" (
    "cart_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "total_quantity" INTEGER NOT NULL DEFAULT 0,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("cart_id")
);

-- CreateTable
CREATE TABLE "public"."Cart_Detail" (
    "cart_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "size_id" TEXT NOT NULL,
    "color_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cart_Detail_pkey" PRIMARY KEY ("cart_id","color_id","product_id","size_id")
);

-- CreateTable
CREATE TABLE "public"."Review" (
    "product_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,
    "content" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Review_pkey" PRIMARY KEY ("product_id","user_id")
);

-- CreateTable
CREATE TABLE "public"."Chat_User" (
    "chatId" TEXT NOT NULL,
    "userIdFrom" TEXT NOT NULL,
    "userIdTo" TEXT NOT NULL,

    CONSTRAINT "Chat_User_pkey" PRIMARY KEY ("chatId","userIdFrom","userIdTo")
);

-- CreateTable
CREATE TABLE "public"."Chat" (
    "chatId" TEXT NOT NULL,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("chatId")
);

-- CreateTable
CREATE TABLE "public"."Chat_Message" (
    "messageId" TEXT NOT NULL,
    "chatId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Chat_Message_pkey" PRIMARY KEY ("messageId")
);

-- CreateTable
CREATE TABLE "public"."Inventory" (
    "inventory_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "size_id" TEXT NOT NULL,
    "color_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("inventory_id","product_id","color_id","size_id")
);

-- CreateTable
CREATE TABLE "public"."Stock_Receipt" (
    "receipt_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "provider_id" TEXT NOT NULL,

    CONSTRAINT "Stock_Receipt_pkey" PRIMARY KEY ("receipt_id")
);

-- CreateTable
CREATE TABLE "public"."Stock_Receipt_Detail" (
    "receipt_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "size_id" TEXT NOT NULL,
    "color_id" TEXT NOT NULL,
    "inventory_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "Stock_Receipt_Detail_pkey" PRIMARY KEY ("color_id","inventory_id","product_id","receipt_id","size_id")
);

-- CreateTable
CREATE TABLE "public"."Provider" (
    "provider_id" TEXT NOT NULL,
    "provider_name" TEXT NOT NULL,

    CONSTRAINT "Provider_pkey" PRIMARY KEY ("provider_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Cart_user_id_key" ON "public"."Cart"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_inventory_id_key" ON "public"."Inventory"("inventory_id");

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "public"."Role"("role_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Product" ADD CONSTRAINT "Product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."Category"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Product_Size" ADD CONSTRAINT "Product_Size_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Product_Size" ADD CONSTRAINT "Product_Size_size_id_fkey" FOREIGN KEY ("size_id") REFERENCES "public"."Size"("size_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Product_Color" ADD CONSTRAINT "Product_Color_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Product_Color" ADD CONSTRAINT "Product_Color_color_id_fkey" FOREIGN KEY ("color_id") REFERENCES "public"."Color"("color_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_shipper_id_fkey" FOREIGN KEY ("shipper_id") REFERENCES "public"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Order_Detail" ADD CONSTRAINT "Order_Detail_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."Order"("order_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Order_Detail" ADD CONSTRAINT "Order_Detail_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Order_Detail" ADD CONSTRAINT "Order_Detail_color_id_fkey" FOREIGN KEY ("color_id") REFERENCES "public"."Color"("color_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Order_Detail" ADD CONSTRAINT "Order_Detail_size_id_fkey" FOREIGN KEY ("size_id") REFERENCES "public"."Size"("size_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Cart" ADD CONSTRAINT "Cart_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Cart_Detail" ADD CONSTRAINT "Cart_Detail_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "public"."Cart"("cart_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Cart_Detail" ADD CONSTRAINT "Cart_Detail_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Cart_Detail" ADD CONSTRAINT "Cart_Detail_size_id_fkey" FOREIGN KEY ("size_id") REFERENCES "public"."Size"("size_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Cart_Detail" ADD CONSTRAINT "Cart_Detail_color_id_fkey" FOREIGN KEY ("color_id") REFERENCES "public"."Color"("color_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Review" ADD CONSTRAINT "Review_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Review" ADD CONSTRAINT "Review_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Chat_User" ADD CONSTRAINT "Chat_User_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "public"."Chat"("chatId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Chat_User" ADD CONSTRAINT "Chat_User_userIdFrom_fkey" FOREIGN KEY ("userIdFrom") REFERENCES "public"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Chat_User" ADD CONSTRAINT "Chat_User_userIdTo_fkey" FOREIGN KEY ("userIdTo") REFERENCES "public"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Chat_Message" ADD CONSTRAINT "Chat_Message_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "public"."Chat"("chatId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Chat_Message" ADD CONSTRAINT "Chat_Message_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Inventory" ADD CONSTRAINT "Inventory_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Inventory" ADD CONSTRAINT "Inventory_size_id_fkey" FOREIGN KEY ("size_id") REFERENCES "public"."Size"("size_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Inventory" ADD CONSTRAINT "Inventory_color_id_fkey" FOREIGN KEY ("color_id") REFERENCES "public"."Color"("color_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Stock_Receipt" ADD CONSTRAINT "Stock_Receipt_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Stock_Receipt" ADD CONSTRAINT "Stock_Receipt_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "public"."Provider"("provider_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Stock_Receipt_Detail" ADD CONSTRAINT "Stock_Receipt_Detail_receipt_id_fkey" FOREIGN KEY ("receipt_id") REFERENCES "public"."Stock_Receipt"("receipt_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Stock_Receipt_Detail" ADD CONSTRAINT "Stock_Receipt_Detail_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Stock_Receipt_Detail" ADD CONSTRAINT "Stock_Receipt_Detail_size_id_fkey" FOREIGN KEY ("size_id") REFERENCES "public"."Size"("size_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Stock_Receipt_Detail" ADD CONSTRAINT "Stock_Receipt_Detail_color_id_fkey" FOREIGN KEY ("color_id") REFERENCES "public"."Color"("color_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Stock_Receipt_Detail" ADD CONSTRAINT "Stock_Receipt_Detail_inventory_id_fkey" FOREIGN KEY ("inventory_id") REFERENCES "public"."Inventory"("inventory_id") ON DELETE RESTRICT ON UPDATE CASCADE;
