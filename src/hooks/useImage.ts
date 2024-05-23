import { Product } from "@/types"

export const useImage = (item:Product) => {

  return `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/files/n8qxm797c5krkpn/${item.id}/${item.url}`
}
