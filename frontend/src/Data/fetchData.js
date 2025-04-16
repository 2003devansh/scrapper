const BASE_URL = 'http://localhost:4000/api/products';

// ✅ Bewakoof fetch
export async function fetchBewakoof() {
  try {
    const res = await fetch(`${BASE_URL}/bewakoof`);
    if (!res.ok) throw new Error('Failed to fetch Bewakoof data');

    const data = await res.json();
    return {
      tshirts: data.oversized_tees || [],
      trousers: data.trousers || [],
    };
  } catch (error) {
    console.error('❌ Error fetching Bewakoof:', error);
    return { tshirts: [], trousers: [] };
  }
}

// ✅ Snitch fetch
export async function fetchSnitchData() {
  try {
    const res = await fetch(`${BASE_URL}/snitch`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch Snitch data');

    const data = await res.json();
    return {
      tshirts: data.tshirts || [],
      trousers: data.trousers || [],
    };
  } catch (error) {
    console.error('❌ Error fetching Snitch:', error);
    return { tshirts: [], trousers: [] };
  }
}

// ✅ Urban Monkey fetch
export async function fetchUrbanMonkeyData() {
  try {
    const res = await fetch(`${BASE_URL}/urbanMonkey`);
    if (!res.ok) throw new Error('Failed to fetch Urban Monkey data');

    const data = await res.json();
    return {
      tshirts: data.products?.tshirts || [],
      trousers: data.products?.trousers || [],
    };
  } catch (error) {
    console.error('❌ Error fetching Urban Monkey:', error);
    return { tshirts: [], trousers: [] };
  }
}
