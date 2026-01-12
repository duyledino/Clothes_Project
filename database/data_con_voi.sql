--
-- PostgreSQL database dump
--

-- \restrict MaEXSGNdotY7A4b6zxkH50HQf2XNhbNRSIC5Mf6GOOite55VQ6CwdkPdRI4hl1A

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

-- Started on 2026-01-11 07:46:53

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5 (class 2615 OID 56695)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 4999 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 228 (class 1259 OID 56790)
-- Name: Cart; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Cart" (
    cart_id text NOT NULL,
    user_id text NOT NULL,
    create_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    update_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Cart" OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 56800)
-- Name: Cart_Detail; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Cart_Detail" (
    cart_id text NOT NULL,
    product_id text NOT NULL,
    size_id text NOT NULL,
    color_id text NOT NULL,
    quantity integer NOT NULL,
    create_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    update_at timestamp(3) without time zone NOT NULL,
    active boolean NOT NULL
);


ALTER TABLE public."Cart_Detail" OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 56733)
-- Name: Category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Category" (
    category_id text NOT NULL,
    category_name text NOT NULL
);


ALTER TABLE public."Category" OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 56825)
-- Name: Chat; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Chat" (
    chat_id text NOT NULL,
    create_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    update_at timestamp(3) without time zone NOT NULL,
    user_id_admin text NOT NULL,
    user_id_user text NOT NULL
);


ALTER TABLE public."Chat" OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 56832)
-- Name: Chat_Message; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Chat_Message" (
    content text NOT NULL,
    chat_id text NOT NULL,
    create_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    message_id text NOT NULL,
    user_id text NOT NULL
);


ALTER TABLE public."Chat_Message" OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 56754)
-- Name: Color; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Color" (
    color_id text NOT NULL,
    color_name text NOT NULL
);


ALTER TABLE public."Color" OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 56839)
-- Name: Inventory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Inventory" (
    inventory_id text NOT NULL,
    product_id text NOT NULL,
    size_id text NOT NULL,
    color_id text NOT NULL,
    quantity integer DEFAULT 0 NOT NULL,
    create_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    update_at timestamp(3) without time zone NOT NULL,
    min_quantity integer DEFAULT 0 NOT NULL
);


ALTER TABLE public."Inventory" OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 56768)
-- Name: Order; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Order" (
    order_id text NOT NULL,
    user_id text NOT NULL,
    shipper_id text,
    total bigint DEFAULT 0 NOT NULL,
    create_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    update_at timestamp(3) without time zone NOT NULL,
    method text DEFAULT 'COD'::text NOT NULL,
    payment text DEFAULT 'pending'::text NOT NULL,
    status text DEFAULT 'pending'::text NOT NULL,
    delivered_date timestamp(3) without time zone
);


ALTER TABLE public."Order" OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 56781)
-- Name: Order_Detail; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Order_Detail" (
    order_id text NOT NULL,
    product_id text NOT NULL,
    size_id text NOT NULL,
    color_id text NOT NULL,
    quantity integer DEFAULT 0 NOT NULL,
    price bigint DEFAULT 0 NOT NULL,
    subtotal bigint DEFAULT 0 NOT NULL
);


ALTER TABLE public."Order_Detail" OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 56722)
-- Name: Product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Product" (
    product_id text NOT NULL,
    product_name text NOT NULL,
    price bigint NOT NULL,
    description text NOT NULL,
    create_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    update_at timestamp(3) without time zone NOT NULL,
    "imageUrl" text[],
    tryon text NOT NULL,
    status text DEFAULT 'active'::text NOT NULL,
    count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public."Product" OWNER TO postgres;

--
-- TOC entry 237 (class 1259 OID 59186)
-- Name: Product_Category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Product_Category" (
    product_id text NOT NULL,
    category_id text NOT NULL
);


ALTER TABLE public."Product_Category" OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 56761)
-- Name: Product_Color; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Product_Color" (
    product_id text NOT NULL,
    color_id text NOT NULL
);


ALTER TABLE public."Product_Color" OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 56747)
-- Name: Product_Size; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Product_Size" (
    product_id text NOT NULL,
    size_id text NOT NULL
);


ALTER TABLE public."Product_Size" OWNER TO postgres;

--
-- TOC entry 236 (class 1259 OID 56860)
-- Name: Provider; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Provider" (
    provider_id text NOT NULL,
    provider_name text NOT NULL,
    create_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    update_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Provider" OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 56809)
-- Name: Review; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Review" (
    product_id text NOT NULL,
    user_id text NOT NULL,
    score integer DEFAULT 0 NOT NULL,
    content text DEFAULT ''::text NOT NULL
);


ALTER TABLE public."Review" OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 56715)
-- Name: Role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Role" (
    role_id text NOT NULL,
    role_name text NOT NULL
);


ALTER TABLE public."Role" OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 56740)
-- Name: Size; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Size" (
    size_id text NOT NULL,
    size_name text NOT NULL
);


ALTER TABLE public."Size" OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 56846)
-- Name: Stock_Receipt; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Stock_Receipt" (
    receipt_id text NOT NULL,
    user_id text NOT NULL,
    provider_id text NOT NULL,
    create_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Stock_Receipt" OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 56853)
-- Name: Stock_Receipt_Detail; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Stock_Receipt_Detail" (
    receipt_id text NOT NULL,
    product_id text NOT NULL,
    size_id text NOT NULL,
    color_id text NOT NULL,
    inventory_id text NOT NULL,
    quantity integer NOT NULL
);


ALTER TABLE public."Stock_Receipt_Detail" OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 56705)
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    user_id text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    name text,
    address text DEFAULT ''::text NOT NULL,
    create_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    update_at timestamp(3) without time zone NOT NULL,
    role_id text NOT NULL,
    status boolean DEFAULT true NOT NULL,
    phone character varying(10) NOT NULL,
    forget_password_token text,
    "isVerify" boolean DEFAULT false NOT NULL,
    verify_token text,
    expire_forget_password_at timestamp(3) without time zone,
    expire_verify_at timestamp(3) without time zone
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 56696)
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- TOC entry 4984 (class 0 OID 56790)
-- Dependencies: 228
-- Data for Name: Cart; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Cart" (cart_id, user_id, create_at, update_at) VALUES ('8a8bf1c0-2d21-4d8c-8acd-455c5c35d1d5', '055be9bc-feae-4cd4-bb9e-a18cd0f65b50', '2026-01-03 07:30:28.393', '2026-01-03 07:30:28.393');
INSERT INTO public."Cart" (cart_id, user_id, create_at, update_at) VALUES ('120d0f8f-6473-4100-b595-11539510340d', '5e3b2238-bdc9-4147-b722-18ffe18a754d', '2026-01-08 14:41:32.773', '2026-01-08 14:44:00.822');
INSERT INTO public."Cart" (cart_id, user_id, create_at, update_at) VALUES ('08a65ba5-0bd8-4caf-87e5-14ec219a9d2b', 'e2fa8da1-2f41-4864-9515-bd041675a382', '2026-01-09 06:58:19.213', '2026-01-09 06:58:19.213');
INSERT INTO public."Cart" (cart_id, user_id, create_at, update_at) VALUES ('eb86ab74-d570-42da-b864-f07611512b20', 'b8a88f7b-140f-40cc-ad79-82ea6cc043ca', '2025-12-31 03:22:48.499', '2026-01-09 08:25:49.699');


--
-- TOC entry 4985 (class 0 OID 56800)
-- Dependencies: 229
-- Data for Name: Cart_Detail; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4977 (class 0 OID 56733)
-- Dependencies: 221
-- Data for Name: Category; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Category" (category_id, category_name) VALUES ('683e2fad-16d7-4b7d-9e8d-9e415b6d12d7', 'Áo');
INSERT INTO public."Category" (category_id, category_name) VALUES ('7e476e69-b642-4164-99c5-2308200c506b', 'Nam');
INSERT INTO public."Category" (category_id, category_name) VALUES ('5d5eb64a-43a9-4a68-b422-b8fb97185453', 'Nữ');


--
-- TOC entry 4987 (class 0 OID 56825)
-- Dependencies: 231
-- Data for Name: Chat; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Chat" (chat_id, create_at, update_at, user_id_admin, user_id_user) VALUES ('1af01da2-656e-4260-9da3-9d27469d400c', '2026-01-03 07:30:28.681', '2026-01-03 07:30:28.681', 'b8a88f7b-140f-40cc-ad79-82ea6cc043ca', '055be9bc-feae-4cd4-bb9e-a18cd0f65b50');
INSERT INTO public."Chat" (chat_id, create_at, update_at, user_id_admin, user_id_user) VALUES ('afa21dce-4f68-4e26-b211-6da80a64e48a', '2026-01-08 14:41:32.783', '2026-01-08 14:41:32.783', 'b8a88f7b-140f-40cc-ad79-82ea6cc043ca', '5e3b2238-bdc9-4147-b722-18ffe18a754d');
INSERT INTO public."Chat" (chat_id, create_at, update_at, user_id_admin, user_id_user) VALUES ('e8e5250c-575c-4caf-bafd-6f690703e461', '2026-01-09 06:58:19.278', '2026-01-09 06:58:19.278', 'b8a88f7b-140f-40cc-ad79-82ea6cc043ca', 'e2fa8da1-2f41-4864-9515-bd041675a382');


--
-- TOC entry 4988 (class 0 OID 56832)
-- Dependencies: 232
-- Data for Name: Chat_Message; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Chat_Message" (content, chat_id, create_at, message_id, user_id) VALUES ('chao anh admin', '1af01da2-656e-4260-9da3-9d27469d400c', '2026-01-04 05:34:47.847', '63de78c1-efed-4890-92a5-2d48ef6be8e2', '055be9bc-feae-4cd4-bb9e-a18cd0f65b50');
INSERT INTO public."Chat_Message" (content, chat_id, create_at, message_id, user_id) VALUES ('Chào anh ạ! Em ở đây để giúp anh quản trị hệ thống. Anh cần hỗ trợ việc gì hôm nay? Ví dụ: xem danh sách sản phẩm, thêm/sửa/xóa sản phẩm, xem đơn hàng, cập nhật thông tin, báo cáo, v.v. Anh cho em biết mình muốn làm gì, em sẽ hỗ trợ ngay.', '1af01da2-656e-4260-9da3-9d27469d400c', '2026-01-04 05:34:48.113', '9668af69-7fb7-4455-9532-e0a8d7637b76', 'b8a88f7b-140f-40cc-ad79-82ea6cc043ca');
INSERT INTO public."Chat_Message" (content, chat_id, create_at, message_id, user_id) VALUES ('ban co san pham gi hay   ?', '1af01da2-656e-4260-9da3-9d27469d400c', '2026-01-04 05:46:22.385', 'd574ed6a-0c60-4c68-a20d-7e84e9a7447d', '055be9bc-feae-4cd4-bb9e-a18cd0f65b50');
INSERT INTO public."Chat_Message" (content, chat_id, create_at, message_id, user_id) VALUES ('<div class="p-4 max-w-sm bg-white rounded shadow">
  <img src="https://res.cloudinary.com/dacofgr3w/image/upload/v1767416915/i15vpymmy3tzvblhcktb.png" alt="Áo phôn" class="w-32 h-auto rounded mx-auto" />
  <h3 class="mt-3 text-xl font-semibold text-gray-800 text-center">Áo phôn</h3>
  <p class="text-sm text-gray-600 text-center">Áo phôn thanh lịch, hiện đại</p>
  <p class="mt-2 text-center font-semibold text-gray-800">500.000₫</p>

  <div class="mt-2 px-1">
    <span class="text-sm font-medium text-gray-700">Kích thước:</span>
    <span class="ml-2 text-sm text-gray-600">L, M, XL</span>
  </div>

  <div class="mt-2 px-1">
    <span class="text-sm font-medium text-gray-700">Màu sắc:</span>
    <span class="ml-2 inline-flex items-center">
      <span class="w-4 h-4 rounded-full border" style="background:#252222" title="Đen huyền bí"></span>
      <span class="w-4 h-4 rounded-full border ml-2" style="background:#c4e665" title="Chuối"></span>
      <span class="w-4 h-4 rounded-full border ml-2" style="background:#ce0d0d" title="Đỏ"></span>
    </span>
  </div>

  <a href="/Collection/PDT-6ce3759d" class="inline-block mt-3 w-full text-center bg-blue-600 text-white rounded hover:bg-blue-500 py-2">Xem chi tiết</a>
</div>', '1af01da2-656e-4260-9da3-9d27469d400c', '2026-01-04 05:46:22.499', '46261d16-4465-48bb-a16a-627370126460', 'b8a88f7b-140f-40cc-ad79-82ea6cc043ca');
INSERT INTO public."Chat_Message" (content, chat_id, create_at, message_id, user_id) VALUES ('bạn có sản phẩm nào', '1af01da2-656e-4260-9da3-9d27469d400c', '2026-01-04 15:44:24.822', '5d95bded-15a7-41fa-96c5-20cee4b50866', '055be9bc-feae-4cd4-bb9e-a18cd0f65b50');
INSERT INTO public."Chat_Message" (content, chat_id, create_at, message_id, user_id) VALUES ('<div class="p-4 bg-gray-50">
  <div class="max-w-4xl mx-auto space-y-6">
    <!-- Product 1 -->
    <div class="flex flex-col md:flex-row items-start bg-white border rounded-lg p-4 shadow-sm">
      <img src="https://res.cloudinary.com/dacofgr3w/image/upload/v1767416915/i15vpymmy3tzvblhcktb.png" alt="Áo phôn" class="w-32 h-auto rounded" />
      <div class="ml-0 md:ml-6">
        <h3 class="text-xl font-semibold mb-1">Áo phôn</h3>
        <a href="/Collection/PDT-6ce3759d" class="text-blue-600 hover:underline mb-2 inline-block">Xem chi tiết</a>
        <p class="text-gray-700 mb-2">Áo phôn thanh lịch, hiện đại</p>
        <p class="font-semibold mb-2">Giá: 500,000 VND</p>
        <p class="mb-1 text-sm font-semibold">Kích thước có sẵn:</p>
        <div class="flex space-x-2 mb-2">
          <span class="px-2 py-1 bg-gray-100 rounded text-sm">L</span>
          <span class="px-2 py-1 bg-gray-100 rounded text-sm">M</span>
          <span class="px-2 py-1 bg-gray-100 rounded text-sm">XL</span>
        </div>
        <p class="mb-1 text-sm font-semibold">Màu sắc:</p>
        <div class="flex items-center space-x-2 mb-2">
          <span class="w-5 h-5 rounded-full inline-block" style="background:#252222" title="Đen huyền bí"></span>
          <span class="w-5 h-5 rounded-full inline-block" style="background:#ce0d0d" title="Đỏ"></span>
          <span class="w-5 h-5 rounded-full inline-block" style="background:#c4e665" title="Chuối"></span>
        </div>
        <p class="text-sm text-gray-500">Danh mục: Áo – Nữ</p>
      </div>
    </div>

    <!-- Product 2 -->
    <div class="flex flex-col md:flex-row items-start bg-white border rounded-lg p-4 shadow-sm">
      <img src="https://res.cloudinary.com/dacofgr3w/image/upload/v1767506106/cttc3teb008ry2x320tp.png" alt="Áo sơ mi tay ngắn" class="w-32 h-auto rounded" />
      <div class="ml-0 md:ml-6">
        <h3 class="text-xl font-semibold mb-1">Áo sơ mi tay ngắn</h3>
        <a href="/Collection/PDT-d991e39d" class="text-blue-600 hover:underline mb-2 inline-block">Xem chi tiết</a>
        <p class="text-gray-700 mb-2">Áo sơ mi tay ngắn thời thượng, lịch lãm</p>
        <p class="font-semibold mb-2">Giá: 200,000 VND</p>
        <p class="mb-1 text-sm font-semibold">Kích thước có sẵn:</p>
        <div class="flex space-x-2 mb-2">
          <span class="px-2 py-1 bg-gray-100 rounded text-sm">L</span>
          <span class="px-2 py-1 bg-gray-100 rounded text-sm">M</span>
          <span class="px-2 py-1 bg-gray-100 rounded text-sm">XL</span>
          <span class="px-2 py-1 bg-gray-100 rounded text-sm">XXL</span>
        </div>
        <p class="mb-1 text-sm font-semibold">Màu sắc:</p>
        <div class="flex items-center space-x-2 mb-2">
          <span class="w-5 h-5 rounded-full inline-block" style="background:#252222" title="Đen huyền bí"></span>
        </div>
        <p class="text-sm text-gray-500">Tình trạng: Hết hàng</p>
      </div>
    </div>
  </div>
</div>', '1af01da2-656e-4260-9da3-9d27469d400c', '2026-01-04 15:44:25.023', 'cb8264da-8b1c-4336-b83d-86e00262b9f7', 'b8a88f7b-140f-40cc-ad79-82ea6cc043ca');
INSERT INTO public."Chat_Message" (content, chat_id, create_at, message_id, user_id) VALUES ('bạn làm được gì', '1af01da2-656e-4260-9da3-9d27469d400c', '2026-01-05 00:51:09.145', '47ef8afd-dce9-45bc-94b3-892ac33fec52', '055be9bc-feae-4cd4-bb9e-a18cd0f65b50');
INSERT INTO public."Chat_Message" (content, chat_id, create_at, message_id, user_id) VALUES ('Dưới đây là những gì mình có thể làm như một tư vấn viên tự động cho shop Forever khi admin vắng mặt:

- Tra cứu và cung cấp thông tin sản phẩm
  - Tên sản phẩm, mã hàng, giá, chất liệu, màu sắc, kích thước có sẵn, mô tả ngắn, hình ảnh (nếu có).
  - Gợi ý size phù hợp dựa trên số đo bạn cung cấp.
  - Thông tin chương trình khuyến mãi, combo, mã giảm giá.

- Gợi ý mua hàng và gợi ý phối đồ
  - Gợi ý outfit dựa trên phong cách, mùa/ sự kiện, hoặc nhu cầu của bạn (đi làm, dạo phố, dạo biển, v.v.).
  - Đề xuất thêm phụ kiện hoặc các sản phẩm liên quan.

- Hỗ trợ đặt hàng và thanh toán
  - Thu thập thông tin đặt hàng: tên, số điện thoại, địa chỉ nhận hàng, sản phẩm, size, màu, số lượng, phương thức thanh toán.
  - Xác nhận đơn hàng và ước lượng thời gian giao nhận (dựa vào khu vực và phương thức vận chuyển).

- Theo dõi đơn hàng và hỗ trợ sau mua
  - Tra cứu trạng thái đơn hàng bằng mã đơn hoặc thông tin liên hệ mua hàng.
  - Cung cấp thông tin đổi/trả, bảo hành, và chính sách liên quan.

- Chính sách và FAQ
  - Vận chuyển, phí ship, thời gian giao hàng, đổi trả, bảo hành, giờ làm việc, cách thanh toán, v.v.

- Hỗ trợ khách hàng tự động và escalate khi cần
  - Trả lời các câu hỏi cơ bản ngay lập tức.
  - Khi vấn đề phức tạp hoặc cần quyết định quản trị, sẽ đề xuất chuyển câu chuyện cho nhân viên/admin thật sự can thiệp.

- Lưu ý bảo mật và giới hạn
  - Không yêu cầu hoặc lưu trữ thông tin nhạy cảm qua chat (như số thẻ thanh toán) nếu chưa được xác nhận.
  - Có giới hạn dựa trên hệ thống hiện có và quyền truy cập dữ liệu. Nếu cần thông tin cập nhật real-time vượt ngoài khả năng, mình sẽ gợi ý chuyển sang nhân viên thật.

Ví dụ mẫu phản hồi cho các tình huống thường gặp:
- Khách tìm sản phẩm specifics: “Bạn đang tìm áo sơ mi/quần nào, size nào, màu bạn thích? Mình sẽ tra cứu mẫu tương ứng và gửi đầy đủ thông tin chi tiết.”
- Muốn đặt hàng nhanh: “Bạn cho mình tên đầy đủ, số điện thoại liên hệ, địa chỉ nhận hàng, sản phẩm, kích thước, màu sắc và số lượng, plus phương thức thanh toán. Mình sẽ tạo đơn hàng ngay.”
- Theo dõi đơn hàng: “Cho mình mã đơn hàng hoặc email mua hàng để tra trạng thái nhé.”
- Đổi trả: “Chính sách đổi trả của Forever: có hoặc không còn tag, thời gian đổi trả 7–14 ngày tùy khu vực. Bạn muốn mình kiểm tra điều kiện cho trường hợp cụ thể không?”

Bạn muốn mình bắt đầu bằng cách xem danh sách sản phẩm Forever và cung cấp thông tin chi tiết cho một vài sản phẩm cụ thể không? Mình có thể dùng danh mục sản phẩm để tra cứu ngay.', '1af01da2-656e-4260-9da3-9d27469d400c', '2026-01-05 00:51:09.326', 'd1577039-7241-456c-ab6c-ca2e89cb8ae1', 'b8a88f7b-140f-40cc-ad79-82ea6cc043ca');
INSERT INTO public."Chat_Message" (content, chat_id, create_at, message_id, user_id) VALUES ('bạn làm được gì ?', '1af01da2-656e-4260-9da3-9d27469d400c', '2026-01-05 01:06:36.642', '48ad510c-0679-47e4-b9c8-f5d4605ddfa3', '055be9bc-feae-4cd4-bb9e-a18cd0f65b50');
INSERT INTO public."Chat_Message" (content, chat_id, create_at, message_id, user_id) VALUES ('Hiện tại, với vai trò tư vấn khi admin vắng mặt và chỉ được sử dụng các công cụ có sẵn, tôi có thể làm được những việc sau:

- Lấy và hiển thị danh sách sản phẩm từ cơ sở dữ liệu (qua công cụ getAllProduct).
- Cung cấp chi tiết sản phẩm (giá, mô tả, màu sắc, kích thước, chất liệu) nếu những thông tin này có trong dữ liệu trả về.
- Hỗ trợ tìm kiếm và lọc nhanh theo các đặc tính cơ bản (ví dụ áo thun nam/nữ, size M/L, màu sắc, mức giá) dựa trên dữ liệu có sẵn.
- Đưa ra gợi ý sản phẩm dựa trên yêu cầu của người dùng (phong cách, ngân sách, kích cỡ).
- Trả lời các câu hỏi chung về sản phẩm (ví dụ chăm sóc áo, chính sách đổi trả, thời gian giao hàng) nếu có dữ liệu tương ứng.
- Hỗ trợ so sánh nhanh giữa các sản phẩm khi có thông tin cần thiết.

Giới hạn:
- Mọi thao tác phụ thuộc hoàn toàn vào dữ liệu trả về từ công cụ getAllProduct. Nếu thông tin bạn cần không có trong dữ liệu, tôi sẽ thông báo và giải thích giới hạn hiện tại.

Bạn muốn tôi lấy danh sách sản phẩm Forever ngay bây giờ không? Ví dụ bạn có thể gửi:
- “Hiển thị danh sách sản phẩm Forever.”
- “Tìm áo khoác nam màu đen kích thước M.”
- “Cho tôi xem chi tiết áo thun Forever màu X.” 

Khi bạn gửi yêu cầu, tôi sẽ dùng công cụ getAllProduct để trả lời.', '1af01da2-656e-4260-9da3-9d27469d400c', '2026-01-05 01:06:36.659', 'd0303ba5-3d56-4a2a-ad68-ffd896034345', 'b8a88f7b-140f-40cc-ad79-82ea6cc043ca');
INSERT INTO public."Chat_Message" (content, chat_id, create_at, message_id, user_id) VALUES ('bạn làm được gì', '1af01da2-656e-4260-9da3-9d27469d400c', '2026-01-05 01:07:54.166', 'c64354c7-7ff7-4294-8fbb-3c68803fae9c', '055be9bc-feae-4cd4-bb9e-a18cd0f65b50');
INSERT INTO public."Chat_Message" (content, chat_id, create_at, message_id, user_id) VALUES ('chao admin', 'afa21dce-4f68-4e26-b211-6da80a64e48a', '2026-01-09 07:06:27.131', 'ca2bb0a1-9e42-4e1e-a553-8016a0a69ef6', '5e3b2238-bdc9-4147-b722-18ffe18a754d');
INSERT INTO public."Chat_Message" (content, chat_id, create_at, message_id, user_id) VALUES ('chào anh amdin', 'e8e5250c-575c-4caf-bafd-6f690703e461', '2026-01-09 07:18:17.604', 'ca611016-41dc-4c98-bedd-4456a1a74d63', 'e2fa8da1-2f41-4864-9515-bd041675a382');
INSERT INTO public."Chat_Message" (content, chat_id, create_at, message_id, user_id) VALUES ('Hiểu vai trò của bạn: là tư vấn viên Forever khi admin vắng mặt, và chỉ làm việc dựa trên các công cụ được cấp. Dựa trên yêu cầu, bạn có thể làm được những việc sau:

- Lấy danh sách sản phẩm Forever từ cơ sở dữ liệu bằng công cụ getAllProduct.
- Trình bày thông tin cơ bản về sản phẩm sau khi có dữ liệu: tên sản phẩm, giá, màu sắc, kích thước (nếu có), mô tả ngắn và tình trạng tồn kho (nếu có).
- Hỗ trợ tìm kiếm nhanh hoặc lọc theo tiêu chí người dùng đưa ra (ví dụ theo danh mục áo/quần, theo từ khóa như “áo thun”, “váy”, theo size, màu).
- Gợi ý mua sắm: đề xuất 3–5 sản phẩm nổi bật hoặc đang giảm giá dựa trên dữ liệu có.
- Giải đáp các câu hỏi liên quan đến sản phẩm (nếu thông tin có trong cơ sở dữ liệu): kích thước chuẩn, phương thức đổi trả, vận chuyển, thanh toán, v.v.
- Đưa ra danh sách ở dạng ngắn gọn hoặc chi tiết tùy yêu cầu.

Bạn muốn tôi thực hiện bước gì ngay bây giờ?
- Ví dụ: cho tôi từ khóa hoặc danh mục để lọc, hoặc yêu cầu “lấy danh sách tất cả sản phẩm” để tôi chạy công cụ và trả kết quả.
- Lưu ý: dữ liệu và tính năng phụ thuộc vào thông tin có trong cơ sở dữ liệu. Nếu thiếu thông tin, tôi sẽ thông báo để bạn quyết định cách xử lý.', '1af01da2-656e-4260-9da3-9d27469d400c', '2026-01-05 01:07:54.17', 'dfbddf15-abb2-47a3-aed5-3a6b1b4a9547', 'b8a88f7b-140f-40cc-ad79-82ea6cc043ca');
INSERT INTO public."Chat_Message" (content, chat_id, create_at, message_id, user_id) VALUES ('bạn là ai', '1af01da2-656e-4260-9da3-9d27469d400c', '2026-01-05 01:09:25.333', '4ccfc93b-c1f7-4828-9ff6-a9f38b2dcb8b', '055be9bc-feae-4cd4-bb9e-a18cd0f65b50');
INSERT INTO public."Chat_Message" (content, chat_id, create_at, message_id, user_id) VALUES ('Mình là trợ lý tư vấn của Forever, sẵn sàng thay admin khi vắng mặt. Mình có thể:

- Giúp bạn xem danh sách sản phẩm, thông tin chi tiết (kích thước, màu sắc, giá, tình trạng còn hàng).
- Hỗ trợ đặt hàng và theo dõi đơn.
- Tra cứu tồn kho và gợi ý theo preference của bạn.

Các công cụ mình có (được diễn giải dưới dạng ngôn ngữ tự nhiên):
- Lấy danh sách tất cả sản phẩm từ cơ sở dữ liệu. Đây là công cụ getAllProduct.

Bạn muốn xem danh sách sản phẩm hiện có hay đang tìm kiếm một món đồ cụ thể nào không? Vui lòng cho mình biết loại áo, màu, size hoặc ngân sách bạn đang để ý.', '1af01da2-656e-4260-9da3-9d27469d400c', '2026-01-05 01:09:25.337', '5e9363fd-7af9-49a8-8f03-f4dc6da6f31a', 'b8a88f7b-140f-40cc-ad79-82ea6cc043ca');
INSERT INTO public."Chat_Message" (content, chat_id, create_at, message_id, user_id) VALUES ('bạn giúp mình tra sản phẩm đi', '1af01da2-656e-4260-9da3-9d27469d400c', '2026-01-05 01:10:53.428', '34846c98-b3f9-4b93-b095-6d05123500f5', '055be9bc-feae-4cd4-bb9e-a18cd0f65b50');
INSERT INTO public."Chat_Message" (content, chat_id, create_at, message_id, user_id) VALUES ('<div class="p-4 space-y-6">
  <div class="bg-white rounded-lg shadow-md p-4 flex flex-col md:flex-row gap-4">
    <a href="/Collection/PDT-6ce3759d" class="block md:w-1/3">
      <img src="https://res.cloudinary.com/dacofgr3w/image/upload/v1767416915/i15vpymmy3tzvblhcktb.png" alt="Áo phôn" class="w-32 h-auto rounded">
    </a>
    <div class="flex-1">
      <a href="/Collection/PDT-6ce3759d" class="text-xl font-semibold text-gray-800 hover:text-blue-600">Áo phôn</a>
      <p class="text-gray-600 mt-1">Áo phôn thanh lịch, hiện đại</p>
      <p class="mt-2 font-semibold text-gray-800">Giá: 500.000 đ</p>
      <p class="mt-1 text-sm text-gray-600">Kích thước: L, M, XL</p>

      <div class="mt-2 flex items-center gap-2">
        <span class="text-sm font-semibold text-gray-700">Màu sắc:</span>
        <span class="inline-block w-4 h-4 rounded-full" style="background:#252222" title="Đen huyền bí"></span>
        <span class="inline-block w-4 h-4 rounded-full" style="background:#ce0d0d" title="Đỏ"></span>
        <span class="inline-block w-4 h-4 rounded-full" style="background:#c4e665" title="Chuối"></span>
      </div>

      <div class="mt-3">
        <span class="text-sm font-semibold text-gray-700">Kho theo màu và size</span>
        <ul class="mt-1 space-y-1 text-sm text-gray-600">
          <li>Chuối - L: 25</li>
          <li>Đen huyền bí - L: 25</li>
          <li>Chuối - XL: 25</li>
          <li>Chuối - M: 25</li>
          <li>Đen huyền bí - XL: 25</li>
          <li>Đỏ - XL: 25</li>
          <li>Đỏ - M: 25</li>
          <li>Đỏ - L: 25</li>
          <li>Đen huyền bí - M: 25</li>
        </ul>
      </div>
    </div>
  </div>

  <div class="bg-white rounded-lg shadow-md p-4 flex flex-col md:flex-row gap-4">
    <a href="/Collection/PDT-d991e39d" class="block md:w-1/3">
      <img src="https://res.cloudinary.com/dacofgr3w/image/upload/v1767506106/cttc3teb008ry2x320tp.png" alt="Áo sơ mi tay ngắn" class="w-32 h-auto rounded">
    </a>
    <div class="flex-1">
      <a href="/Collection/PDT-d991e39d" class="text-xl font-semibold text-gray-800 hover:text-blue-600">Áo sơ mi tay ngắn</a>
      <p class="text-gray-600 mt-1">Áo sơ mi tay ngắn thời thượng, lịch lãm</p>
      <p class="mt-2 font-semibold text-gray-800">Giá: 200.000 đ</p>
      <p class="mt-1 text-sm text-gray-600">Kích thước: L, M, XL, XXL</p>

      <div class="mt-2 flex items-center gap-2">
        <span class="text-sm font-semibold text-gray-700">Màu sắc:</span>
        <span class="inline-block w-4 h-4 rounded-full" style="background:#252222" title="Đen huyền bí"></span>
      </div>

      <div class="mt-3">
        <span class="text-sm font-semibold text-gray-700">Kho theo màu và size</span>
        <ul class="mt-1 space-y-1 text-sm text-gray-600">
          <li>Đen huyền bí - L: 0</li>
          <li>Đen huyền bí - M: 0</li>
          <li>Đen huyền bí - XL: 0</li>
          <li>Đen huyền bí - XXL: 0</li>
        </ul>
      </div>
    </div>
  </div>
</div>', '1af01da2-656e-4260-9da3-9d27469d400c', '2026-01-05 01:10:53.505', '622420c9-b209-4bc5-89c5-42b3e929243e', 'b8a88f7b-140f-40cc-ad79-82ea6cc043ca');
INSERT INTO public."Chat_Message" (content, chat_id, create_at, message_id, user_id) VALUES ('bạn có thể làm gì', '1af01da2-656e-4260-9da3-9d27469d400c', '2026-01-05 01:11:45.552', '7bf7e4b0-e031-4536-b1ab-69de7b76f73b', '055be9bc-feae-4cd4-bb9e-a18cd0f65b50');
INSERT INTO public."Chat_Message" (content, chat_id, create_at, message_id, user_id) VALUES ('Dưới đây là những gì mình có thể làm cho shop Forever khi Admin vắng mặt, với các công cụ được cung cấp (mình sẽ diễn giải bằng ngôn ngữ tự nhiên):

- Lấy danh sách toàn bộ sản phẩm từ cơ sở dữ liệu
  - Công cụ: getAllProduct (lấy tất cả sản phẩm đang có trong kho/ hệ thống)
  - Bạn có thể yêu cầu xem tất cả sản phẩm và mình sẽ trả về đầy đủ thông tin cơ bản (tên sản phẩm, mã, giá, màu sắc, kích thước, tồn kho, mô tả nếu có).

- Trình bày nhanh và gợi ý sản phẩm
  - Dựa trên danh sách sản phẩm, mình có thể giới thiệu các lựa chọn phù hợp với yêu cầu của khách hàng (ví dụ: theo ngân sách, màu sắc, kích thước, phong cách).
  - Mình sẽ tóm tắt ngắn gọn và đề xuất 1-2 sản phẩm nổi bật để khách hàng tham khảo.

- Hỗ trợ trả lời câu hỏi liên quan đến sản phẩm
  - Bạn có thể hỏi về thông tin chi tiết: giá, màu, kích thước sẵn có, tình trạng còn hàng, hoặc mô tả ngắn của sản phẩm.
  - Mình sẽ trả lời dựa trên dữ liệu từ danh sách sản phẩm.

- Gợi ý bước tiếp theo
  - Nếu cần, mình có thể sắp xếp, so sánh nhanh giữa vài sản phẩm để khách hàng dễ chọn.
  - Sau khi có câu trả lời, mình sẽ cung cấp đường dẫn hoặc chỉ dẫn để khách hàng thêm thông tin/đặt hàng (nếu hệ thống cho phép).

- Ghi chú về cách sử dụng công cụ (dịch ngôn ngữ tự nhiên)
  - Để xem danh sách sản phẩm: mình sẽ gọi công cụ getAllProduct với tham số operation là "getAllProduct".
  - Nếu có thêm công cụ khác trong tương lai, mình có thể lập tức dùng chế độ song song (parallel) để chạy nhiều công cụ cùng lúc và trả về kết quả tổng hợp.

Cách bạn có thể yêu cầu mình làm ngay
- Ví dụ bạn nói: “Hiển thị tất cả sản phẩm Forever.”
- Mình sẽ: gọi getAllProduct và trả về danh sách sản phẩm để bạn xem.
- Bạn muốn xem nhanh theo điều kiện nào (ví dụ: giá dưới 300k, màu đen, size M) hãy cho biết và mình sẽ xử lý bằng cách giới thiệu các sản phẩm phù hợp từ danh sách có sẵn.

Bạn muốn mình lấy danh sách tất cả sản phẩm ngay không? Nếu có yêu cầu cụ thể về tiêu chí lọc, hãy nói rõ để mình diễn giải và chuẩn bị kết quả cho bạn.', '1af01da2-656e-4260-9da3-9d27469d400c', '2026-01-05 01:11:45.628', 'a63c0f55-198e-4c32-bfd4-c6a3b16dc26e', 'b8a88f7b-140f-40cc-ad79-82ea6cc043ca');
INSERT INTO public."Chat_Message" (content, chat_id, create_at, message_id, user_id) VALUES ('bạn cho mình xem sản phẩm', '1af01da2-656e-4260-9da3-9d27469d400c', '2026-01-05 01:15:05.322', 'c26166ac-8227-4226-81a7-11b9ee44332a', '055be9bc-feae-4cd4-bb9e-a18cd0f65b50');
INSERT INTO public."Chat_Message" (content, chat_id, create_at, message_id, user_id) VALUES ('<div class="p-4 bg-gray-50 space-y-6">
  <div class="bg-white border rounded-lg p-4 shadow-sm">
    <div class="flex items-start space-x-4">
      <img src="https://res.cloudinary.com/dacofgr3w/image/upload/v1767416915/i15vpymmy3tzvblhcktb.png" alt="Áo phôn" class="w-32 h-auto rounded" />
      <div class="flex-1">
        <a href="/Collection/PDT-6ce3759d" class="text-xl font-semibold text-gray-800 hover:underline">Áo phôn</a>
        <p class="text-sm text-gray-600 mt-1">Áo phôn thanh lịch, hiện đại</p>
        <p class="mt-2 font-semibold text-gray-800">Giá: 500,000 VNĐ</p>

        <div class="mt-2">
          <span class="font-semibold text-sm">Kích thước:</span>
          <span class="inline-block ml-2 px-2 py-1 bg-gray-100 rounded text-xs">L</span>
          <span class="inline-block ml-2 px-2 py-1 bg-gray-100 rounded text-xs">M</span>
          <span class="inline-block ml-2 px-2 py-1 bg-gray-100 rounded text-xs">XL</span>
        </div>

        <div class="mt-2">
          <span class="font-semibold text-sm">Màu sắc:</span>
          <span class="inline-flex items-center ml-2 space-x-3">
            <span class="flex items-center">
              <span class="w-4 h-4 rounded-full border" style="background:#252222" title="Đen huyền bí"></span>
              <span class="ml-1 text-xs text-gray-600">Đen huyền bí</span>
            </span>
            <span class="flex items-center">
              <span class="w-4 h-4 rounded-full border" style="background:#ce0d0d" title="Đỏ"></span>
              <span class="ml-1 text-xs text-gray-600">Đỏ</span>
            </span>
            <span class="flex items-center">
              <span class="w-4 h-4 rounded-full border" style="background:#c4e665" title="Chuối"></span>
              <span class="ml-1 text-xs text-gray-600">Chuối</span>
            </span>
          </span>
        </div>

        <div class="mt-2 text-sm text-gray-700">
          Danh mục:
          <span class="ml-2 px-2 py-1 bg-gray-100 rounded text-xs">Áo</span>
          <span class="ml-2 px-2 py-1 bg-gray-100 rounded text-xs">Nữ</span>
        </div>

        <div class="mt-2 text-sm text-gray-700">
          Tồn kho theo màu và size:
          <ul class="mt-1 list-disc pl-5 space-y-1 text-xs text-gray-700">
            <li> Đen huyền bí - L: 25, M: 25, XL: 25</li>
            <li> Đỏ - XL: 25, M: 25, L: 25</li>
            <li> Chuối - L: 25, XL: 25, M: 25</li>
          </ul>
        </div>

        <div class="mt-2">
          <span class="text-xs text-gray-500">Đường dẫn sản phẩm:</span>
          <a href="/Collection/PDT-6ce3759d" class="ml-2 text-blue-600 hover:underline text-sm">/Collection/PDT-6ce3759d</a>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-white border rounded-lg p-4 shadow-sm">
    <div class="flex items-start space-x-4">
      <img src="https://res.cloudinary.com/dacofgr3w/image/upload/v1767506106/cttc3teb008ry2x320tp.png" alt="Áo sơ mi tay ngắn" class="w-32 h-auto rounded" />
      <div class="flex-1">
        <a href="/Collection/PDT-d991e39d" class="text-xl font-semibold text-gray-800 hover:underline">Áo sơ mi tay ngắn</a>
        <p class="text-sm text-gray-600 mt-1">Áo sơ mi tay ngắn thời thượng, lịch lãm</p>
        <p class="mt-2 font-semibold text-gray-800">Giá: 200,000 VNĐ</p>

        <div class="mt-2">
          <span class="font-semibold text-sm">Kích thước:</span>
          <span class="inline-block ml-2 px-2 py-1 bg-gray-100 rounded text-xs">L</span>
          <span class="inline-block ml-2 px-2 py-1 bg-gray-100 rounded text-xs">M</span>
          <span class="inline-block ml-2 px-2 py-1 bg-gray-100 rounded text-xs">XL</span>
          <span class="inline-block ml-2 px-2 py-1 bg-gray-100 rounded text-xs">XXL</span>
        </div>

        <div class="mt-2">
          <span class="font-semibold text-sm">Màu sắc:</span>
          <span class="inline-block ml-2 px-2 py-1 bg-gray-100 rounded" style="width:1.25rem;height:1.25rem; border-radius:9999px; background:#252222;" title="Đen huyền bí"></span>
          <span class="ml-2 text-xs text-gray-600">Đen huyền bí</span>
        </div>

        <div class="mt-2 text-sm text-gray-700">
          Danh mục:
          <span class="ml-2 px-2 py-1 bg-gray-100 rounded text-xs">Nam</span>
          <span class="ml-2 px-2 py-1 bg-gray-100 rounded text-xs">Áo</span>
          <span class="ml-2 px-2 py-1 bg-gray-100 rounded text-xs">Nữ</span>
        </div>

        <div class="mt-2 text-sm text-gray-600">
          Tồn kho:
          <span class="ml-2 text-xs text-gray-700">L: 0</span>
          <span class="ml-2 text-xs text-gray-700">M: 0</span>
          <span class="ml-2 text-xs text-gray-700">XL: 0</span>
          <span class="ml-2 text-xs text-gray-700">XXL: 0</span>
        </div>

        <div class="mt-2">
          <span class="text-xs text-gray-500">Đường dẫn sản phẩm:</span>
          <a href="/Collection/PDT-d991e39d" class="ml-2 text-blue-600 hover:underline text-sm">/Collection/PDT-d991e39d</a>
        </div>
      </div>
    </div>
  </div>
</div>', '1af01da2-656e-4260-9da3-9d27469d400c', '2026-01-05 01:15:05.329', '233a9cc1-bd6f-42c7-be1b-33e5d317e05b', 'b8a88f7b-140f-40cc-ad79-82ea6cc043ca');
INSERT INTO public."Chat_Message" (content, chat_id, create_at, message_id, user_id) VALUES ('chao anh admin', 'e8e5250c-575c-4caf-bafd-6f690703e461', '2026-01-09 07:17:07.692', '3793d2e5-e074-45ba-8ba3-fa6ca922b174', 'e2fa8da1-2f41-4864-9515-bd041675a382');
INSERT INTO public."Chat_Message" (content, chat_id, create_at, message_id, user_id) VALUES ('<div class="p-4 space-y-6">
  <!-- Sản phẩm PDT-2be0b43a -->
  <div class="bg-white rounded-lg shadow p-4 flex items-start">
    <img src="https://res.cloudinary.com/dacofgr3w/image/upload/v1767709652/b9gyvovvfwhm9nzu3tgq.png" alt="áo thun cổ dài" class="w-32 h-auto rounded" />
    <div class="ml-4">
      <a href="/Collection/PDT-2be0b43a" class="text-xl font-semibold text-gray-800 hover:underline">áo thun cổ dài</a>
      <p class="mt-1 text-sm text-gray-600">áo thun cổ dài hiphop phong cách BRay</p>
      <p class="mt-2 font-semibold text-gray-800">Giá: 200000 đ</p>
      <p class="mt-1 text-sm text-gray-600">Mô tả: áo thun cổ dài hiphop phong cách BRay</p>

      <div class="mt-2">
        <span class="text-sm font-semibold">Kích thước:</span>
        <span class="inline-block ml-2 px-2 py-1 text-xs bg-gray-100 rounded">XXL</span>
        <span class="inline-block ml-2 px-2 py-1 text-xs bg-gray-100 rounded">XL</span>
        <span class="inline-block ml-2 px-2 py-1 text-xs bg-gray-100 rounded">L</span>
      </div>

      <div class="mt-2">
        <span class="text-sm font-semibold">Màu sắc:</span>
        <span class="inline-flex items-center ml-2">
          <span class="w-3 h-3 rounded-full" style="background:#252222"></span>
          <span class="ml-2 text-sm">Đen huyền bí</span>
        </span>
      </div>

      <div class="mt-2 text-sm text-gray-600">Danh mục: Nam, Áo</div>
    </div>
  </div>

  <!-- Sản phẩm PDT-d9f305fb -->
  <div class="bg-white rounded-lg shadow p-4 flex items-start">
    <img src="https://res.cloudinary.com/dacofgr3w/image/upload/v1767605986/hz88grrd7qncmbbh1sh7.png" alt="Áo phôn" class="w-32 h-auto rounded" />
    <div class="ml-4">
      <a href="/Collection/PDT-d9f305fb" class="text-xl font-semibold text-gray-800 hover:underline">Áo phôn</a>
      <p class="mt-1 text-sm text-gray-600">Aó phôn thời thượng, phong cách</p>
      <p class="mt-2 font-semibold text-gray-800">Giá: 500000 đ</p>
      <p class="mt-1 text-sm text-gray-600">Mô tả: Aó phôn thời thượng, phong cách</p>

      <div class="mt-2">
        <span class="text-sm font-semibold">Kích thước:</span>
        <span class="inline-block ml-2 px-2 py-1 text-xs bg-gray-100 rounded">L</span>
        <span class="inline-block ml-2 px-2 py-1 text-xs bg-gray-100 rounded">M</span>
        <span class="inline-block ml-2 px-2 py-1 text-xs bg-gray-100 rounded">XL</span>
        <span class="inline-block ml-2 px-2 py-1 text-xs bg-gray-100 rounded">XXL</span>
      </div>

      <div class="mt-2">
        <span class="text-sm font-semibold">Màu sắc:</span>
        <span class="inline-flex items-center ml-2 mr-3">
          <span class="w-3 h-3 rounded-full" style="background:#252222"></span>
          <span class="ml-2 text-sm">Đen huyền bí</span>
        </span>
        <span class="inline-flex items-center mr-3">
          <span class="w-3 h-3 rounded-full" style="background:#ce0d0d"></span>
          <span class="ml-2 text-sm">Đỏ</span>
        </span>
        <span class="inline-flex items-center">
          <span class="w-3 h-3 rounded-full" style="background:#c4e665"></span>
          <span class="ml-2 text-sm">Chuối</span>
        </span>
      </div>

      <div class="mt-2 text-sm text-gray-600">
        Tồn kho theo màu:
        <ul class="list-disc pl-5 mt-1">
          <li>Đen huyền bí - XXL: 15</li>
          <li>Đen huyền bí - L: 0</li>
          <li>Đen huyền bí - M: 0</li>
          <li>Đen huyền bí - XL: 0</li>
          <li>Đỏ - XXL: 15</li>
          <li>Đỏ - L: 0</li>
          <li>Đỏ - M: 0</li>
          <li>Đỏ - XL: 0</li>
          <li>Đỏ - XXL: 15</li>
          <li>Chuối - XXL: 10</li>
          <li>Chuối - L: 0</li>
          <li>Chuối - M: 0</li>
          <li>Chuối - XL: 0</li>
        </ul>
      </div>

      <div class="mt-2 text-sm text-gray-600">Danh mục: Áo, Nữ</div>
    </div>
  </div>
</div>', 'afa21dce-4f68-4e26-b211-6da80a64e48a', '2026-01-09 07:06:27.46', '19c871c0-499e-45a3-b95e-b95e39158fcb', 'b8a88f7b-140f-40cc-ad79-82ea6cc043ca');
INSERT INTO public."Chat_Message" (content, chat_id, create_at, message_id, user_id) VALUES ('chào bạn', 'afa21dce-4f68-4e26-b211-6da80a64e48a', '2026-01-09 07:07:20.919', '1d66b397-b6c1-4691-90a4-3f35fa94c250', '5e3b2238-bdc9-4147-b722-18ffe18a754d');
INSERT INTO public."Chat_Message" (content, chat_id, create_at, message_id, user_id) VALUES ('Chào bạn! Mình là tư vấn viên Forever, đang hỗ trợ khi admin vắng mặt. Mình có thể giúp bạn:
- Xem danh sách sản phẩm Forever
- Tìm nhanh theo kích thước, màu sắc, giá
- Gợi ý sản phẩm phù hợp với nhu cầu
- Kiểm tra ưu đãi và chương trình khuyến mãi

Mình có thể lấy danh sách sản phẩm từ hệ thống và trình bày cho bạn bằng ngôn ngữ tự nhiên. Bạn muốn xem danh sách sản phẩm ngay không, hay có cần lọc theo kích thước/màu/giá cụ thể nào không?', 'afa21dce-4f68-4e26-b211-6da80a64e48a', '2026-01-09 07:07:20.922', '852f2991-e9ba-4d4b-9575-c9f15637a070', 'b8a88f7b-140f-40cc-ad79-82ea6cc043ca');
INSERT INTO public."Chat_Message" (content, chat_id, create_at, message_id, user_id) VALUES ('tìm sản phẩm', 'afa21dce-4f68-4e26-b211-6da80a64e48a', '2026-01-09 07:08:49.065', '379488c5-a099-4873-9fa6-a2b0037942b4', '5e3b2238-bdc9-4147-b722-18ffe18a754d');
INSERT INTO public."Chat_Message" (content, chat_id, create_at, message_id, user_id) VALUES ('<div class="p-4 bg-gray-100">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <!-- Sản phẩm PDT-2be0b43a -->
    <div class="bg-white rounded-lg shadow p-4">
      <img src="https://res.cloudinary.com/dacofgr3w/image/upload/v1767709652/b9gyvovvfwhm9nzu3tgq.png" alt="áo thun cổ dài" class="w-32 h-auto rounded" />
      <h3 class="text-xl font-semibold mt-2">áo thun cổ dài</h3>
      <p class="text-sm text-gray-600 mt-1">áo thun cổ dài hiphop phong cách BRay</p>
      <p class="mt-2 font-semibold text-lg">Đơn giá: 200,000 đ</p>
      <a href="/Collection/PDT-2be0b43a" class="mt-2 inline-block text-blue-600 hover:underline">Xem chi tiết</a>

      <div class="mt-3">
        <span class="font-semibold">Kích thước:</span>
        <div class="flex flex-wrap gap-2 mt-1">
          <span class="px-2 py-1 bg-gray-100 rounded text-sm">L</span>
          <span class="px-2 py-1 bg-gray-100 rounded text-sm">XL</span>
          <span class="px-2 py-1 bg-gray-100 rounded text-sm">XXL</span>
        </div>
        <p class="text-xs text-gray-500 mt-1">L: còn 15, XL: còn 15, XXL: hết hàng</p>
      </div>

      <div class="mt-3">
        <span class="font-semibold">Màu sắc:</span>
        <div class="flex items-center mt-1">
          <span class="w-5 h-5 rounded-full" style="background:#252222" title="Đen huyền bí"></span>
          <span class="ml-2 text-sm text-gray-700">Đen huyền bí</span>
        </div>
      </div>

      <div class="mt-3">
        <span class="font-semibold">Danh mục:</span>
        <span class="ml-2 text-sm text-gray-700">Nam, Áo</span>
      </div>
    </div>

    <!-- Sản phẩm PDT-d9f305fb -->
    <div class="bg-white rounded-lg shadow p-4">
      <img src="https://res.cloudinary.com/dacofgr3w/image/upload/v1767605986/hz88grrd7qncmbbh1sh7.png" alt="Áo phôn" class="w-32 h-auto rounded" />
      <h3 class="text-xl font-semibold mt-2">Áo phôn</h3>
      <p class="text-sm text-gray-600 mt-1">Aó phôn thời thượng, phong cách</p>
      <p class="mt-2 font-semibold text-lg">Đơn giá: 500,000 đ</p>
      <a href="/Collection/PDT-d9f305fb" class="mt-2 inline-block text-blue-600 hover:underline">Xem chi tiết</a>

      <div class="mt-3">
        <span class="font-semibold">Kích thước:</span>
        <div class="mt-1">
          <span class="px-2 py-1 bg-gray-100 rounded text-sm mr-2">L (0)</span>
          <span class="px-2 py-1 bg-gray-100 rounded text-sm mr-2">M (0)</span>
          <span class="px-2 py-1 bg-gray-100 rounded text-sm mr-2">XL (0)</span>
          <span class="px-2 py-1 bg-gray-100 rounded text-sm">XXL (Có 3 màu: Đen huyền bí 15, Đỏ 15, Chuối 15)</span>
        </div>
      </div>

      <div class="mt-3">
        <span class="font-semibold">Màu sắc:</span>
        <div class="flex items-center gap-2 mt-1">
          <span class="w-5 h-5 rounded-full" style="background:#252222" title="Đen huyền bí"></span>
          <span class="w-5 h-5 rounded-full" style="background:#ce0d0d" title="Đỏ"></span>
          <span class="w-5 h-5 rounded-full" style="background:#c4e665" title="Chuối"></span>
          <span class="text-sm text-gray-700 ml-2">(Đen huyền bí, Đỏ, Chuối)</span>
        </div>
      </div>

      <div class="mt-3">
        <span class="font-semibold">Danh mục:</span>
        <span class="ml-2 text-sm text-gray-700">Áo, Nữ</span>
      </div>
    </div>
  </div>
</div>', 'afa21dce-4f68-4e26-b211-6da80a64e48a', '2026-01-09 07:08:49.158', '6abba0ab-93f8-4c79-95ca-7a11274b7852', 'b8a88f7b-140f-40cc-ad79-82ea6cc043ca');
INSERT INTO public."Chat_Message" (content, chat_id, create_at, message_id, user_id) VALUES ('<div class="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
  <h2 class="text-2xl font-semibold mb-4">Forever. - Gợi ý sản phẩm</h2>

  <!-- Sản phẩm 1 -->
  <div class="flex items-start space-x-4 mb-6">
    <img src="https://res.cloudinary.com/dacofgr3w/image/upload/v1767709652/b9gyvovvfwhm9nzu3tgq.png" alt="áo thun cổ dài" class="w-32 h-auto rounded" />
    <div class="flex-1">
      <h3 class="text-xl font-semibold mb-1">
        <a href="/Collection/PDT-2be0b43a" class="text-blue-600 hover:underline">áo thun cổ dài</a>
      </h3>
      <p class="text-sm text-gray-600 mb-1">áo thun cổ dài hiphop phong cách BRay</p>
      <p class="text-xl font-semibold text-gray-800 mb-2">200,000 ₫</p>

      <div class="flex items-center flex-wrap gap-3 mb-2">
        <span class="text-sm text-gray-600">Kích thước:</span>
        <span class="px-2 py-1 bg-gray-100 rounded text-sm">XXL</span>
        <span class="px-2 py-1 bg-gray-100 rounded text-sm">XL</span>
        <span class="px-2 py-1 bg-gray-100 rounded text-sm">L</span>
      </div>

      <div class="flex items-center flex-wrap gap-3 mb-2">
        <span class="text-sm text-gray-600">Màu sắc:</span>
        <span class="w-5 h-5 rounded-full border border-gray-300" style="background:#252222" title="Đen huyền bí"></span>
      </div>

      <p class="text-sm text-gray-600">
        Tồn kho: L 15, XL 15
      </p>

      <p class="text-sm text-gray-500 mt-2">
        Phân loại: Nam, Áo
      </p>
    </div>
  </div>

  <!-- Sản phẩm 2 -->
  <div class="flex items-start space-x-4 mb-6">
    <img src="https://res.cloudinary.com/dacofgr3w/image/upload/v1767605986/hz88grrd7qncmbbh1sh7.png" alt="Áo phôn" class="w-32 h-auto rounded" />
    <div class="flex-1">
      <h3 class="text-xl font-semibold mb-1">
        <a href="/Collection/PDT-d9f305fb" class="text-blue-600 hover:underline">Áo phôn</a>
      </h3>
      <p class="text-sm text-gray-600 mb-1">Aó phôn thời thượng, phong cách</p>
      <p class="text-xl font-semibold text-gray-800 mb-2">500,000 ₫</p>

      <div class="flex items-center flex-wrap gap-3 mb-2">
        <span class="text-sm text-gray-600">Kích thước:</span>
        <span class="px-2 py-1 bg-gray-100 rounded text-sm">L</span>
        <span class="px-2 py-1 bg-gray-100 rounded text-sm">M</span>
        <span class="px-2 py-1 bg-gray-100 rounded text-sm">XL</span>
        <span class="px-2 py-1 bg-gray-100 rounded text-sm">XXL</span>
      </div>

      <div class="flex items-center flex-wrap gap-3 mb-2">
        <span class="text-sm text-gray-600">Màu sắc:</span>
        <span class="w-5 h-5 rounded-full border border-gray-300" style="background:#252222" title="Đen huyền bí"></span>
        <span class="w-5 h-5 rounded-full border border-gray-300" style="background:#ce0d0d" title="Đỏ"></span>
        <span class="w-5 h-5 rounded-full border border-gray-300" style="background:#c4e665" title="Chuối"></span>
      </div>

      <p class="text-sm text-gray-600">
        Tồn kho: XXL - Đen huyền bí 15, Đỏ 15, Chuối 10
      </p>

      <p class="text-sm text-gray-500 mt-2">
        Phân loại: Áo, Nữ
      </p>
    </div>
  </div>
</div>', 'e8e5250c-575c-4caf-bafd-6f690703e461', '2026-01-09 07:17:08.093', 'ae9c152c-9ab1-45d0-ab43-d228ebc1842d', 'b8a88f7b-140f-40cc-ad79-82ea6cc043ca');
INSERT INTO public."Chat_Message" (content, chat_id, create_at, message_id, user_id) VALUES ('Chào bạn! Mình là tư vấn viên Forever, đang hỗ trợ khi admin vắng mặt. Bạn cần mình giúp gì hôm nay?

Bạn có thể lựa chọn:
- Xem tất cả sản phẩm
- Lọc theo loại (áo, quần, phụ kiện)
- Tìm theo size (S/M/L/XL) hoặc theo màu
- Tìm theo mức giá hoặc đang có khuyến mãi
- Gợi ý theo phong cách (thoải mái/ăn mặc đi làm/đi chơi, thể thao, trẻ trung)
- Tư vấn chọn size hoặc cách mix đồ
- Đặt hàng hoặc hỏi về đổi trả/how ship

Bạn cho mình biết bạn muốn xem cái gì hoặc cho mình ít thông tin về size/màu/ngân sách để mình đề xuất nhé.', 'e8e5250c-575c-4caf-bafd-6f690703e461', '2026-01-09 07:18:17.698', '6f193064-a52b-4f06-9ef6-14e6e669c6d8', 'b8a88f7b-140f-40cc-ad79-82ea6cc043ca');
INSERT INTO public."Chat_Message" (content, chat_id, create_at, message_id, user_id) VALUES ('bạn làm được gì cho của hàng này', 'e8e5250c-575c-4caf-bafd-6f690703e461', '2026-01-09 07:18:52.375', 'e304dcb0-6d4c-4c42-b46d-6474a06bbcb6', 'e2fa8da1-2f41-4864-9515-bd041675a382');
INSERT INTO public."Chat_Message" (content, chat_id, create_at, message_id, user_id) VALUES ('Dưới đây là những gì tôi có thể làm cho cửa hàng Forever khi quản trị viên vắng mặt. Nếu bạn muốn tôi thực hiện bất kỳ thao tác nào với danh mục sản phẩm, tôi sẽ dùng công cụ để lấy dữ liệu và trả lời cụ thể bằng ngôn ngữ tự nhiên.

Khả năng tôi có thể hỗ trợ:
- Tra cứu và giới thiệu sản phẩm: xem danh sách sản phẩm Forever, mô tả nhanh, chất liệu, màu sắc và giá (khi bạn yêu cầu tôi sẽ lấy từ catalog bằng công cụ).
- Tư vấn kích thước và chọn món hàng: giải thích bảng size, gợi ý size phù hợp dựa trên số đo người mua và kiểu dáng sản phẩm.
- Gợi ý phối đồ và phong cách: đề xuất outfit dựa trên loại áo/quần bạn quan tâm (ví dụ: công sở, đi chơi, dạo phố).
- Hướng dẫn bảo quản và chăm sóc: cách giặt, phơi và bảo quản để sản phẩm bền lâu.
- Thông tin chương trình khuyến mãi: cập nhật mã giảm giá, chương trình khuyến mãi hiện tại.
- Hỗ trợ đặt hàng và thanh toán: hướng dẫn các bước đặt hàng, các phương thức thanh toán có thể, và lựa chọn vận chuyển.
- Theo dõi đơn hàng (nói chung): cập nhật trạng thái đơn hàng khi bạn cung cấp mã đơn hoặc thông tin liên quan.
- Đổi trả và bảo hành (nếu có): giải đáp điều kiện đổi/trả sản phẩm.

Bạn muốn tôi làm gì ngay bây giờ?
- Xem danh sách sản phẩm toàn bộ?
- Hoặc lọc theo kích thước, màu sắc, giá, thể loại (áo, quần, phụ kiện)?
Nói cho tôi biết tiêu chí, tôi sẽ lấy dữ liệu và trả lời cụ thể cho bạn.', 'e8e5250c-575c-4caf-bafd-6f690703e461', '2026-01-09 07:18:52.378', '4eead164-87ef-4e32-80ad-f5f70f3c15bf', 'b8a88f7b-140f-40cc-ad79-82ea6cc043ca');


--
-- TOC entry 4980 (class 0 OID 56754)
-- Dependencies: 224
-- Data for Name: Color; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Color" (color_id, color_name) VALUES ('#252222', 'Đen huyền bí');
INSERT INTO public."Color" (color_id, color_name) VALUES ('#ce0d0d', 'Đỏ');
INSERT INTO public."Color" (color_id, color_name) VALUES ('#c4e665', 'Chuối');


--
-- TOC entry 4989 (class 0 OID 56839)
-- Dependencies: 233
-- Data for Name: Inventory; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Inventory" (inventory_id, product_id, size_id, color_id, quantity, create_at, update_at, min_quantity) VALUES ('22acd31b-b307-4e87-8277-e6193a7558c9', 'PDT-d9f305fb', 'L', '#252222', 0, '2026-01-05 09:40:01.564', '2026-01-05 09:40:01.571', 0);
INSERT INTO public."Inventory" (inventory_id, product_id, size_id, color_id, quantity, create_at, update_at, min_quantity) VALUES ('8d427f13-0346-4776-a7a9-69cee431e5c7', 'PDT-d9f305fb', 'L', '#ce0d0d', 0, '2026-01-05 09:40:01.564', '2026-01-05 09:40:01.571', 0);
INSERT INTO public."Inventory" (inventory_id, product_id, size_id, color_id, quantity, create_at, update_at, min_quantity) VALUES ('b11bf99d-c167-4222-aba7-64688a6c97fc', 'PDT-d9f305fb', 'L', '#c4e665', 0, '2026-01-05 09:40:01.564', '2026-01-05 09:40:01.571', 0);
INSERT INTO public."Inventory" (inventory_id, product_id, size_id, color_id, quantity, create_at, update_at, min_quantity) VALUES ('a289cfd1-0d8f-4d42-a002-8801fb589c31', 'PDT-d9f305fb', 'M', '#252222', 0, '2026-01-05 09:40:01.564', '2026-01-05 09:40:01.571', 0);
INSERT INTO public."Inventory" (inventory_id, product_id, size_id, color_id, quantity, create_at, update_at, min_quantity) VALUES ('7b0ff8e8-394a-42d9-81a2-9dce4a8ef11f', 'PDT-d9f305fb', 'M', '#ce0d0d', 0, '2026-01-05 09:40:01.564', '2026-01-05 09:40:01.571', 0);
INSERT INTO public."Inventory" (inventory_id, product_id, size_id, color_id, quantity, create_at, update_at, min_quantity) VALUES ('8d3b09ac-9ef4-4290-98af-3b9a484a79f5', 'PDT-d9f305fb', 'M', '#c4e665', 0, '2026-01-05 09:40:01.564', '2026-01-05 09:40:01.571', 0);
INSERT INTO public."Inventory" (inventory_id, product_id, size_id, color_id, quantity, create_at, update_at, min_quantity) VALUES ('ce7f0877-2915-4c49-adc0-7e2bd47cc612', 'PDT-d9f305fb', 'XL', '#252222', 0, '2026-01-05 09:40:01.564', '2026-01-05 09:40:01.571', 0);
INSERT INTO public."Inventory" (inventory_id, product_id, size_id, color_id, quantity, create_at, update_at, min_quantity) VALUES ('164480dc-4d7e-4d1e-9b97-52775fd9927e', 'PDT-d9f305fb', 'XL', '#ce0d0d', 0, '2026-01-05 09:40:01.564', '2026-01-05 09:40:01.571', 0);
INSERT INTO public."Inventory" (inventory_id, product_id, size_id, color_id, quantity, create_at, update_at, min_quantity) VALUES ('e4e5aafe-c08d-46b2-b614-231c380b2166', 'PDT-d9f305fb', 'XL', '#c4e665', 0, '2026-01-05 09:40:01.564', '2026-01-05 09:40:01.571', 0);
INSERT INTO public."Inventory" (inventory_id, product_id, size_id, color_id, quantity, create_at, update_at, min_quantity) VALUES ('3152397c-39d4-4e5f-8db1-3d9bc39303e0', 'PDT-2be0b43a', 'XXL', '#252222', 0, '2026-01-06 14:27:35.662', '2026-01-06 14:27:35.686', 0);
INSERT INTO public."Inventory" (inventory_id, product_id, size_id, color_id, quantity, create_at, update_at, min_quantity) VALUES ('784172a4-484c-4b9c-a4c9-f3d0954f0d5b', 'PDT-d9f305fb', 'XXL', '#c4e665', 9, '2026-01-05 09:41:35.068', '2026-01-09 08:25:26.388', 10);
INSERT INTO public."Inventory" (inventory_id, product_id, size_id, color_id, quantity, create_at, update_at, min_quantity) VALUES ('d25f7cf9-b172-405f-a96c-3eaa44a6a4bb', 'PDT-2be0b43a', 'XL', '#252222', 14, '2026-01-06 14:27:35.662', '2026-01-09 08:25:34.701', 10);
INSERT INTO public."Inventory" (inventory_id, product_id, size_id, color_id, quantity, create_at, update_at, min_quantity) VALUES ('2c48b1ed-c207-4a06-852d-adf8458cc5d7', 'PDT-d9f305fb', 'XXL', '#ce0d0d', 14, '2026-01-05 09:41:35.068', '2026-01-09 08:25:45.534', 10);
INSERT INTO public."Inventory" (inventory_id, product_id, size_id, color_id, quantity, create_at, update_at, min_quantity) VALUES ('b3e3ebc3-cb1f-4430-9912-2e05452b9218', 'PDT-d9f305fb', 'XXL', '#252222', 14, '2026-01-05 09:41:35.068', '2026-01-09 08:25:52.797', 10);
INSERT INTO public."Inventory" (inventory_id, product_id, size_id, color_id, quantity, create_at, update_at, min_quantity) VALUES ('64865aff-12dc-49d1-982f-fd86a54c8a67', 'PDT-2be0b43a', 'L', '#252222', 15, '2026-01-06 14:27:35.662', '2026-01-06 14:29:00.376', 10);


--
-- TOC entry 4982 (class 0 OID 56768)
-- Dependencies: 226
-- Data for Name: Order; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Order" (order_id, user_id, shipper_id, total, create_at, update_at, method, payment, status, delivered_date) VALUES ('d596d6d3-56e4-46f5-86f6-c8ea03bc1d86', '055be9bc-feae-4cd4-bb9e-a18cd0f65b50', '5e3b2238-bdc9-4147-b722-18ffe18a754d', 400000, '2025-12-22 15:50:54.515', '2025-12-22 15:50:54.515', 'Banking', 'done', 'done', '2025-12-22 15:50:54.515');
INSERT INTO public."Order" (order_id, user_id, shipper_id, total, create_at, update_at, method, payment, status, delivered_date) VALUES ('23d97a62-1aa3-49bc-b510-b194474de129', 'b8a88f7b-140f-40cc-ad79-82ea6cc043ca', '5e3b2238-bdc9-4147-b722-18ffe18a754d', 1500000, '2025-12-18 15:50:54.515', '2025-12-18 15:50:54.515', 'COD', 'done', 'done', '2025-12-18 15:50:54.515');
INSERT INTO public."Order" (order_id, user_id, shipper_id, total, create_at, update_at, method, payment, status, delivered_date) VALUES ('341be39c-aac2-4cda-9627-3d7151615929', '5e3b2238-bdc9-4147-b722-18ffe18a754d', '5e3b2238-bdc9-4147-b722-18ffe18a754d', 200000, '2025-12-12 15:50:54.515', '2025-12-12 15:50:54.515', 'Banking', 'done', 'done', '2025-12-12 15:50:54.515');
INSERT INTO public."Order" (order_id, user_id, shipper_id, total, create_at, update_at, method, payment, status, delivered_date) VALUES ('328e73a3-cb69-4590-82f0-4fef8801841c', '055be9bc-feae-4cd4-bb9e-a18cd0f65b50', '5e3b2238-bdc9-4147-b722-18ffe18a754d', 2500000, '2025-12-05 15:50:54.515', '2025-12-05 15:50:54.515', 'COD', 'done', 'done', '2025-12-05 15:50:54.515');
INSERT INTO public."Order" (order_id, user_id, shipper_id, total, create_at, update_at, method, payment, status, delivered_date) VALUES ('debeb26e-4a9c-4d1a-ab19-6a69c0b8e171', 'b8a88f7b-140f-40cc-ad79-82ea6cc043ca', '5e3b2238-bdc9-4147-b722-18ffe18a754d', 600000, '2025-11-25 15:50:54.515', '2025-11-25 15:50:54.515', 'Banking', 'done', 'done', '2025-11-25 15:50:54.515');
INSERT INTO public."Order" (order_id, user_id, shipper_id, total, create_at, update_at, method, payment, status, delivered_date) VALUES ('31cd6972-8c2f-4279-8b59-bbe1b4b2705d', '5e3b2238-bdc9-4147-b722-18ffe18a754d', '5e3b2238-bdc9-4147-b722-18ffe18a754d', 500000, '2025-11-05 15:50:54.515', '2025-11-05 15:50:54.515', 'COD', 'done', 'done', '2025-11-05 15:50:54.515');
INSERT INTO public."Order" (order_id, user_id, shipper_id, total, create_at, update_at, method, payment, status, delivered_date) VALUES ('73b4ec1b-79bc-45e2-a742-27b896fd75be', '055be9bc-feae-4cd4-bb9e-a18cd0f65b50', '5e3b2238-bdc9-4147-b722-18ffe18a754d', 1000000, '2025-10-26 15:50:54.515', '2025-10-26 15:50:54.515', 'Banking', 'done', 'done', '2025-10-26 15:50:54.515');
INSERT INTO public."Order" (order_id, user_id, shipper_id, total, create_at, update_at, method, payment, status, delivered_date) VALUES ('43f280aa-0fb4-474c-9b84-390630ec94ab', 'b8a88f7b-140f-40cc-ad79-82ea6cc043ca', '5e3b2238-bdc9-4147-b722-18ffe18a754d', 400000, '2025-10-06 15:50:54.515', '2025-10-06 15:50:54.515', 'COD', 'done', 'done', '2025-10-06 15:50:54.515');
INSERT INTO public."Order" (order_id, user_id, shipper_id, total, create_at, update_at, method, payment, status, delivered_date) VALUES ('1cd38b94-ae34-44f5-9f2b-df1329220e8f', '5e3b2238-bdc9-4147-b722-18ffe18a754d', '5e3b2238-bdc9-4147-b722-18ffe18a754d', 2000000, '2025-09-06 15:50:54.515', '2025-09-06 15:50:54.515', 'Banking', 'done', 'done', '2025-09-06 15:50:54.515');
INSERT INTO public."Order" (order_id, user_id, shipper_id, total, create_at, update_at, method, payment, status, delivered_date) VALUES ('839f3a35-7a56-44e0-bbfa-dd668ab2251e', '055be9bc-feae-4cd4-bb9e-a18cd0f65b50', '5e3b2238-bdc9-4147-b722-18ffe18a754d', 500000, '2025-08-07 15:50:54.515', '2025-08-07 15:50:54.515', 'COD', 'done', 'done', '2025-08-07 15:50:54.515');
INSERT INTO public."Order" (order_id, user_id, shipper_id, total, create_at, update_at, method, payment, status, delivered_date) VALUES ('a5b15d97-bd8b-41aa-aee0-c6187911c09e', 'b8a88f7b-140f-40cc-ad79-82ea6cc043ca', '5e3b2238-bdc9-4147-b722-18ffe18a754d', 800000, '2025-07-08 15:50:54.515', '2025-07-08 15:50:54.515', 'Banking', 'done', 'done', '2025-07-08 15:50:54.515');
INSERT INTO public."Order" (order_id, user_id, shipper_id, total, create_at, update_at, method, payment, status, delivered_date) VALUES ('bcddf4c3-cb12-4ca6-8a41-02ee0c72653e', 'b8a88f7b-140f-40cc-ad79-82ea6cc043ca', NULL, 500000, '2026-01-09 08:25:52.791', '2026-01-02 00:00:00', 'COD', 'done', 'done', NULL);
INSERT INTO public."Order" (order_id, user_id, shipper_id, total, create_at, update_at, method, payment, status, delivered_date) VALUES ('7722110d-49d3-44f8-ab9f-5ddd3510fc51', 'b8a88f7b-140f-40cc-ad79-82ea6cc043ca', NULL, 500000, '2026-01-09 08:25:45.526', '2026-01-02 00:00:00', 'COD', 'done', 'done', NULL);
INSERT INTO public."Order" (order_id, user_id, shipper_id, total, create_at, update_at, method, payment, status, delivered_date) VALUES ('5af46bd3-ba2a-4c4b-a5a4-152b67144e43', 'b8a88f7b-140f-40cc-ad79-82ea6cc043ca', NULL, 500000, '2026-01-09 08:25:26.258', '2026-01-02 00:00:00', 'COD', 'done', 'done', NULL);
INSERT INTO public."Order" (order_id, user_id, shipper_id, total, create_at, update_at, method, payment, status, delivered_date) VALUES ('dbb01009-a70d-4c4c-9c5f-898a683ca3e2', '5e3b2238-bdc9-4147-b722-18ffe18a754d', '5e3b2238-bdc9-4147-b722-18ffe18a754d', 2500000, '2026-01-08 14:44:06.621', '2026-01-09 00:00:00', 'COD', 'done', 'done', '2026-01-08 14:44:28.532');
INSERT INTO public."Order" (order_id, user_id, shipper_id, total, create_at, update_at, method, payment, status, delivered_date) VALUES ('3c4a6bbd-bf0a-4c41-a054-6c99bdc4156b', 'b8a88f7b-140f-40cc-ad79-82ea6cc043ca', NULL, 200000, '2026-01-09 08:25:34.694', '2025-12-09 00:00:00', 'COD', 'done', 'done', NULL);
INSERT INTO public."Order" (order_id, user_id, shipper_id, total, create_at, update_at, method, payment, status, delivered_date) VALUES ('e03c285c-6c3b-45a1-83bf-022d5308d9ab', '055be9bc-feae-4cd4-bb9e-a18cd0f65b50', '5e3b2238-bdc9-4147-b722-18ffe18a754d', 1000000, '2026-01-09 15:50:54.515', '2026-01-09 15:50:54.515', 'Banking', 'done', 'done', '2026-01-09 15:50:54.515');
INSERT INTO public."Order" (order_id, user_id, shipper_id, total, create_at, update_at, method, payment, status, delivered_date) VALUES ('4b887282-0767-479e-900d-6d8fe89b2260', 'b8a88f7b-140f-40cc-ad79-82ea6cc043ca', '5e3b2238-bdc9-4147-b722-18ffe18a754d', 400000, '2026-01-08 15:50:54.515', '2026-01-08 15:50:54.515', 'COD', 'done', 'done', '2026-01-08 15:50:54.515');
INSERT INTO public."Order" (order_id, user_id, shipper_id, total, create_at, update_at, method, payment, status, delivered_date) VALUES ('7c918c32-227c-4d87-8829-7c2c7e0aa38a', '5e3b2238-bdc9-4147-b722-18ffe18a754d', '5e3b2238-bdc9-4147-b722-18ffe18a754d', 200000, '2026-01-07 15:50:54.515', '2026-01-07 15:50:54.515', 'COD', 'done', 'done', '2026-01-07 15:50:54.515');
INSERT INTO public."Order" (order_id, user_id, shipper_id, total, create_at, update_at, method, payment, status, delivered_date) VALUES ('138d001a-0252-45d1-bda4-02560df8ebc6', '055be9bc-feae-4cd4-bb9e-a18cd0f65b50', '5e3b2238-bdc9-4147-b722-18ffe18a754d', 1500000, '2026-01-05 15:50:54.515', '2026-01-05 15:50:54.515', 'Banking', 'done', 'done', '2026-01-05 15:50:54.515');
INSERT INTO public."Order" (order_id, user_id, shipper_id, total, create_at, update_at, method, payment, status, delivered_date) VALUES ('5e778085-b92b-4c3c-924e-2768d177f60d', 'b8a88f7b-140f-40cc-ad79-82ea6cc043ca', '5e3b2238-bdc9-4147-b722-18ffe18a754d', 500000, '2026-01-04 15:50:54.515', '2026-01-04 15:50:54.515', 'COD', 'done', 'done', '2026-01-04 15:50:54.515');
INSERT INTO public."Order" (order_id, user_id, shipper_id, total, create_at, update_at, method, payment, status, delivered_date) VALUES ('0131744e-f850-4880-b192-991cc57aed74', '5e3b2238-bdc9-4147-b722-18ffe18a754d', '5e3b2238-bdc9-4147-b722-18ffe18a754d', 700000, '2026-01-03 15:50:54.515', '2026-01-03 15:50:54.515', 'Banking', 'done', 'done', '2026-01-03 15:50:54.515');
INSERT INTO public."Order" (order_id, user_id, shipper_id, total, create_at, update_at, method, payment, status, delivered_date) VALUES ('48520f24-a74c-491f-aeb7-061624d9175e', '055be9bc-feae-4cd4-bb9e-a18cd0f65b50', '5e3b2238-bdc9-4147-b722-18ffe18a754d', 200000, '2025-12-30 15:50:54.515', '2025-12-30 15:50:54.515', 'COD', 'done', 'done', '2025-12-30 15:50:54.515');
INSERT INTO public."Order" (order_id, user_id, shipper_id, total, create_at, update_at, method, payment, status, delivered_date) VALUES ('f1a4d58b-6bc8-4130-ac6b-49fdd89dfb7c', 'b8a88f7b-140f-40cc-ad79-82ea6cc043ca', '5e3b2238-bdc9-4147-b722-18ffe18a754d', 1000000, '2025-12-28 15:50:54.515', '2025-12-28 15:50:54.515', 'Banking', 'done', 'done', '2025-12-28 15:50:54.515');
INSERT INTO public."Order" (order_id, user_id, shipper_id, total, create_at, update_at, method, payment, status, delivered_date) VALUES ('a23574da-677b-417c-9d63-a1c2b920ea5e', '5e3b2238-bdc9-4147-b722-18ffe18a754d', '5e3b2238-bdc9-4147-b722-18ffe18a754d', 500000, '2025-12-25 15:50:54.515', '2025-12-25 15:50:54.515', 'COD', 'done', 'done', '2025-12-25 15:50:54.515');


--
-- TOC entry 4983 (class 0 OID 56781)
-- Dependencies: 227
-- Data for Name: Order_Detail; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Order_Detail" (order_id, product_id, size_id, color_id, quantity, price, subtotal) VALUES ('dbb01009-a70d-4c4c-9c5f-898a683ca3e2', 'PDT-d9f305fb', 'XXL', '#c4e665', 5, 500000, 2500000);
INSERT INTO public."Order_Detail" (order_id, product_id, size_id, color_id, quantity, price, subtotal) VALUES ('5af46bd3-ba2a-4c4b-a5a4-152b67144e43', 'PDT-d9f305fb', 'XXL', '#c4e665', 1, 500000, 500000);
INSERT INTO public."Order_Detail" (order_id, product_id, size_id, color_id, quantity, price, subtotal) VALUES ('3c4a6bbd-bf0a-4c41-a054-6c99bdc4156b', 'PDT-2be0b43a', 'XL', '#252222', 1, 200000, 200000);
INSERT INTO public."Order_Detail" (order_id, product_id, size_id, color_id, quantity, price, subtotal) VALUES ('7722110d-49d3-44f8-ab9f-5ddd3510fc51', 'PDT-d9f305fb', 'XXL', '#ce0d0d', 1, 500000, 500000);
INSERT INTO public."Order_Detail" (order_id, product_id, size_id, color_id, quantity, price, subtotal) VALUES ('bcddf4c3-cb12-4ca6-8a41-02ee0c72653e', 'PDT-d9f305fb', 'XXL', '#252222', 1, 500000, 500000);
INSERT INTO public."Order_Detail" (order_id, product_id, size_id, color_id, quantity, price, subtotal) VALUES ('e03c285c-6c3b-45a1-83bf-022d5308d9ab', 'PDT-d9f305fb', 'L', '#252222', 2, 500000, 1000000);
INSERT INTO public."Order_Detail" (order_id, product_id, size_id, color_id, quantity, price, subtotal) VALUES ('4b887282-0767-479e-900d-6d8fe89b2260', 'PDT-2be0b43a', 'M', '#252222', 2, 200000, 400000);
INSERT INTO public."Order_Detail" (order_id, product_id, size_id, color_id, quantity, price, subtotal) VALUES ('7c918c32-227c-4d87-8829-7c2c7e0aa38a', 'PDT-2be0b43a', 'XL', '#252222', 1, 200000, 200000);
INSERT INTO public."Order_Detail" (order_id, product_id, size_id, color_id, quantity, price, subtotal) VALUES ('138d001a-0252-45d1-bda4-02560df8ebc6', 'PDT-d9f305fb', 'M', '#ce0d0d', 3, 500000, 1500000);
INSERT INTO public."Order_Detail" (order_id, product_id, size_id, color_id, quantity, price, subtotal) VALUES ('5e778085-b92b-4c3c-924e-2768d177f60d', 'PDT-d9f305fb', 'XL', '#c4e665', 1, 500000, 500000);
INSERT INTO public."Order_Detail" (order_id, product_id, size_id, color_id, quantity, price, subtotal) VALUES ('0131744e-f850-4880-b192-991cc57aed74', 'PDT-d9f305fb', 'L', '#252222', 1, 500000, 500000);
INSERT INTO public."Order_Detail" (order_id, product_id, size_id, color_id, quantity, price, subtotal) VALUES ('0131744e-f850-4880-b192-991cc57aed74', 'PDT-2be0b43a', 'L', '#252222', 1, 200000, 200000);
INSERT INTO public."Order_Detail" (order_id, product_id, size_id, color_id, quantity, price, subtotal) VALUES ('48520f24-a74c-491f-aeb7-061624d9175e', 'PDT-2be0b43a', 'XXL', '#252222', 1, 200000, 200000);
INSERT INTO public."Order_Detail" (order_id, product_id, size_id, color_id, quantity, price, subtotal) VALUES ('f1a4d58b-6bc8-4130-ac6b-49fdd89dfb7c', 'PDT-d9f305fb', 'L', '#252222', 2, 500000, 1000000);
INSERT INTO public."Order_Detail" (order_id, product_id, size_id, color_id, quantity, price, subtotal) VALUES ('a23574da-677b-417c-9d63-a1c2b920ea5e', 'PDT-d9f305fb', 'XXL', '#ce0d0d', 1, 500000, 500000);
INSERT INTO public."Order_Detail" (order_id, product_id, size_id, color_id, quantity, price, subtotal) VALUES ('d596d6d3-56e4-46f5-86f6-c8ea03bc1d86', 'PDT-2be0b43a', 'M', '#252222', 2, 200000, 400000);
INSERT INTO public."Order_Detail" (order_id, product_id, size_id, color_id, quantity, price, subtotal) VALUES ('23d97a62-1aa3-49bc-b510-b194474de129', 'PDT-d9f305fb', 'L', '#c4e665', 3, 500000, 1500000);
INSERT INTO public."Order_Detail" (order_id, product_id, size_id, color_id, quantity, price, subtotal) VALUES ('341be39c-aac2-4cda-9627-3d7151615929', 'PDT-2be0b43a', 'L', '#252222', 1, 200000, 200000);
INSERT INTO public."Order_Detail" (order_id, product_id, size_id, color_id, quantity, price, subtotal) VALUES ('328e73a3-cb69-4590-82f0-4fef8801841c', 'PDT-d9f305fb', 'M', '#c4e665', 5, 500000, 2500000);
INSERT INTO public."Order_Detail" (order_id, product_id, size_id, color_id, quantity, price, subtotal) VALUES ('debeb26e-4a9c-4d1a-ab19-6a69c0b8e171', 'PDT-2be0b43a', 'XL', '#252222', 3, 200000, 600000);
INSERT INTO public."Order_Detail" (order_id, product_id, size_id, color_id, quantity, price, subtotal) VALUES ('31cd6972-8c2f-4279-8b59-bbe1b4b2705d', 'PDT-d9f305fb', 'L', '#252222', 1, 500000, 500000);
INSERT INTO public."Order_Detail" (order_id, product_id, size_id, color_id, quantity, price, subtotal) VALUES ('73b4ec1b-79bc-45e2-a742-27b896fd75be', 'PDT-d9f305fb', 'XL', '#ce0d0d', 2, 500000, 1000000);
INSERT INTO public."Order_Detail" (order_id, product_id, size_id, color_id, quantity, price, subtotal) VALUES ('43f280aa-0fb4-474c-9b84-390630ec94ab', 'PDT-2be0b43a', 'L', '#252222', 2, 200000, 400000);
INSERT INTO public."Order_Detail" (order_id, product_id, size_id, color_id, quantity, price, subtotal) VALUES ('1cd38b94-ae34-44f5-9f2b-df1329220e8f', 'PDT-d9f305fb', 'XXL', '#252222', 4, 500000, 2000000);
INSERT INTO public."Order_Detail" (order_id, product_id, size_id, color_id, quantity, price, subtotal) VALUES ('839f3a35-7a56-44e0-bbfa-dd668ab2251e', 'PDT-d9f305fb', 'M', '#ce0d0d', 1, 500000, 500000);
INSERT INTO public."Order_Detail" (order_id, product_id, size_id, color_id, quantity, price, subtotal) VALUES ('a5b15d97-bd8b-41aa-aee0-c6187911c09e', 'PDT-2be0b43a', 'XXL', '#252222', 4, 200000, 800000);


--
-- TOC entry 4976 (class 0 OID 56722)
-- Dependencies: 220
-- Data for Name: Product; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Product" (product_id, product_name, price, description, create_at, update_at, "imageUrl", tryon, status, count) VALUES ('PDT-2be0b43a', 'áo thun cổ dài', 200000, 'áo thun cổ dài hiphop phong cách BRay', '2026-01-06 14:27:34.844', '2026-01-06 14:27:34.844', '{https://res.cloudinary.com/dacofgr3w/image/upload/v1767709652/b9gyvovvfwhm9nzu3tgq.png}', 'https://res.cloudinary.com/dacofgr3w/image/upload/v1767709653/pbncxtjzlzu8zz6gfv3m.png', 'active', 1);
INSERT INTO public."Product" (product_id, product_name, price, description, create_at, update_at, "imageUrl", tryon, status, count) VALUES ('PDT-d9f305fb', 'Áo phôn', 499000, 'Aó phôn thời thượng, phong cách', '2026-01-05 09:40:01.552', '2026-01-10 15:16:28.588', '{https://res.cloudinary.com/dacofgr3w/image/upload/v1767605986/hz88grrd7qncmbbh1sh7.png,https://res.cloudinary.com/dacofgr3w/image/upload/v1767605995/vn9otmed4b6t5knvi5of.png}', 'https://res.cloudinary.com/dacofgr3w/image/upload/v1767606058/hzi26emdguzndjdvchrm.png', 'active', 8);


--
-- TOC entry 4993 (class 0 OID 59186)
-- Dependencies: 237
-- Data for Name: Product_Category; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Product_Category" (product_id, category_id) VALUES ('PDT-d9f305fb', '683e2fad-16d7-4b7d-9e8d-9e415b6d12d7');
INSERT INTO public."Product_Category" (product_id, category_id) VALUES ('PDT-d9f305fb', '5d5eb64a-43a9-4a68-b422-b8fb97185453');
INSERT INTO public."Product_Category" (product_id, category_id) VALUES ('PDT-2be0b43a', '7e476e69-b642-4164-99c5-2308200c506b');
INSERT INTO public."Product_Category" (product_id, category_id) VALUES ('PDT-2be0b43a', '683e2fad-16d7-4b7d-9e8d-9e415b6d12d7');


--
-- TOC entry 4981 (class 0 OID 56761)
-- Dependencies: 225
-- Data for Name: Product_Color; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Product_Color" (product_id, color_id) VALUES ('PDT-d9f305fb', '#252222');
INSERT INTO public."Product_Color" (product_id, color_id) VALUES ('PDT-d9f305fb', '#ce0d0d');
INSERT INTO public."Product_Color" (product_id, color_id) VALUES ('PDT-d9f305fb', '#c4e665');
INSERT INTO public."Product_Color" (product_id, color_id) VALUES ('PDT-2be0b43a', '#252222');


--
-- TOC entry 4979 (class 0 OID 56747)
-- Dependencies: 223
-- Data for Name: Product_Size; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Product_Size" (product_id, size_id) VALUES ('PDT-d9f305fb', 'L');
INSERT INTO public."Product_Size" (product_id, size_id) VALUES ('PDT-d9f305fb', 'M');
INSERT INTO public."Product_Size" (product_id, size_id) VALUES ('PDT-d9f305fb', 'XL');
INSERT INTO public."Product_Size" (product_id, size_id) VALUES ('PDT-d9f305fb', 'XXL');
INSERT INTO public."Product_Size" (product_id, size_id) VALUES ('PDT-2be0b43a', 'XXL');
INSERT INTO public."Product_Size" (product_id, size_id) VALUES ('PDT-2be0b43a', 'XL');
INSERT INTO public."Product_Size" (product_id, size_id) VALUES ('PDT-2be0b43a', 'L');


--
-- TOC entry 4992 (class 0 OID 56860)
-- Dependencies: 236
-- Data for Name: Provider; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Provider" (provider_id, provider_name, create_at, update_at) VALUES ('5fd04baa-7f9b-41e4-9a29-a7f24645402c', 'Nhà cung cấp áo số 2 VN', '2025-12-31 03:36:52.791', '2025-12-31 03:36:52.791');
INSERT INTO public."Provider" (provider_id, provider_name, create_at, update_at) VALUES ('6d2176e5-9a5c-4ba4-a968-4d1bd55a83e2', 'Nhà cung cấp quần số 2 VN', '2025-12-31 03:36:55.409', '2025-12-31 03:36:55.409');


--
-- TOC entry 4986 (class 0 OID 56809)
-- Dependencies: 230
-- Data for Name: Review; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4975 (class 0 OID 56715)
-- Dependencies: 219
-- Data for Name: Role; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Role" (role_id, role_name) VALUES ('680ac91a-f665-4c6b-af45-25987be7c26a', 'shipper');
INSERT INTO public."Role" (role_id, role_name) VALUES ('77f7f007-c810-40f7-8d75-32128651a9ee', 'admin');
INSERT INTO public."Role" (role_id, role_name) VALUES ('3c3efca6-38ea-4610-90aa-d550f17b1d20', 'regular');


--
-- TOC entry 4978 (class 0 OID 56740)
-- Dependencies: 222
-- Data for Name: Size; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Size" (size_id, size_name) VALUES ('L', 'L');
INSERT INTO public."Size" (size_id, size_name) VALUES ('XL', 'XL');
INSERT INTO public."Size" (size_id, size_name) VALUES ('XXL', 'XXL');
INSERT INTO public."Size" (size_id, size_name) VALUES ('M', 'M');


--
-- TOC entry 4990 (class 0 OID 56846)
-- Dependencies: 234
-- Data for Name: Stock_Receipt; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Stock_Receipt" (receipt_id, user_id, provider_id, create_at) VALUES ('60c2d117-f19c-4c47-ba9e-9f3d9cfab084', 'b8a88f7b-140f-40cc-ad79-82ea6cc043ca', '5fd04baa-7f9b-41e4-9a29-a7f24645402c', '2026-01-06 14:28:39.324');


--
-- TOC entry 4991 (class 0 OID 56853)
-- Dependencies: 235
-- Data for Name: Stock_Receipt_Detail; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Stock_Receipt_Detail" (receipt_id, product_id, size_id, color_id, inventory_id, quantity) VALUES ('60c2d117-f19c-4c47-ba9e-9f3d9cfab084', 'PDT-d9f305fb', 'XXL', '#c4e665', '784172a4-484c-4b9c-a4c9-f3d0954f0d5b', 15);
INSERT INTO public."Stock_Receipt_Detail" (receipt_id, product_id, size_id, color_id, inventory_id, quantity) VALUES ('60c2d117-f19c-4c47-ba9e-9f3d9cfab084', 'PDT-d9f305fb', 'XXL', '#ce0d0d', '2c48b1ed-c207-4a06-852d-adf8458cc5d7', 15);
INSERT INTO public."Stock_Receipt_Detail" (receipt_id, product_id, size_id, color_id, inventory_id, quantity) VALUES ('60c2d117-f19c-4c47-ba9e-9f3d9cfab084', 'PDT-d9f305fb', 'XXL', '#252222', 'b3e3ebc3-cb1f-4430-9912-2e05452b9218', 15);
INSERT INTO public."Stock_Receipt_Detail" (receipt_id, product_id, size_id, color_id, inventory_id, quantity) VALUES ('60c2d117-f19c-4c47-ba9e-9f3d9cfab084', 'PDT-2be0b43a', 'L', '#252222', '64865aff-12dc-49d1-982f-fd86a54c8a67', 15);
INSERT INTO public."Stock_Receipt_Detail" (receipt_id, product_id, size_id, color_id, inventory_id, quantity) VALUES ('60c2d117-f19c-4c47-ba9e-9f3d9cfab084', 'PDT-2be0b43a', 'XL', '#252222', 'd25f7cf9-b172-405f-a96c-3eaa44a6a4bb', 15);


--
-- TOC entry 4974 (class 0 OID 56705)
-- Dependencies: 218
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."User" (user_id, email, password, name, address, create_at, update_at, role_id, status, phone, forget_password_token, "isVerify", verify_token, expire_forget_password_at, expire_verify_at) VALUES ('b8a88f7b-140f-40cc-ad79-82ea6cc043ca', 'duyledino@gmail.com', '$2b$05$TH0lZvMeIYgFqPNt8Jua/e7JDWvH7RTOqtuJ9vM/c1k1m80.a/EC2', 'duy Admin', '123 khu phố biên hòa, tỉnh đồng nai  ', '2025-12-31 03:22:47.987', '2026-01-08 04:09:27.77', '77f7f007-c810-40f7-8d75-32128651a9ee', true, '0123456789', NULL, true, NULL, NULL, NULL);
INSERT INTO public."User" (user_id, email, password, name, address, create_at, update_at, role_id, status, phone, forget_password_token, "isVerify", verify_token, expire_forget_password_at, expire_verify_at) VALUES ('5e3b2238-bdc9-4147-b722-18ffe18a754d', 'lekhanhduy.bh@gmail.com', '$2b$05$bKSSA6tsrBWtNKbU01yf7Of2hfPCQKypt0MT6iu2FxemshT1MEY6i', 'duy test', '123 khu phố Hòa Bình ,biên hòa, đồng nai', '2026-01-08 14:41:32.438', '2026-01-08 14:42:26.477', '680ac91a-f665-4c6b-af45-25987be7c26a', true, '0123456789', NULL, true, NULL, NULL, NULL);
INSERT INTO public."User" (user_id, email, password, name, address, create_at, update_at, role_id, status, phone, forget_password_token, "isVerify", verify_token, expire_forget_password_at, expire_verify_at) VALUES ('e2fa8da1-2f41-4864-9515-bd041675a382', 'duykhanhle.bh@gmail.com', '$2b$05$05O8HdCbPfRdRISIMr48au9I20HzwINF1Iw0yloD91A85UQtYpewO', 'duy fake', '', '2026-01-09 06:58:18.701', '2026-01-09 06:59:02.679', '3c3efca6-38ea-4610-90aa-d550f17b1d20', true, '0987654321', NULL, true, NULL, NULL, NULL);
INSERT INTO public."User" (user_id, email, password, name, address, create_at, update_at, role_id, status, phone, forget_password_token, "isVerify", verify_token, expire_forget_password_at, expire_verify_at) VALUES ('055be9bc-feae-4cd4-bb9e-a18cd0f65b50', 'leduy1@gmail.com', '$2b$05$cC.TJiIGgzlczt3bWBq5iu2x2WwKxsXOM68k215VhLJTaLHfkKXwO', 'leduy1', 'khu pho 4, bien hoa, dong nai', '2026-01-03 07:30:28.384', '2026-01-10 15:12:42.735', '3c3efca6-38ea-4610-90aa-d550f17b1d20', true, '0123456789', NULL, false, '63a6a30b-aa1c-4b01-8fd7-3480f350edf5', NULL, '2026-01-08 04:08:09.259');


--
-- TOC entry 4973 (class 0 OID 56696)
-- Dependencies: 217
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('4162257b-9816-4b5d-af82-611c0d786e24', '0f2c6d22ff8b1d31ae83a2d6509e4fa4d85e5e471920724a02c30292c489c5b4', '2025-12-31 10:13:13.233012+07', '20251216022534_update_column_update_at_in_provider', NULL, NULL, '2025-12-31 10:13:13.229888+07', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('3f7c9e99-067d-4d52-ad35-9520e51bb699', 'c8b468a182436ae2a0fa84e94464b75c5197806d42629de297ddc5866da985d9', '2025-12-31 10:13:13.189025+07', '20251213192136_update_whole_database', NULL, NULL, '2025-12-31 10:13:12.979061+07', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('14d907c8-7588-4210-a008-10e8aaa66b32', '2a8d78678b3a0279ce320a0c49125512a28d257349c1ab0b37817cae13e4d309', '2025-12-31 10:13:13.192574+07', '20251213194148_update_product_table', NULL, NULL, '2025-12-31 10:13:13.189734+07', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('ea72edff-c6b4-4586-97ca-5740e8381529', '2d56f5d4a4c0123c03fad6f43cc68657467870bc5ae934faa6e289ff51c3a0a7', '2025-12-31 12:04:33.551588+07', '20251231050433_add_create_at_column_in_stock_receipt_table', NULL, NULL, '2025-12-31 12:04:33.506652+07', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('1376f699-e315-4a48-93d0-60e3ba3b246b', '45352d4be72a620856c4a396b9805aa4bcbcc8280a3081a85acbd52b868c7e99', '2025-12-31 10:13:13.19606+07', '20251213194556_update_product_table', NULL, NULL, '2025-12-31 10:13:13.193322+07', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('a707cd86-144f-455b-9af0-fbc50ea92981', '3725f770b3c5583911dba84769c3c51f4c20bcc7244307c779bd17f924a622e0', '2025-12-31 10:13:13.235778+07', '20251217020504_update_table_color', NULL, NULL, '2025-12-31 10:13:13.233677+07', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('6bad6f71-5051-45a2-9d9e-9d5c8bf63059', '0b762162190322a6e0bb99a1cd8517be6950c7ca465d5f799435411e961fe0a5', '2025-12-31 10:13:13.199366+07', '20251213194646_update_product_table', NULL, NULL, '2025-12-31 10:13:13.196812+07', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('478e57f6-1a55-49df-8570-3f0f8a14b85f', '1307700ab2934b69d61dbb4e62fc55662fe418379f62e49f24b87cf57f030140', '2025-12-31 10:13:13.202304+07', '20251213200110_update_order_table', NULL, NULL, '2025-12-31 10:13:13.199996+07', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('99e58cfe-3f7f-4dfe-9b13-3727910081f5', 'b69e5c9277754cc9790a03c729bcb2646181b3187db847ef84dcf20a892e0292', '2025-12-31 10:13:13.205033+07', '20251213200525_update_cart_detail_table', NULL, NULL, '2025-12-31 10:13:13.20294+07', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('06df63b1-60c1-44bb-98a3-d5dd1d4c7be1', '22b85bf19f3cf2d9247ae0feff94aa2c7b46967d1eec71f71e723e14bac69d55', '2025-12-31 10:13:13.244114+07', '20251219030132_drop_column_total_quantity_in_table_cart', NULL, NULL, '2025-12-31 10:13:13.236955+07', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('b6ab9173-b3e0-431c-b546-2a2ea50b3ef6', '1e0c6dd26e615d66dfb5eaaf42dd1b103a34bf5e3151a52f9d6be13bfbc82097', '2025-12-31 10:13:13.210341+07', '20251215154109_update_status_column_in_user_table', NULL, NULL, '2025-12-31 10:13:13.205762+07', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('8b601e41-1d3e-490d-9040-b21a39934ba6', 'dcaab8358005aa3ef64c6aef3a2f0237dee7d5b576ca757e50b929ae978b381a', '2025-12-31 10:13:13.213652+07', '20251215160335_update_create_at_column_in_user_table', NULL, NULL, '2025-12-31 10:13:13.21113+07', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('cd5cd980-4e39-4349-9619-17f54b236f33', '23dff03a0f2e336f4d7e8da5e934e17935d734f403c5eecf93363513f82c5a7e', '2025-12-31 10:13:13.21721+07', '20251215163917_update_create_at_column_in_user_color_size', NULL, NULL, '2025-12-31 10:13:13.21442+07', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('6a8c161f-b89b-45c5-b041-c09c1931f159', '290f899916989911587ca2921a3a611b85ace265137e0e0455d402e35a212868', '2025-12-31 10:13:13.259784+07', '20251219033607_update_shipper_i', NULL, NULL, '2025-12-31 10:13:13.244896+07', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('814dcd96-c9a7-42c0-97da-4a7d97dcd900', 'd2b9a8614511be6f4618b0a18a1786a9a10551fa99328c35bb36dc82abe9f3c8', '2025-12-31 10:13:13.221738+07', '20251216010826_update_column_update_at_in_inventory', NULL, NULL, '2025-12-31 10:13:13.217956+07', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('7e2c997c-09b9-4f50-a32d-108b389adf8d', 'a806845ca1b1669b61e13db69d569e64bb8ef3c9c727027d4e3973da7a67f8b9', '2025-12-31 10:13:13.225276+07', '20251216020809_update_column_update_at_in_provider', NULL, NULL, '2025-12-31 10:13:13.222556+07', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('251b62b0-c850-4917-a7d9-633a46219a9c', 'e12ccba42e886789f695462efdc6ef58bca012d3422bc2c7c35f9a41c5f1918f', '2026-01-03 11:11:22.261508+07', '20260103041121_update_product_category', NULL, NULL, '2026-01-03 11:11:21.971326+07', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('de8751cc-b7d7-4c8a-b03d-4fd486c15af7', '116681020eb8685b58106096397c9cf3eb51aed9dba708e3f4b721742d6d929c', '2025-12-31 10:13:13.229086+07', '20251216020914_update_column_update_at_in_provider', NULL, NULL, '2025-12-31 10:13:13.22598+07', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('4c869068-efd6-4b27-8f85-987a9f30bc9e', '6f35fdf8da117bfb708cd68817b75ad9fdb258027952bb877a39366fab69ffbc', '2025-12-31 10:13:13.266219+07', '20251219034420_update_shipper_id_in_table_order', NULL, NULL, '2025-12-31 10:13:13.261311+07', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('239cc926-9a4c-461f-aa3a-83c4c19900ec', '2629fe084b3c8d14dd1d0abb17c4469569e862b0d70f7f563d00ee3c50d70dfc', '2025-12-31 10:13:13.272225+07', '20251219035810_add_subtotal_in_table_order_detail', NULL, NULL, '2025-12-31 10:13:13.267391+07', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('bd6049bf-b55f-40de-b3aa-a353ca524766', 'baa220a318b83537729ac54cf0bac15c78da2cfb57125667f79d2ff2e27df438', '2026-01-03 14:18:18.663738+07', '20260103071818_update_chat', NULL, NULL, '2026-01-03 14:18:18.534504+07', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('f5ff120f-ae92-4075-879a-1c1c3873f211', '4cb5b233c7e4fc9e8a2ef34616c7dd8306fc865797de79d379a718398a907cfb', '2025-12-31 10:13:13.276711+07', '20251219110452_update_inventory_and_order_table', NULL, NULL, '2025-12-31 10:13:13.273661+07', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('f8beea66-7ede-4149-aa9d-bbde6439bbf8', 'de6d1a8c04efa690d51a4cf1e5af17845983d30d3f05a9a04b665ec18007ee26', '2025-12-31 10:15:45.524951+07', '20251231031545_add_phone_column_in_user_table', NULL, NULL, '2025-12-31 10:15:45.521152+07', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('06ae02b3-cb60-4fa0-bbd4-3d30f4b5d517', 'ab75c13ffc13b4474d9b4c64e7f33b041e7618f47f23b3c110c9aa2069d33638', '2026-01-08 09:01:01.010678+07', '20260108020100_update_user_table', NULL, NULL, '2026-01-08 09:01:00.882043+07', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('b1004f81-9952-4548-85ee-9a7c4f0c5371', '7c6cac796ed28421d8b7646c7a6df99e47c095d4fe7cb910941993e5664190cf', '2026-01-05 16:37:01.256691+07', '20260105093700_update_inventory', NULL, NULL, '2026-01-05 16:37:00.84359+07', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('07651e95-c547-4616-9ac9-a47586e9526e', '69556f7d02610c9b18ecba2e80831deebc899e62b2e78ca967031006869f35cf', '2026-01-08 09:10:28.718715+07', '20260108021028_update_user_table', NULL, NULL, '2026-01-08 09:10:28.59708+07', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('6cad8449-6530-42de-8691-aa67118c9fa8', '2060c4b9230843cf5b10984ad7f60000d8834981a92f8fbb3feba2accabc1d7d', '2026-01-08 09:19:19.184757+07', '20260108021919_update_user_table', NULL, NULL, '2026-01-08 09:19:19.134074+07', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('fbb39516-6165-4b0d-bd37-35562e6fe7c2', 'a189c15b671f21ad22ddb03eb7221dab066a5a8975d1c092867340134cc28a31', '2026-01-08 10:56:03.438702+07', '20260108035603_update_user_table', NULL, NULL, '2026-01-08 10:56:03.360176+07', 1);


--
-- TOC entry 4775 (class 2606 OID 56808)
-- Name: Cart_Detail Cart_Detail_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cart_Detail"
    ADD CONSTRAINT "Cart_Detail_pkey" PRIMARY KEY (cart_id, color_id, product_id, size_id);


--
-- TOC entry 4772 (class 2606 OID 56799)
-- Name: Cart Cart_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cart"
    ADD CONSTRAINT "Cart_pkey" PRIMARY KEY (cart_id);


--
-- TOC entry 4758 (class 2606 OID 56739)
-- Name: Category Category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "Category_pkey" PRIMARY KEY (category_id);


--
-- TOC entry 4781 (class 2606 OID 59952)
-- Name: Chat_Message Chat_Message_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Chat_Message"
    ADD CONSTRAINT "Chat_Message_pkey" PRIMARY KEY (message_id);


--
-- TOC entry 4779 (class 2606 OID 59949)
-- Name: Chat Chat_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Chat"
    ADD CONSTRAINT "Chat_pkey" PRIMARY KEY (chat_id);


--
-- TOC entry 4764 (class 2606 OID 56760)
-- Name: Color Color_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Color"
    ADD CONSTRAINT "Color_pkey" PRIMARY KEY (color_id);


--
-- TOC entry 4784 (class 2606 OID 56845)
-- Name: Inventory Inventory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Inventory"
    ADD CONSTRAINT "Inventory_pkey" PRIMARY KEY (inventory_id, product_id, color_id, size_id);


--
-- TOC entry 4770 (class 2606 OID 56789)
-- Name: Order_Detail Order_Detail_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Order_Detail"
    ADD CONSTRAINT "Order_Detail_pkey" PRIMARY KEY (product_id, order_id, size_id, color_id);


--
-- TOC entry 4768 (class 2606 OID 56780)
-- Name: Order Order_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_pkey" PRIMARY KEY (order_id);


--
-- TOC entry 4793 (class 2606 OID 59192)
-- Name: Product_Category Product_Category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product_Category"
    ADD CONSTRAINT "Product_Category_pkey" PRIMARY KEY (product_id, category_id);


--
-- TOC entry 4766 (class 2606 OID 56767)
-- Name: Product_Color Product_Color_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product_Color"
    ADD CONSTRAINT "Product_Color_pkey" PRIMARY KEY (product_id, color_id);


--
-- TOC entry 4762 (class 2606 OID 56753)
-- Name: Product_Size Product_Size_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product_Size"
    ADD CONSTRAINT "Product_Size_pkey" PRIMARY KEY (product_id, size_id);


--
-- TOC entry 4756 (class 2606 OID 56732)
-- Name: Product Product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_pkey" PRIMARY KEY (product_id);


--
-- TOC entry 4791 (class 2606 OID 56866)
-- Name: Provider Provider_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Provider"
    ADD CONSTRAINT "Provider_pkey" PRIMARY KEY (provider_id);


--
-- TOC entry 4777 (class 2606 OID 56817)
-- Name: Review Review_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT "Review_pkey" PRIMARY KEY (product_id, user_id);


--
-- TOC entry 4754 (class 2606 OID 56721)
-- Name: Role Role_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Role"
    ADD CONSTRAINT "Role_pkey" PRIMARY KEY (role_id);


--
-- TOC entry 4760 (class 2606 OID 56746)
-- Name: Size Size_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Size"
    ADD CONSTRAINT "Size_pkey" PRIMARY KEY (size_id);


--
-- TOC entry 4789 (class 2606 OID 56859)
-- Name: Stock_Receipt_Detail Stock_Receipt_Detail_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Stock_Receipt_Detail"
    ADD CONSTRAINT "Stock_Receipt_Detail_pkey" PRIMARY KEY (color_id, inventory_id, product_id, receipt_id, size_id);


--
-- TOC entry 4787 (class 2606 OID 56852)
-- Name: Stock_Receipt Stock_Receipt_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Stock_Receipt"
    ADD CONSTRAINT "Stock_Receipt_pkey" PRIMARY KEY (receipt_id);


--
-- TOC entry 4752 (class 2606 OID 56714)
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (user_id);


--
-- TOC entry 4749 (class 2606 OID 56704)
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 4773 (class 1259 OID 56868)
-- Name: Cart_user_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Cart_user_id_key" ON public."Cart" USING btree (user_id);


--
-- TOC entry 4782 (class 1259 OID 56869)
-- Name: Inventory_inventory_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Inventory_inventory_id_key" ON public."Inventory" USING btree (inventory_id);


--
-- TOC entry 4785 (class 1259 OID 60770)
-- Name: Inventory_product_id_size_id_color_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Inventory_product_id_size_id_color_id_key" ON public."Inventory" USING btree (product_id, size_id, color_id);


--
-- TOC entry 4750 (class 1259 OID 56867)
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- TOC entry 4806 (class 2606 OID 56935)
-- Name: Cart_Detail Cart_Detail_cart_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cart_Detail"
    ADD CONSTRAINT "Cart_Detail_cart_id_fkey" FOREIGN KEY (cart_id) REFERENCES public."Cart"(cart_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4807 (class 2606 OID 56950)
-- Name: Cart_Detail Cart_Detail_color_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cart_Detail"
    ADD CONSTRAINT "Cart_Detail_color_id_fkey" FOREIGN KEY (color_id) REFERENCES public."Color"(color_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4808 (class 2606 OID 56940)
-- Name: Cart_Detail Cart_Detail_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cart_Detail"
    ADD CONSTRAINT "Cart_Detail_product_id_fkey" FOREIGN KEY (product_id) REFERENCES public."Product"(product_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4809 (class 2606 OID 56945)
-- Name: Cart_Detail Cart_Detail_size_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cart_Detail"
    ADD CONSTRAINT "Cart_Detail_size_id_fkey" FOREIGN KEY (size_id) REFERENCES public."Size"(size_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4805 (class 2606 OID 56930)
-- Name: Cart Cart_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cart"
    ADD CONSTRAINT "Cart_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."User"(user_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4814 (class 2606 OID 59963)
-- Name: Chat_Message Chat_Message_chat_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Chat_Message"
    ADD CONSTRAINT "Chat_Message_chat_id_fkey" FOREIGN KEY (chat_id) REFERENCES public."Chat"(chat_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4815 (class 2606 OID 59968)
-- Name: Chat_Message Chat_Message_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Chat_Message"
    ADD CONSTRAINT "Chat_Message_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."User"(user_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4812 (class 2606 OID 59953)
-- Name: Chat Chat_user_id_admin_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Chat"
    ADD CONSTRAINT "Chat_user_id_admin_fkey" FOREIGN KEY (user_id_admin) REFERENCES public."User"(user_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4813 (class 2606 OID 59958)
-- Name: Chat Chat_user_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Chat"
    ADD CONSTRAINT "Chat_user_id_user_fkey" FOREIGN KEY (user_id_user) REFERENCES public."User"(user_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4816 (class 2606 OID 57000)
-- Name: Inventory Inventory_color_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Inventory"
    ADD CONSTRAINT "Inventory_color_id_fkey" FOREIGN KEY (color_id) REFERENCES public."Color"(color_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4817 (class 2606 OID 56990)
-- Name: Inventory Inventory_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Inventory"
    ADD CONSTRAINT "Inventory_product_id_fkey" FOREIGN KEY (product_id) REFERENCES public."Product"(product_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4818 (class 2606 OID 56995)
-- Name: Inventory Inventory_size_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Inventory"
    ADD CONSTRAINT "Inventory_size_id_fkey" FOREIGN KEY (size_id) REFERENCES public."Size"(size_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4801 (class 2606 OID 56920)
-- Name: Order_Detail Order_Detail_color_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Order_Detail"
    ADD CONSTRAINT "Order_Detail_color_id_fkey" FOREIGN KEY (color_id) REFERENCES public."Color"(color_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4802 (class 2606 OID 56910)
-- Name: Order_Detail Order_Detail_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Order_Detail"
    ADD CONSTRAINT "Order_Detail_order_id_fkey" FOREIGN KEY (order_id) REFERENCES public."Order"(order_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4803 (class 2606 OID 56915)
-- Name: Order_Detail Order_Detail_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Order_Detail"
    ADD CONSTRAINT "Order_Detail_product_id_fkey" FOREIGN KEY (product_id) REFERENCES public."Product"(product_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4804 (class 2606 OID 56925)
-- Name: Order_Detail Order_Detail_size_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Order_Detail"
    ADD CONSTRAINT "Order_Detail_size_id_fkey" FOREIGN KEY (size_id) REFERENCES public."Size"(size_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4799 (class 2606 OID 57050)
-- Name: Order Order_shipper_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_shipper_id_fkey" FOREIGN KEY (shipper_id) REFERENCES public."User"(user_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4800 (class 2606 OID 56900)
-- Name: Order Order_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."User"(user_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4826 (class 2606 OID 59198)
-- Name: Product_Category Product_Category_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product_Category"
    ADD CONSTRAINT "Product_Category_category_id_fkey" FOREIGN KEY (category_id) REFERENCES public."Category"(category_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4827 (class 2606 OID 59193)
-- Name: Product_Category Product_Category_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product_Category"
    ADD CONSTRAINT "Product_Category_product_id_fkey" FOREIGN KEY (product_id) REFERENCES public."Product"(product_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4797 (class 2606 OID 56895)
-- Name: Product_Color Product_Color_color_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product_Color"
    ADD CONSTRAINT "Product_Color_color_id_fkey" FOREIGN KEY (color_id) REFERENCES public."Color"(color_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4798 (class 2606 OID 56890)
-- Name: Product_Color Product_Color_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product_Color"
    ADD CONSTRAINT "Product_Color_product_id_fkey" FOREIGN KEY (product_id) REFERENCES public."Product"(product_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4795 (class 2606 OID 56880)
-- Name: Product_Size Product_Size_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product_Size"
    ADD CONSTRAINT "Product_Size_product_id_fkey" FOREIGN KEY (product_id) REFERENCES public."Product"(product_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4796 (class 2606 OID 56885)
-- Name: Product_Size Product_Size_size_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product_Size"
    ADD CONSTRAINT "Product_Size_size_id_fkey" FOREIGN KEY (size_id) REFERENCES public."Size"(size_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4810 (class 2606 OID 56955)
-- Name: Review Review_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT "Review_product_id_fkey" FOREIGN KEY (product_id) REFERENCES public."Product"(product_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4811 (class 2606 OID 56960)
-- Name: Review Review_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT "Review_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."User"(user_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4821 (class 2606 OID 57030)
-- Name: Stock_Receipt_Detail Stock_Receipt_Detail_color_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Stock_Receipt_Detail"
    ADD CONSTRAINT "Stock_Receipt_Detail_color_id_fkey" FOREIGN KEY (color_id) REFERENCES public."Color"(color_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4822 (class 2606 OID 57035)
-- Name: Stock_Receipt_Detail Stock_Receipt_Detail_inventory_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Stock_Receipt_Detail"
    ADD CONSTRAINT "Stock_Receipt_Detail_inventory_id_fkey" FOREIGN KEY (inventory_id) REFERENCES public."Inventory"(inventory_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4823 (class 2606 OID 57020)
-- Name: Stock_Receipt_Detail Stock_Receipt_Detail_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Stock_Receipt_Detail"
    ADD CONSTRAINT "Stock_Receipt_Detail_product_id_fkey" FOREIGN KEY (product_id) REFERENCES public."Product"(product_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4824 (class 2606 OID 57015)
-- Name: Stock_Receipt_Detail Stock_Receipt_Detail_receipt_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Stock_Receipt_Detail"
    ADD CONSTRAINT "Stock_Receipt_Detail_receipt_id_fkey" FOREIGN KEY (receipt_id) REFERENCES public."Stock_Receipt"(receipt_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4825 (class 2606 OID 57025)
-- Name: Stock_Receipt_Detail Stock_Receipt_Detail_size_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Stock_Receipt_Detail"
    ADD CONSTRAINT "Stock_Receipt_Detail_size_id_fkey" FOREIGN KEY (size_id) REFERENCES public."Size"(size_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4819 (class 2606 OID 57010)
-- Name: Stock_Receipt Stock_Receipt_provider_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Stock_Receipt"
    ADD CONSTRAINT "Stock_Receipt_provider_id_fkey" FOREIGN KEY (provider_id) REFERENCES public."Provider"(provider_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4820 (class 2606 OID 57005)
-- Name: Stock_Receipt Stock_Receipt_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Stock_Receipt"
    ADD CONSTRAINT "Stock_Receipt_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."User"(user_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4794 (class 2606 OID 56870)
-- Name: User User_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_role_id_fkey" FOREIGN KEY (role_id) REFERENCES public."Role"(role_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 5000 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


-- Completed on 2026-01-11 07:46:54

--
-- PostgreSQL database dump complete
--

-- \unrestrict MaEXSGNdotY7A4b6zxkH50HQf2XNhbNRSIC5Mf6GOOite55VQ6CwdkPdRI4hl1A

