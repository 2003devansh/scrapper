import React,{useState} from "react";
import {motion} from 'framer-motion' ;
import ProductCard  from "./ProductCard";
import useProducts from "../hooks/useProducts";

const Home = () => {
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");

  const { products, loading, error } = useProducts({ brand, category });

  const brands = ["Snitch", "Urban Monkey", "Bewakoof"];
  const categories = ["tshirt", "trouser"];

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-6 text-green-500">Explore Products</h1>

      {/* Filter Section */}
      <div className="mb-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2 text-orange-500">Filter by Brand</h2>
          <div className="flex gap-2 flex-wrap">
            {brands.map((b) => (
              <button
                key={b}
                onClick={() => setBrand(brand === b ? "" : b)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  brand === b ? "bg-orange-600" : "bg-green-700"
                }`}
              >
                {b}
              </button>
            ))}
            <button
              onClick={() => setBrand("")}
              className="px-4 py-2 rounded-full bg-gray-700"
            >
              Clear
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2 text-orange-500">Filter by Category</h2>
          <div className="flex gap-2 flex-wrap">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(category === c ? "" : c)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  category === c ? "bg-orange-600" : "bg-green-700"
                }`}
              >
                {c}
              </button>
            ))}
            <button
              onClick={() => setCategory("")}
              className="px-4 py-2 rounded-full bg-gray-700"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {loading && <p className="text-white">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {!loading &&
          !error &&
          products.map((product) => (
            <motion.div
              key={product._id}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
      </motion.div>
    </div>
  );
};

export default Home;