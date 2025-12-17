import { client } from "@gradio/client";
import "dotenv/config";

// const HumanImgBuffer = fs.readFileSync("../assets/human.jpg");
// const ClothImgBuffer = fs.readFileSync("../assets/Tshirt.png"); // 🔄 use PNG instead of JPG

// const human = new Blob([HumanImgBuffer], { type: "image/jpg" });
// const cloth = new Blob([ClothImgBuffer], { type: "image/png" });

// const inputHuman = {
//   background: human,
//   layers: [],
//   composite: null,
// };

//NOTE: job timeout !! wait for it back
console.log("process.env.HuggingFaceToken: ", process.env.HuggingFaceToken);
let vtonApp: any = null;

// This function connects only when we call it
export const getVtonApp = async () => {
  // If we are already connected, return the existing connection
  if (vtonApp) return vtonApp;

  console.log("🔄 Initializing connection to Hugging Face...");
  try {
    vtonApp = await client("yisol/IDM-VTON", {
      hf_token: process.env.HuggingFaceToken as string,
    });
    console.log("✅ Connected to IDM-VTON!");
    return vtonApp;
  } catch (error) {
    console.error("❌ Failed to connect to Hugging Face:", error);
    throw error; // Let the controller handle the error
  }
};

// const result = await app.predict("/tryon", [
//   inputHuman,
//   cloth,
//   "virtual try-on", // 🔄 better than ""
//   true,
//   true,
//   30,
//   0, // random seed
// ]);

export default getVtonApp;
