import { Blob } from "buffer";
import fs from "fs";
import vton from "../../config/vton.js";
import type { Request, Response } from "express";
import { client } from "@gradio/client";

import dns from "node:dns";
// 👇 ADD THIS LINE IMMEDIATELY.
// It forces Node to use IPv4 (like 1.1.1.1) instead of IPv6 (like 64:ff9b...)
dns.setDefaultResultOrder("ipv4first");
//done
// first I'll get user's personal Image then get product Image (get Image has product only) then receiver as Buffer then convert it into Blob then use send param to
// provider's service and get result data formatting:
// result.data:
//  [
//         {
//             "path": "/tmp/gradio/364a595443dff1713971f2577c7716508b9106cb/image.png",
//             "url": "https://yisol-idm-vton.hf.space/file=/tmp/gradio/364a595443dff1713971f2577c7716508b9106cb/image.png", // this is url to get final image (user + product)
//             "size": null,
//             "orig_name": "image.png",
//             "mime_type": null,
//             "is_stream": false,
//             "meta": {
//                 "_type": "gradio.FileData"
//             }
//         },
//         {
//             "path": "/tmp/gradio/e0641ca18b6291157f588f63e2ac77bef09130bc/image.png",
//             "url": "https://yisol-idm-vton.hf.space/file=/tmp/gradio/e0641ca18b6291157f588f63e2ac77bef09130bc/image.png",
//             "size": null,
//             "orig_name": "image.png",
//             "mime_type": null,
//             "is_stream": false,
//             "meta": {
//                 "_type": "gradio.FileData"
//             }
//         }
//     ]
// TODO: here need to receive form data by getting image from upload
const getTryOn = async (req: Request, res: Response) => {
  // receive user image and product image (must be in order)
  const files = req.files as Express.Multer.File[];
  if (!files || !files[0] || !files[1])
    return res
      .status(400)
      .json({ Message: "Something went wrong (Files is missing)" });
  const HumanImgBuffer = fs.readFileSync(files[0].path);
  //   const ClothImgBuffer = fs.readFileSync("./assets/Tshirt.png");
  const ClothImgBuffer = fs.readFileSync(files[1].path);
  for (let index = 0; index < files.length; index++) {
    fs.unlinkSync(files[index]!.path);
  }
  //   const human = new Blob([HumanImgBuffer], { type: "image/jpg" });
  const human = new Blob([HumanImgBuffer], { type: `${files[0].mimetype}` });
  //   const cloth = new Blob([ClothImgBuffer], { type: "image/png" });
  const cloth = new Blob([ClothImgBuffer], { type: `${files[1].mimetype}` });
  const inputHuman = {
    background: human,
    layers: [],
    composite: null,
  };
  let result;
  try {
    const app = await vton();
    result = await app.predict("/tryon", [
      inputHuman,
      cloth,
      "virtual try-on", // 🔄 better than ""
      true,
      true,
      30,
      0, // random seed
    ]);
  } catch (error) {
    console.log("failed: ", error);
    return res.status(400).json({ Message: "Please try again after 24 hours" });
  }
  return res.status(200).json({ data: result.data });
};

//real
const getTryOnUsingImage = async (req: Request, res: Response) => {
  // receive user image and product image (must be in order)
  const files = req.files as Express.Multer.File[];
  console.log("files>>>>>>>>>>:", files);
  const { imageProduct } = req.body;
  if (!files || !files[0])
    return res
      .status(400)
      .json({ Message: "Something went wrong (Files is missing)" });
  console.log("files", files[0]);
  console.log("imageProduct: ", imageProduct);
  const response_0 = await fetch(`${imageProduct}`);
  const productBlob = await response_0.blob();
  const HumanImgBuffer = fs.readFileSync(files[0].path);
  //   const ClothImgBuffer = fs.readFileSync("./assets/Tshirt.png");
  // const ClothImgBuffer = fs.readFileSync(files[1].path);
  console.log(productBlob);
  for (let index = 0; index < files.length; index++) {
    fs.unlinkSync(files[index]!.path);
  }
  //   const human = new Blob([HumanImgBuffer], { type: "image/jpg" });
  const human = new Blob([HumanImgBuffer], { type: `${files[0].mimetype}` });
  //   const cloth = new Blob([ClothImgBuffer], { type: "image/png" });
  // const cloth = new Blob([ClothImgBuffer], { type: `${files[1].mimetype}` });
  const inputHuman = {
    background: human,
    layers: [],
    composite: null,
  };
  let result;
  try {
    //   // const app = await vton();
    //   // result = await app.predict("/tryon", [
    //   //   inputHuman,
    //   //   productBlob,
    //   //   "virtual try-on", // 🔄 better than ""
    //   //   true,
    //   //   true,
    //   //   30,
    //   //   0, // random seed
    //   // ]);
    console.log("🚀 Connecting to IDM-VTON (IPv4 Forced)...");
    const vtonApp = await client("https://yisol-idm-vton.hf.space/", {
      hf_token: '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',
    });
    console.log("vtonapp: ",vtonApp);
    console.log("🔮 Generating image...");

    result = await vtonApp.predict("/tryon", [
      inputHuman,
      productBlob,
      "virtual try-on", // 🔄 better than ""
      true,
      true,
      30,
      0, // random seed
    ]);
    console.log("✅ Generated successfully...");
  } catch (error) {
    console.log("failed: ", error);
    return res.status(400).json({ Message: "Please try again after 24 hours" });
  }
  return res.status(200).json({ data: result.data[0] });
};

// const getTryOnUsingImage = async (req: Request, res: Response) => {
//   const files = req.files as Express.Multer.File[];
//   const { imageProduct } = req.body;

//   if (!files || !files[0]) {
//     return res.status(400).json({ Message: "Files missing" });
//   }

//   try {
//     // 1. Prepare Images
//     // Fetch product image
//     const response_0 = await fetch(`${imageProduct}`);
//     const productBlob = await response_0.blob();

//     // Read local user image
//     const HumanImgBuffer = fs.readFileSync(files[0].path);
//     const humanBlob = new Blob([HumanImgBuffer], { type: files[0].mimetype });

//     // Clean up uploaded file
//     try {
//       fs.unlinkSync(files[0].path);
//     } catch (e) {}

//     const inputHuman = {
//       background: humanBlob,
//       layers: [],
//       composite: null,
//     };

//     console.log("🚀 Connecting to IDM-VTON (IPv4 Forced)...");

//     // 2. Connect to Model
//     // Note: We use the DIRECT URL and pass the token
//     const vtonApp = await client("yisol/IDM-VTON", {
//       hf_token: process.env.HuggingFaceToken as string,
//     });

//     // 3. Predict
//     console.log("🔮 Generating image...");
//     const result = await vtonApp.predict("/tryon", [
//       inputHuman,
//       productBlob,
//       "virtual try-on",
//       true,
//       true,
//       30,
//       0,
//     ]);
//     console.log("✅ Generated successfully...");
//     // 4. Send Re
//     // sponse
//     return res.status(200).json({ data: result.data[0] });
//   } catch (error: any) {
//     console.error("❌ VTON Error:", error);
//     return res.status(500).json({
//       Message: "Try-on failed. Please try again later.",
//       Error: error.message,
//     });
//   }
// };

export { getTryOn, getTryOnUsingImage };
