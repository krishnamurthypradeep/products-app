import { ProductsList } from "@/components/ProductList";
import { getProducts } from "@/lib/api";

export default async function Home() {
  const products = await getProducts()
  return <ProductsList products={products}/>

}
