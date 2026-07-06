export const getHotels = async () => {
  try {
    const res = await fetch('http://localhost:5000/api/hotels');
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.error("Failed to fetch from backend", err);
    return [];
  }
};