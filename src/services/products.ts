import ky from "@/lib/ky";

type Product = {
  id: number;
  fees: number;
  product_name_ar: string;
  product_name_en: string;
};

type ProductsRes = {
  message: string;
  data: Array<Product>;
};

export async function getAllProducts() {
  const res = await ky
    .get<ProductsRes>("api/Product/get-all-products", {
      cache: "force-cache",
      next: {
        revalidate: 60,
      },
    })
    .json();

  return res.data;
}

type ProductRes = {
  message: string;
  data: Product;
};

export async function getProduct(id: number) {
  const res = await ky
    .get("api/Product/get-product-by-id", {
      searchParams: {
        id,
      },
      cache: "force-cache",
      next: {
        revalidate: 60,
      },
    })
    .json<ProductRes>();

  return res.data;
}
