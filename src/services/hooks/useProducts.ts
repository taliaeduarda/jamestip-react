import { api } from "../api";
import { useQuery } from "react-query";

type Product = {
  id: string;
  name: string;
  provider: string;
  code: number;
  category: string;
  price: string;
  amount: number;
};

export async function getProducts(): Promise<Product[]> {
  const response = await api.get("products")

  const products = response.data.products.map((prod: Product) => {
    return {
      id: prod.id,
      name: prod.name,
      code: prod.code,
      category: prod.category,
      price: prod.price,
      amount: prod.amount,
      provider: prod.provider,
    }
  })
  return products
}

export function useProducts() {
  return useQuery("products", getProducts);
}
