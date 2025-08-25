"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { ProductsList } from "@/components/ProductList";
import { getProducts } from "@/lib/api";
import { useEffect, useState } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const prods = await getProducts(session?.access_token);
      setProducts(prods);
    };
    if (session?.access_token) fetchData();
  }, [session]);

  if (status === "loading") {
    return (
      <main className="flex h-screen items-center justify-center">
        <p className="text-gray-600 text-lg">Loading…</p>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Welcome to Product Store
        </h1>
        <button
          onClick={() => signIn("keycloak")}
          className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition"
        >
          Login with Keycloak
        </button>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Products</h1>
        <button
          onClick={() => signOut()}
          className="px-4 py-2 rounded-lg bg-red-500 text-white font-medium shadow hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
      <ProductsList products={products} />
    </main>
  );
}
