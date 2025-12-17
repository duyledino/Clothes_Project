import axios from "axios";

export const pollinationRequest = async (
  prompt: string,
  system: string,
  options?: {
    model?: string;
    seed?: number;
  }
) => {
  const encodedPrompt = encodeURIComponent(prompt);

  // Build query parameters
  const params = new URLSearchParams();
  params.set("model", options?.model ?? "mistral");
  params.set("seed", options?.seed?.toString() ?? String(123));
  params.set("system", encodeURIComponent(system));
  // params.set("json", "true");
  const url = `https://text.pollinations.ai/${encodedPrompt}?${params.toString()}`;
  try {
    const result = await axios.get(url);
    if (result.status === 200) {
      console.log("result: ",result.data);
      return result.data;
    }
  } catch (error: any) {
    throw new Error(`Internal error: `, error);
  }
};
