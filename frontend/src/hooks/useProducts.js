import { useState, useEffect } from "react";

const useProducts = ({ brand = '', category = '' } = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const queryParams = new URLSearchParams();
        if (brand) queryParams.append("brand", brand);
        if (category) queryParams.append("category", category);

        const queryString = queryParams.toString();
        const url = queryString
          ? `/api/products/saved/filter?${queryString}`
          : `/api/products/saved`;

        const res = await fetch(url);

        if (!res.ok) throw new Error("Failed to fetch products");

        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Invalid JSON response from server");
        }

        const data = await res.json();
        setProducts(data);
      } catch (error) {
        setError(error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [brand, category]);

  return { products, loading, error };
};

export default useProducts;
