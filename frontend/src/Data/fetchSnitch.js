const fetchSnitch = async ()=>{
    try {
        const res = await fetch('http://localhost:4000/api/products/saved/filter?brand=snitch');
        if (!res.ok) throw new Error('Failed to fetch Snitch products');
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('🔴 Error fetching Snitch products:', error);
        return [];
    }
}

export default fetchSnitch;