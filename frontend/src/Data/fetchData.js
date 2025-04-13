const BASE_URL = 'http://localhost:4000/api/products/' ;

export async function fetchBewakoof() {
    try {
        const res = await fetch(`${BASE_URL}bewakoof`)
        if (!res.ok) throw new Error('Failed to fetch Bewakoof data');
        return await res.json();
    } catch (error) {
        console.error('❌ Error fetching Bewakoof:', error);
        return { oversized_tees: [], trousers: [] };
    }
}

export async function fetchSnitchData() {
    try {
        const res = await fetch(`${BASE_URL}snitch`)
        if (!res.ok) throw new Error('Failed to fetch Bewakoof data');
        return await res.json();
    } catch (error) {
        console.error('❌ Error fetching Bewakoof:', error);
        return { oversized_tees: [], trousers: [] };
    }
}


export async function fetchUrbanMonkeyData() {
    try {
        const res = await fetch(`${BASE_URL}urbanMonkey`)
        if (!res.ok) throw new Error('Failed to fetch Bewakoof data');
        return await res.json();
    } catch (error) {
        console.error('❌ Error fetching Bewakoof:', error);
        return { oversized_tees: [], trousers: [] };
    }
}