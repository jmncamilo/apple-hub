import { postOptions, patchOptions } from "@/lib/utils/optionsFetch";

export async function handlerHttpProducts(body, isPost = true) {
  const response = await fetch("/api/products", isPost ? postOptions(body) : patchOptions(body));
  return await response.json();
}