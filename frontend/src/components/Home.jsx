import React, { useEffect, useState } from 'react';
import fetchData from "../Data/fetchData";
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [data, setData] = useState({
    bewakoof: { tshirts: [], trousers: [] },
    snitch: { tshirts: [], trousers: [] },
    urbanMonkey: { tshirts: [], trousers: [] }
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const fetched = await fetchData();
        setData(fetched);
      } catch (err) {
        console.error("❌ Error fetching data", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6 space-y-10">
      {Object.entries(data).map(([brand, categories]) => (
        <div key={brand}>
          <h2 className="text-2xl font-bold capitalize mb-4">{brand}</h2>

          {Object.entries(categories).map(([type, products]) => (
            <div key={type} className="mb-8">
              <h3 className="text-xl font-semibold capitalize mb-2">{type}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {products.map((product, index) => (
                  <ProductCard key={index} {...product} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Home;
