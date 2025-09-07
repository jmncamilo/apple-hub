import { postOptions, patchOptions } from "@/lib/utils/optionsFetch";

export async function handlerHttp(body, isPost = true) {
  const response = await fetch("/api/customers", isPost ? postOptions(body) : patchOptions(body));
  return await response.json();
}