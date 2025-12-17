import "dotenv/config";
import type { Request, Response } from "express";
import dayjs from "dayjs";
import { v4 as uuid } from "uuid";
import QueryString from "qs";
import crypto from "node:crypto";

const createPaymentUrl = (req: Request, res: Response) => {
  //get orderId and total of order
  const { order_id, total } = req.body as { order_id: string; total: number };
  console.log("id,total: ", order_id, total);
  try {
    console.log(
      "ENV:",
      process.env.vnp_Url,
      process.env.vnp_TmnCode,
      process.env.vnp_HashSecret
    );
    let ipAddr =
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress;
    const createDate = dayjs().format("YYYYMMDDHHmmss");
    let currCode = "VND";
    let vnp_Params: Record<string, string> = {};
    let vnpUrl = process.env.vnp_Url;
    if (!vnpUrl) return res.status(500).json({ Message: "No Evironment" });
    vnp_Params["vnp_Version"] = "2.1.0";
    vnp_Params["vnp_Command"] = "pay";
    vnp_Params["vnp_TmnCode"] = `${process.env.vnp_TmnCode}`;
    vnp_Params["vnp_Locale"] = "vn";
    vnp_Params["vnp_CurrCode"] = currCode;
    // planId is testing
    const planId = uuid();
    vnp_Params["vnp_TxnRef"] = `${planId}`;
    vnp_Params["vnp_OrderInfo"] = `Thanh toán đơn hàng ${planId}`;
    vnp_Params["vnp_OrderType"] = "other";
    vnp_Params["vnp_Amount"] = Math.round(total * 100).toString();
    vnp_Params["vnp_ReturnUrl"] = `${process.env.vnp_ReturnUrl}?id=${order_id}`;
    vnp_Params["vnp_IpAddr"] = ipAddr as string;
    vnp_Params["vnp_CreateDate"] = createDate;
    vnp_Params["vnp_BankCode"] = "NCB"; // cannot use QRCODE because of testing only
    vnp_Params = sortObject(vnp_Params);
    console.log("VPN params: ", vnp_Params);
    const signData = QueryString.stringify(vnp_Params, { encode: false });
    const hmac = crypto.createHmac("sha512", `${process.env.vnp_HashSecret}`);
    const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
    console.log(signed);
    vnp_Params["vnp_SecureHash"] = signed;
    vnpUrl += "?" + QueryString.stringify(vnp_Params, { encode: false });
    console.log(vnp_Params);
    console.log(vnpUrl);
    //resposne payment URL and order id
    return res.status(200).json({ PaymentURL: vnpUrl, id: order_id });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ Message: "Failed to create payment" });
  }
};

function sortObject(obj: Record<string, string>) {
  let sorted: Record<string, string> = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    const k = str[key] as string;
    const v = obj[k];
    if (v !== undefined && v !== null)
      sorted[k] = encodeURIComponent(v).replace(/%20/g, "+");
  }
  return sorted;
}

export { createPaymentUrl };
