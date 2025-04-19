const fetchUrbanMonkey = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/products/saved/filter?brand=urban monkey');
      if (!res.ok) throw new Error('Failed to fetch Urban Monkey products');
      const data = await res.json();
      return data;
    } catch (error) {
      console.error('🔴 Error fetching Urban Monkey products:', error);
      return [];
    }
  };
  
  export default fetchUrbanMonkey;
  