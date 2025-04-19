const fetchBewakoof = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/products/saved/filter?brand=bewakoof');
      if (!res.ok) throw new Error('Failed to fetch Bewakoof products');
      const data = await res.json();
      return data;
    } catch (error) {
      console.error('🔴 Error fetching Bewakoof products:', error);
      return [];
    }
  };
  
  export default fetchBewakoof;
  